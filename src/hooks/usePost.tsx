import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { baseUrl, headers } from "../constants/api";
import { WordRequests, WordRequestsItem } from "../screens/post";
import { Storage } from "../utils/storage";
import { fetchData } from "../utils/fetchData";
import { useFocusEffect } from "@react-navigation/native";

const usePost = (userId: string, messageItem: WordRequestsItem | undefined) => {
  const [word, setWord] = useState("");
  const [offset, setOffset] = useState(-1);

  const [messages, setMessages] = useState<WordRequests["message"]>([]);
  const animatedPadding = useSharedValue(25);
  const token = Storage.get("token");

  useEffect(() => {
    setOffset((prev) => prev + 1);
    setMessages([]);
    getMessages(offset);
  }, []);
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
  useFocusEffect(
    useCallback(() => {
      if (messageItem) {
        setMessages((prev) =>
          prev.map((item) => {
            return item.id === messageItem.id ? messageItem : item;
          })
        );
      }
    }, [messageItem])
  );
  const flatListRef = useRef<FlatList>(null);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: animatedPadding.value,
    };
  });

  const keyboardDidShow = () => {
    animatedPadding.value = withTiming(8, { duration: 250 });
  };

  const keyboardDidHide = () => {
    animatedPadding.value = withTiming(25, { duration: 250 });
  };
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
      setMessages((prev) => [
        {
          word: word,
          date: new Date().toString(),
          username: "",
          id: "",
          senderId: "",
          targetId: "",
          status: "pending",
        },
        ...prev,
      ]);
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    } else {
      Alert.alert("Ошибка", "Данного слова нет в нашей базе");
    }
  };
  const getMessages = async (offset: number) => {
    const data = await fetchData(
      `five_letters/word-requests/${userId}?offset=${offset}`,
      headers,
      token
    );
    setMessages((prev) => [...prev, ...data.message]);
  };

  return {
    animatedStyle,
    getMessages,
    sendWord,
    keyboardDidShow,
    keyboardDidHide,
    messages,
    flatListRef,
    word,
    setWord,
    setMessages,
    setOffset,
    offset,
  };
};
export default usePost;
