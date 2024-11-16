import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useRef, useState } from "react";
import Message from "../components/message";
import { useQuery } from "@tanstack/react-query";
import { Storage } from "../utils/storage";
import { baseUrl, fetchData, headers } from "../constants/api";
import Feather from "@expo/vector-icons/Feather";
import { StackScreenProps } from "@react-navigation/stack";
import dayjs from "dayjs";
import { RootStackParamList } from "../types/rootStackParamList";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
type Props = StackScreenProps<RootStackParamList, "Post", "MyStack">;

interface WordRequests {
  message: Array<WordRequestsItem>;
}
interface WordRequestsItem {
  date: string;
  id: string;
  senderId: string;
  targetId: string;
  username: string;
  word: string;
  status: string;
}
export default function Post({ navigation, route }: Props) {
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const animatedPadding = useSharedValue(25);
  const keyboardDidShow = () => {
    animatedPadding.value = withTiming(8, { duration: 250 });
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({
        animated: true,
      });
    }
  };

  const keyboardDidHide = () => {
    animatedPadding.value = withTiming(25, { duration: 250 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: animatedPadding.value,
    };
  });
  const { username, userId, image, userFriends } = route?.params;
  const [word, setWord] = useState("");
  const token = Storage.get("token");

  const wordRequests = useQuery<WordRequests>({
    queryKey: ["wordRequests"],
    queryFn: async () =>
      await fetchData(`five_letters/word-requests/${userId}`, headers, token),
  });
  const sendWord = async (word: string, userId: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(`${baseUrl}/five_letters/send-word`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        word: word,
        userId: userId,
      }),
    });
    if (response.ok) {
      setWord("");
      Alert.alert("Слово отправлено", "", [
        {
          text: "OK",
          onPress: () => {
            if (flatListRef.current && wordRequests?.data?.message.length) {
              flatListRef.current.scrollToEnd({
                animated: true,
              });
            }
          },
        },
      ]);
    } else {
      Alert.alert("Ошибка при отправке слова");
    }
    console.log(await response.json());
  };

  return (
    <View onTouchStart={() => Keyboard.dismiss()} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Stats", {
              userId: userId,
              userFriends: userFriends,
              userName: username,
              userImage: image,
            })
          }
        >
          <Text style={styles.username}>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Stats", {
              userId: userId,
              userFriends: userFriends,
              userName: username,
              userImage: image,
            })
          }
        >
          <Image
            source={{
              uri: !image
                ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                : image,
            }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "130%",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "#2D3039",
        }}
      ></View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={5}
      >
        <FlatList
          contentContainerStyle={{ paddingVertical: 15 }}
          initialNumToRender={wordRequests?.data?.message.length}
          keyExtractor={(item) => item.id}
          data={wordRequests?.data?.message}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          renderItem={({ item, index }) => {
            if (item.senderId === userId) {
              return (
                <Message
                  logo={""}
                  date={
                    dayjs(item.date).format("DD.MM.YYYY") !==
                      dayjs(
                        wordRequests?.data?.message[index - 1]?.date
                      ).format("DD.MM.YYYY") || index === 0
                      ? dayjs().diff(dayjs(item.date), "day") === 0
                        ? "Сегодня"
                        : dayjs(item.date).format("DD.MM.YYYY")
                      : ""
                  }
                  time={dayjs(item.date).format("HH:mm")}
                  message={
                    item.status === "done"
                      ? `Слово отгадано - `
                      : item.status === "pending"
                      ? "Отправил вам слово"
                      : `Слово не отгадано - `
                  }
                  button={() =>
                    navigation.navigate("Word", {
                      message: item.word,
                      username: item.username,
                      requestId: item.id,
                      userId: item.senderId,
                    })
                  }
                  isSender={false}
                  sender={item.username}
                  status={item.status}
                  word={item.word}
                />
              );
            }
            return (
              <Message
                logo={""}
                date={
                  dayjs(item.date).format("DD.MM.YYYY") !==
                    dayjs(wordRequests?.data?.message[index - 1]?.date).format(
                      "DD.MM.YYYY"
                    ) || index === 0
                    ? dayjs().diff(dayjs(item.date), "day") === 0
                      ? "Сегодня"
                      : dayjs(item.date).format("DD.MM.YYYY")
                    : ""
                }
                time={dayjs(item.date).format("HH:mm")}
                message={`Вы отправили - `}
                button={() => ""}
                isSender={true}
                sender={item.username}
                status={item.status}
                word={item.word}
              />
            );
          }}
        ></FlatList>
        <Animated.View
          style={[
            animatedStyle,
            {
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
            },
          ]}
        >
          <TextInput
            value={word}
            onChangeText={(value) => setWord(value)}
            placeholder="Отправить слово"
            style={styles.sendWordInput}
            placeholderTextColor={"#6F7276"}
            keyboardAppearance="dark"
            autoCapitalize="none"
            selectionColor={"#02C39A"}
            maxLength={5}
          />
          <TouchableOpacity
            onPress={async () => {
              await sendWord(word, userId);
              await wordRequests.refetch();
            }}
            style={styles.sendWordButton}
          >
            <Feather style={styles.icon} name="send" size={23} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    justifyContent: "space-between",
    flex: 1,

    paddingVertical: 60,
    backgroundColor: "#1D1F25",
  },
  username: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 28,
    color: "#6F7276",
  },
  sendWordInput: {
    width: "100%",
    backgroundColor: "#272931",
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    borderRightWidth: 1,
    borderColor: "#484B55",
    paddingHorizontal: 19,
    paddingVertical: 20,
    fontFamily: "Nunito-Regular",
    color: "#484B55",
    fontSize: 17,
  },
  sendWordButton: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: "#272931",
  },
  icon: {
    overflow: "hidden",
    paddingHorizontal: 17,
    padding: 20,
  },
});
