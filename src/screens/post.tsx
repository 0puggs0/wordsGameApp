import {
  Alert,
  FlatList,
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
import React, { useEffect, useRef, useState } from "react";
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
  const animatedPadding = useSharedValue(34);
  const keyboardDidShow = () => {
    setKeyboardOpen(true);
    animatedPadding.value = withTiming(0, { duration: 250 });
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({
        animated: true,
      });
    }
  };

  const keyboardDidHide = () => {
    setKeyboardOpen(false);
    animatedPadding.value = withTiming(34, { duration: 250 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: animatedPadding.value,
    };
  });
  const { username, userId } = route?.params;
  const [word, setWord] = useState("");
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const token = Storage.get("token");
  const wordRequests = useQuery<WordRequests>({
    queryKey: ["wordRequests"],
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
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({
        animated: true,
      });
    }
  }, [wordRequests?.data?.message.length]);

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
      Alert.alert("Слово отправлено");
    } else {
      Alert.alert("Ошибка при отправке слова");
    }
    console.log(await response.json());
  };

  return (
    <View onTouchStart={() => Keyboard.dismiss()} style={styles.container}>
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
        <FlatList
          data={wordRequests?.data?.message}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ref={flatListRef}
          renderItem={({ item }) => {
            if (item.senderId === userId) {
              return (
                <Message
                  logo={""}
                  date={dayjs(item.date).format("DD.MM.YYYY")}
                  time={dayjs(item.date).format("HH:mm")}
                  message={"Отправил слово"}
                  button={() =>
                    navigation.navigate("Word", { message: item.word })
                  }
                  isSender={false}
                />
              );
            }
            return (
              <Message
                logo={""}
                date={dayjs(item.date).format("DD.MM.YYYY")}
                time={dayjs(item.date).format("HH:mm")}
                message={`Отправил слово - ${item.word}`}
                button={() =>
                  navigation.navigate("Word", { message: item.word })
                }
                isSender={true}
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
            onPress={() => sendWord(word, userId)}
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
              size={23}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 34,
    justifyContent: "flex-start",
    flex: 1,
    paddingVertical: 80,
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
