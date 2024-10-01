import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
    console.log(await response.json());
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Nunito-ExtraBold",
              fontSize: 36,
              color: "#02C39A",
            }}
          >
            Друзья
          </Text>
          <Text
            style={{
              fontFamily: "Nunito-Regular",
              color: "white",
              fontSize: 20,
            }}
          >
            10 друзей
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
          <View
            style={{
              width: 66,
              height: 66,
              backgroundColor: "grey",
              borderRadius: 33,
              bottom: 20,
            }}
          ></View>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholderTextColor={"#6F7276"}
        placeholder="Поиск друзей"
        value={inputValue}
        onChangeText={(value) => setInputValue(value)}
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
      <ScrollView style={{ width: "100%", paddingVertical: 20 }}>
        {friends.data?.friends?.map((item) => {
          if (item.username.toLowerCase().includes(inputValue.toLowerCase())) {
            return (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 17,
                  marginBottom: 10,
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
            );
          }
        })}
      </ScrollView>
      <View style={{ gap: 10, width: "100%" }}>
        <TouchableOpacity style={{}}>
          <Text
            style={{
              paddingVertical: 16,
              backgroundColor: "#02C39A",
              textAlign: "center",
              borderRadius: 13,
              overflow: "hidden",
              color: "white",
              fontFamily: "Nunito-Bold",
              fontSize: 18,
            }}
          >
            Найти друзей
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => bottomSheetRef?.current?.present()}>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 16,
              backgroundColor: "#CED5DB",
              borderRadius: 13,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#1D1F25",
                fontFamily: "Nunito-Bold",
                fontSize: 18,
              }}
            >
              Заявки в друзья
            </Text>
            <Text
              style={{
                color: "#02C39A",
                fontFamily: "Nunito-Bold",
                fontSize: 15,
                bottom: 5,
                padding: 2,
              }}
            >
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
        snapPoints={["25%", "50%", "85%"]}
        backgroundStyle={{ backgroundColor: "#1D1F25" }}
      >
        <Text
          style={{
            fontFamily: "Nunito-Bold",
            fontSize: 25,
            color: "white",
            textAlign: "center",
          }}
        >
          Заявки в друзья
        </Text>
        <BottomSheetFlatList
          contentContainerStyle={{ paddingHorizontal: 34 }}
          data={friendRequests.data?.message}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialIcons name="mood-bad" size={120} color="grey" />

                <Text
                  style={{
                    fontFamily: "Nunito-Regular",
                    color: "white",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                >
                  Нет заявок в друзья
                </Text>
              </View>
            );
          }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 17,
                  marginBottom: 10,
                }}
              >
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
                    onPress={() =>
                      fetchAcceptRequest("rl0vl9w0rs06p4h", "approve")
                    }
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
                  <TouchableOpacity>
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
            );
          }}
        />
      </BottomSheetModal>
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
});
