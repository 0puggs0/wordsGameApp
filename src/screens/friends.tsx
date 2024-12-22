import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import ModalWindowDeleteFriend from "../components/modalWindowDeleteFriend";
import FriendElement from "../components/friend";
import Subscriber from "../components/subscriber";
import useFriends from "../hooks/useFriends";
import { renderBackdrop } from "../components/backdrop";

type Props = StackScreenProps<RootStackParamList, "Friends", "MyStack">;

export default function Friends({ navigation }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isLongPress, setLongPress] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [isSearchUser, setIsSearchUser] = useState(false);

  const {
    friendRequests,
    friends,
    users,
    addFriend,
    fetchAcceptRequest,
    removeFriend,
    setModalVisible,
    modalVisible,
  } = useFriends();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  return (
    <View onTouchStart={Keyboard.dismiss} style={styles.container}>
      <View style={styles.topBlock}>
        <View>
          <Text style={styles.headerText}>Друзья</Text>
          <Text style={styles.countFriends}>
            {friends?.data?.friends.length} друзей
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
          <Image
            style={styles.logo}
            source={{
              uri: !friends?.data?.image
                ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                : friends?.data?.image,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholderTextColor={"#6F7276"}
        placeholder="Поиск друзей"
        value={inputValue}
        onChangeText={(value) => setInputValue(value)}
        style={styles.friendsInput}
        keyboardAppearance="dark"
      />
      <FlatList
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id}
        data={friends?.data?.friends}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => {
          if (item.username.toLowerCase().includes(inputValue.toLowerCase())) {
            return (
              <FriendElement
                navigationPost={() => {
                  navigation.navigate("Post", {
                    username: item.username,
                    userId: item.id,
                    image: item.image,
                    userFriends: 0,
                    messageItem: undefined,
                  });
                }}
                navigationStats={() => {
                  navigation.navigate("Stats", {
                    userId: item.id,
                    userFriends: 0,
                    userName: item.username,
                    userImage: item.image,
                  });
                }}
                bottomSheetRef={bottomSheetRef}
                isLongPress={isLongPress}
                setLongPress={setLongPress}
                item={item}
                setCurrentUserId={setCurrentUserId}
                setModalVisible={setModalVisible}
              />
            );
          }
          return null;
        }}
      />
      {!modalVisible && (
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
      )}
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
                  <Subscriber
                    username={item.username}
                    id={item.id}
                    fetchAcceptRequest={fetchAcceptRequest}
                    image={item.image}
                  />
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
                    .includes(searchInputValue.toLowerCase()) &&
                  !friends?.data?.friends
                    .map((item) => item.id)
                    .includes(item.id)
                ) {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                          navigation.navigate("Stats", {
                            userId: item.id,
                            userFriends: item?.friends,
                            userName: item.username,
                            userImage: "",
                          });
                          bottomSheetRef?.current?.dismiss();
                        } catch (error) {
                          console.error("Error fetching user stats:", error);
                        }
                      }}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  chatButton: {
    padding: 5,
    backgroundColor: "#02C39A",
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
