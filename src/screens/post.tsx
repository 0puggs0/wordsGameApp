import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Message from "../components/message";
import { useQuery } from "@tanstack/react-query";
import { Storage } from "../utils/storage";
import { baseUrl } from "../constants/api";
import { StackScreenProps } from "@react-navigation/stack";
import dayjs from "dayjs";
import { RootStackParamList } from "../types/rootStackParamList";
type Props = StackScreenProps<RootStackParamList, "Post", "MyStack">;

interface WordRequests {
  message: Array<WordRequestsItem>;
}
interface WordRequestsItem {
  date: string;
  id: string;
  userId: string;
  username: string;
  word: string;
}
export default function Post({ navigation, route }: Props) {
  const { username, userId } = route?.params;
  const token = Storage.get("token");
  const data = [
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
  ];
  const wordRequests = useQuery<WordRequests>({
    queryKey: ["username"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
      };
      if (token) {
        headers.Authorization = token;
      }
      const response = await fetch(`${baseUrl}/five_letters/word-requests`, {
        headers: headers,
      });
      return response.json();
    },
  });
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Nunito-ExtraBold",
          fontSize: 28,
          color: "#6F7276",
        }}
      >
        {username}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {wordRequests?.data?.message?.map((item) => {
          if (item.userId === userId) {
            return (
              <Message
                logo={""}
                date={dayjs(item.date).format("DD.MM.YYYY")}
                time={dayjs(item.date).format("HH:mm")}
                message={"Отправил слово"}
                button={() =>
                  navigation.navigate("Word", { message: item.word })
                }
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 34,
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 90,
    backgroundColor: "#1D1F25",
    gap: 30,
  },
});
