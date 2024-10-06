import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";
import { Storage } from "../utils/storage";
import { baseUrl } from "../constants/api";
import { UserData } from "../interfaces/getUser";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { FriendRequestsData } from "../interfaces/getFriendRequests";
import { FlatList } from "react-native-gesture-handler";
import ModalWindowDeleteFriend from "../components/modalWindowDeleteFriend";
import Animated, { ZoomOut } from "react-native-reanimated";
import { SearchAllUsers } from "../interfaces/getAllUsers";

type Props = StackScreenProps<RootStackParamList, "Friends", "MyStack">;

export default function Friends({ navigation }: Props) {
  const token = Storage.get("token");
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const [inputValue, setInputValue] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const [isLongPress, setLongPress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [isSearchUser, setIsSearchUser] = useState(false);

  const friendRequests = useQuery<FriendRequestsData>({
    queryKey: ["friends"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
      };
      if (token) {
        headers.Authorization = token;
      }
      const response = await fetch(`${baseUrl}/five_letters/friend-requests`, {
        headers: headers,
      });
      return response.json();
    },
  });

  const friends = useQuery<UserData>({
    queryKey: ["user"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
      };
      if (token) {
        headers.Authorization = token;
      }
      const response = await fetch(`${baseUrl}/five_letters/user`, {
        headers: headers,
      });
      return response.json();
    },
  });

  const users = useQuery<SearchAllUsers>({
    enabled: true,
    queryKey: ["users"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
      };
      if (token) {
        headers.Authorization = token;
      }
      const response = await fetch(`${baseUrl}/five_letters/users`, {
        headers: headers,
      });
      return response.json();
    },
  });
  const getUserStats = async (userId: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(
      `${baseUrl}/five_letters/user-stats/${userId}`,
      {
        headers: headers,
      }
    );
    console.log(await response.json());
    return response.json();
  };

  const fetchAcceptRequest = async (
    id: string,
    action: "approve" | "reject"
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(
      `https://oh.sssh.it/five_letters/friend-requests/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          action,
        }),
        headers: headers,
      }
    );

    friendRequests.refetch();
    if (action === "approve") {
      friends.refetch();
    }
  };

  const removeFriend = async (id: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(
      `${baseUrl}/five_letters/remove-friend/${id}`,
      {
        method: "POST",
        body: "",
        headers: headers,
      }
    );
    friends.refetch();
    setModalVisible(false);
  };
  const addFriend = async (id: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(`${baseUrl}/five_letters/add-friend`, {
      method: "POST",
      body: JSON.stringify({
        userId: id,
      }),
      headers: headers,
    });
    if (response.ok) {
      Alert.alert("Заявка отправлена", "");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <View>
          <Text style={styles.headerText}>Друзья</Text>
          <Text style={styles.countFriends}>
            {friends?.data?.friends.length} друзей
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
          <View style={styles.logo}></View>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholderTextColor={"#6F7276"}
        placeholder="Поиск друзей"
        value={inputValue}
        onChangeText={(value) => setInputValue(value)}
        style={styles.friendsInput}
      />
      <FlatList
        style={{ width: "100%" }}
        data={friends?.data?.friends}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => {
          if (item.username.toLowerCase().includes(inputValue.toLowerCase())) {
            return (
              <Animated.View
                exiting={ZoomOut.springify().stiffness(200).damping(80)}
              >
                <TouchableOpacity
                  onLongPress={() =>
                    isLongPress ? setLongPress(false) : setLongPress(true)
                  }
                  style={styles.friendCard}
                >
                  <View style={styles.friendCardContent}>
                    <View style={styles.friendLogo}></View>
                    <Text style={styles.friendNameText}>{item.username}</Text>
                  </View>
                  {isLongPress && (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentUserId(item.id);
                        setModalVisible(true);
                      }}
                    >
                      <AntDesign
                        style={styles.closeButton}
                        name="close"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          }
          return null;
        }}
      ></FlatList>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => {
            setIsSearchUser(true);
            bottomSheetRef?.current?.present();
          }}
        >
          <Text style={styles.searchButton}>Найти друзей</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsSearchUser(false);
            bottomSheetRef?.current?.present();
          }}
        >
          <View style={styles.friendRequestsContainer}>
            <Text style={styles.friendRequestsText}>Заявки в друзья</Text>
            <Text style={styles.friendRequestsCount}>
              {friendRequests?.data?.message.length !== 0 &&
                friendRequests?.data?.message.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        index={1}
        handleIndicatorStyle={{
          backgroundColor: "white",
          paddingHorizontal: 20,
        }}
        snapPoints={["50%", "85%"]}
        backgroundStyle={{ backgroundColor: "#1D1F25" }}
      >
        {!isSearchUser ? (
          <>
            <Text style={styles.bottomSheetHeaderText}>Заявки в друзья</Text>
            <BottomSheetFlatList
              contentContainerStyle={{
                paddingHorizontal: 34,
              }}
              data={friendRequests.data?.message}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <MaterialIcons name="mood-bad" size={120} color="grey" />

                    <Text style={styles.emptyRequestsText}>
                      Нет заявок в друзья
                    </Text>
                  </View>
                );
              }}
              renderItem={({ item }) => {
                return (
                  <Animated.View
                    exiting={ZoomOut.springify().stiffness(200).damping(80)}
                  >
                    <View style={styles.friendRequestCard}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "grey",
                            borderRadius: 25,
                          }}
                        ></View>
                        <Text
                          style={{
                            fontFamily: "Nunito-Regular",
                            fontSize: 20,
                            color: "white",
                          }}
                        >
                          {item.username}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            fetchAcceptRequest(item.id, "approve");
                          }}
                        >
                          <AntDesign
                            style={{
                              padding: 5,
                              backgroundColor: "#02C39A",
                              borderRadius: 10,
                              overflow: "hidden",
                            }}
                            name="check"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => fetchAcceptRequest(item.id, "reject")}
                        >
                          <AntDesign
                            style={{
                              padding: 5,
                              backgroundColor: "#fc4949",
                              borderRadius: 10,
                              overflow: "hidden",
                            }}
                            name="close"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Animated.View>
                );
              }}
            />
          </>
        ) : (
          <View style={{ paddingHorizontal: 34 }}>
            <TextInput
              placeholderTextColor={"#6F7276"}
              placeholder="Поиск друзей"
              value={searchInputValue}
              onChangeText={(value) => setSearchInputValue(value)}
              style={{
                width: "100%",
                backgroundColor: "#272931",
                borderRadius: 13,
                paddingHorizontal: 19,
                paddingVertical: 16,
                fontFamily: "Nunito-Regular",
                color: "#484B55",
                fontSize: 15,
              }}
            />
            <FlatList
              style={{ width: "100%" }}
              data={users?.data?.message}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 85, paddingTop: 15 }}
              renderItem={({ item }) => {
                if (
                  item.username
                    .toLowerCase()
                    .includes(searchInputValue.toLowerCase())
                ) {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Stats")}
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        marginTop: 10,
                        borderWidth: 0.3,
                        borderColor: "#6F7276",
                        borderRadius: 20,
                        padding: 13,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 13,
                        }}
                      >
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "grey",
                            borderRadius: 25,
                          }}
                        ></View>
                        <Text
                          style={{
                            fontFamily: "Nunito-Regular",
                            fontSize: 20,
                            color: "white",
                          }}
                        >
                          {item.username}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => addFriend(item.id)}>
                        <AntDesign
                          style={{
                            padding: 3,
                            backgroundColor: "#02C39A",
                            borderRadius: 8,
                            overflow: "hidden",
                          }}
                          name="plus"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                }
                return null;
              }}
            ></FlatList>
          </View>
        )}
      </BottomSheetModal>
      <ModalWindowDeleteFriend
        modalVisible={modalVisible}
        onDelete={(id) => removeFriend(id)}
        setModalVisible={(bool) => setModalVisible(bool)}
        currentUserId={currentUserId}
      ></ModalWindowDeleteFriend>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 100,
    paddingHorizontal: 34,
    alignItems: "center",
    backgroundColor: "#1D1F25",
  },
  contentContainer: {
    paddingHorizontal: 34,
    flex: 1,
    backgroundColor: "#1D1F25",
  },
  topBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 36,
    color: "#02C39A",
  },
  countFriends: {
    fontFamily: "Nunito-Regular",
    color: "white",
    fontSize: 20,
  },
  logo: {
    width: 66,
    height: 66,
    backgroundColor: "grey",
    borderRadius: 33,
    bottom: 20,
  },
  friendsInput: {
    width: "100%",
    backgroundColor: "#272931",
    borderRadius: 13,
    paddingHorizontal: 19,
    paddingVertical: 16,
    fontFamily: "Nunito-Regular",
    color: "#484B55",
    fontSize: 15,
  },
  friendCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: "#6F7276",
    borderRadius: 20,
    padding: 13,
    justifyContent: "space-between",
  },
  friendCardContent: {
    flexDirection: "row",
    alignItems: "center",

    gap: 13,
  },
  friendLogo: {
    width: 50,
    height: 50,
    backgroundColor: "grey",
    borderRadius: 25,
  },
  friendNameText: {
    fontFamily: "Nunito-Regular",
    fontSize: 20,
    color: "white",
  },
  closeButton: {
    padding: 3,
    backgroundColor: "#fc4949",
    borderRadius: 8,
    overflow: "hidden",
  },
  bottomButtons: { gap: 10, width: "100%" },
  searchButton: {
    paddingVertical: 16,
    backgroundColor: "#02C39A",
    textAlign: "center",
    borderRadius: 13,
    overflow: "hidden",
    color: "white",
    fontFamily: "Nunito-Bold",
    fontSize: 18,
  },
  friendRequestsContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    backgroundColor: "#CED5DB",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  friendRequestsText: {
    color: "#1D1F25",
    fontFamily: "Nunito-Bold",
    fontSize: 18,
  },
  friendRequestsCount: {
    color: "#02C39A",
    fontFamily: "Nunito-Bold",
    fontSize: 15,
    bottom: 5,
    padding: 2,
  },
  bottomSheetHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  emptyRequestsText: {
    fontFamily: "Nunito-Regular",
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  friendRequestCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 17,
    marginBottom: 10,
  },
});
