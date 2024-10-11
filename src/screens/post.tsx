import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Message from "../components/message";
import { useQuery } from "@tanstack/react-query";
import { Storage } from "../utils/storage";
import { baseUrl } from "../constants/api";
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
  ZoomOut,
} from "react-native-reanimated";
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
  const animatedPadding = useSharedValue(34);
  const keyboardDidShow = () => {
    setKeyboardOpen(true);
    animatedPadding.value = withTiming(0, { duration: 250 }); // изменение paddingHorizontal при открытой клавиатуре
  };

  const keyboardDidHide = () => {
    setKeyboardOpen(false);
    animatedPadding.value = withTiming(34, { duration: 250 }); // возвращение к исходному значению при закрытой клавиатуре
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: animatedPadding.value,
    };
  });
  const { username, userId } = route?.params;
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
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
    <Pressable
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={5}
      >
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
            placeholder="Отправить слово"
            style={styles.sendWordInput}
            placeholderTextColor={"#6F7276"}
            blurOnSubmit={true}
          />
          <TouchableOpacity
            style={{
              borderTopRightRadius: 13,
              borderBottomRightRadius: 13,
              backgroundColor: "#272931",
            }}
          >
            <Feather
              style={{
                overflow: "hidden",
                paddingHorizontal: 17,
                padding: 20,
              }}
              name="send"
              size={22}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </Pressable>
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
});
