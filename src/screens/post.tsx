import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import Message from "../components/message";
import Feather from "@expo/vector-icons/Feather";
import { StackScreenProps } from "@react-navigation/stack";
import dayjs from "dayjs";
import { RootStackParamList } from "../types/rootStackParamList";
import { TextInput } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import usePost from "../hooks/usePost";
type Props = StackScreenProps<RootStackParamList, "Post", "MyStack">;
export interface WordRequests {
  message: WordRequestsItem[];
}
export interface WordRequestsItem {
  date: string;
  id: string;
  senderId: string;
  targetId: string;
  username: string;
  word: string;
  status: string;
}
export default function Post({ navigation, route }: Props) {
  const { username, userId, image, userFriends, messageItem } = route?.params;
  const {
    animatedStyle,
    messages,
    getMessages,
    sendWord,
    flatListRef,
    word,
    setWord,
    setOffset,
  } = usePost(userId, messageItem);

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
          inverted
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (messages.length > 14) {
              setOffset((prev) => {
                getMessages(prev + 1);
                return prev + 1;
              });
            }
          }}
          contentContainerStyle={{ paddingVertical: 15 }}
          data={messages}
          keyExtractor={(item) => item.id + Math.random().toString()}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          style={{ flex: 1 }}
          renderItem={({
            item,
            index,
          }: {
            item: WordRequestsItem;
            index: number;
          }) => {
            if (item.senderId === userId) {
              return (
                <Message
                  logo={""}
                  date={
                    dayjs(item.date).format("DD.MM.YYYY") !==
                    dayjs(messages[index + 1]?.date).format("DD.MM.YYYY")
                      ? dayjs().format("DD.MM.YYYY") ===
                        dayjs(item.date).format("DD.MM.YYYY")
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
                  button={() => {
                    navigation.navigate("Word", {
                      message: item.word,
                      username: item.username,
                      requestId: item.id,
                      userId: item.senderId,
                      messageItem: item,
                    });
                  }}
                  isSender={false}
                  sender={item.username}
                  status={item.status}
                  word={item.word}
                  MessageStatus={() => <></>}
                />
              );
            }
            return (
              <Message
                logo={""}
                date={
                  dayjs(item.date).format("DD.MM.YYYY") !==
                  dayjs(messages[index + 1]?.date).format("DD.MM.YYYY")
                    ? dayjs().format("DD.MM.YYYY") ===
                      dayjs(item.date).format("DD.MM.YYYY")
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
                MessageStatus={() => {
                  if (item.status === "done") {
                    return (
                      <Entypo
                        style={{
                          position: "absolute",
                          right: 0,
                          top: -6,
                          padding: 3,
                          backgroundColor: "#02C39A",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                        name="check"
                        size={12}
                        color="black"
                      />
                    );
                  }
                  if (item.status === "failed") {
                    return (
                      <Entypo
                        style={{
                          position: "absolute",
                          right: 0,
                          top: -6,
                          padding: 3,
                          backgroundColor: "#fc4949",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                        name="cross"
                        size={12}
                        color="black"
                      />
                    );
                  } else return <></>;
                }}
              />
            );
          }}
        />
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
    height: "100%",
    paddingVertical: 19,
  },
  icon: {
    overflow: "hidden",
    paddingHorizontal: 17,
  },
});
