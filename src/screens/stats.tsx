import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Storage } from "../utils/storage";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants/api";
import Feather from "@expo/vector-icons/Feather";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { useFocusEffect } from "@react-navigation/native";
import { UserData } from "../interfaces/getUser";

interface UserStats {
  message: UserStat;
}
interface UserStat {
  currentStreak: number;
  friends: Array<{ id: string; username: string }>;
  games: number;
  maxStreak: number;
  percentOfWins: number;
}

type Props = StackScreenProps<RootStackParamList, "Stats", "MyStack">;

export default function Stats({ navigation, route }: Props) {
  const userId = route?.params?.userId;
  const userName = route?.params?.userName;
  const userImage = route?.params?.userImage;
  const [userData, setUserData] = useState<UserStats>({
    message: {
      currentStreak: 0,
      games: 0,
      maxStreak: 0,
      percentOfWins: 0,
      friends: [{ id: "", username: "" }],
    },
  });
  const token = Storage.get("token");
  const { data, error, isPending, refetch } = useQuery<UserData>({
    queryKey: ["username"],
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
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    const getStats = async () => {
      if (userId) {
        const response = await getUserStats(userId);
        setUserData(response);
      }
    };
    getStats();
  }, []);

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

    const data = await response.json();
    return data;
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

  const statsData = [
    { value: data?.stats?.games, title: "Игр" },
    {
      value: data?.stats?.percentOfWins.toFixed(1),
      title: "Побед %",
    },
    { value: data?.stats?.currentStreak, title: "Текущ. стрик" },
    { value: data?.stats?.maxStreak, title: "Макс. стрик" },
    { value: data?.friends?.length, title: "Друзья" },
  ];
  const userStatsData = [
    {
      value: userId !== undefined && userData?.message?.games,
      title: "Игр",
    },
    {
      value: userId !== undefined && userData.message?.percentOfWins.toFixed(1),
      title: "Побед %",
    },
    {
      value: userId !== undefined && userData?.message?.currentStreak,
      title: "Текущ. стрик",
    },
    {
      value: userId !== undefined && userData?.message?.maxStreak,
      title: "Макс. стрик",
    },
    { value: userData?.message?.friends.length, title: "Друзья" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlock}>
          <Text style={styles.heading}>Профиль</Text>
          {userId === undefined && (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Feather name="settings" size={29} color="#CED5DB" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerContainer}>
          {userName === undefined ? (
            <Image source={{ uri: data?.image }} style={styles.logo}></Image>
          ) : (
            <Image source={{ uri: userImage }} style={styles.logo}></Image>
          )}
          <View>
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.nickname}>
                @{userName === undefined ? data?.username : userName}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View>
        {userId === undefined
          ? statsData.map((item) => {
              return (
                <View>
                  <View style={styles.border}></View>

                  <View key={item.title} style={styles.statsRow}>
                    <Text style={styles.textTitle}>{item.value}</Text>
                    <Text style={styles.textValue}>{item.title}</Text>
                  </View>
                </View>
              );
            })
          : userStatsData.map((item) => {
              return (
                <View>
                  <View style={styles.border}></View>

                  <View key={item.title} style={styles.statsRow}>
                    <Text style={styles.textTitle}>{item.value}</Text>
                    <Text style={styles.textValue}>{item.title}</Text>
                  </View>
                </View>
              );
            })}
        <View style={styles.border}></View>
      </View>
      <View style={styles.buttonsBlock}>
        {userId === undefined && (
          <>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Сбросить статистику</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Таблица лидеров</Text>
            </TouchableOpacity>
          </>
        )}
        {userId !== undefined &&
          data?.friends?.map((item) => item.id).includes(userId) && (
            <>
              <TouchableOpacity
                onPress={() =>
                  userName !== undefined &&
                  navigation.navigate("Post", {
                    username: userName,
                    userId: userId,
                  })
                }
                style={styles.button}
              >
                <Text style={styles.textButton}>Отправить сообщение</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Удалить из друзей</Text>
              </TouchableOpacity>
            </>
          )}
        {userId !== undefined &&
          !data?.friends?.map((item) => item.id).includes(userId) && (
            <TouchableOpacity
              onPress={() => addFriend(userId)}
              style={styles.button}
            >
              <Text style={styles.textButton}>Добавить в друзья</Text>
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    flex: 1,
    backgroundColor: "#1D1F25",
    gap: 20,
    justifyContent: "space-between",
  },
  header: { gap: 25, paddingHorizontal: 34 },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: 38,
    color: "#CED5DB",
    textAlign: "center",
    alignSelf: "center",
  },
  textTitle: {
    color: "#02C39A",
    textAlign: "right",
    fontFamily: "Nunito-Regular",
    fontSize: 32,
    width: 170,
  },
  textValue: {
    color: "#CED5DB",
    textAlign: "left",
    fontFamily: "Nunito-Bold",
    fontSize: 24,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
  logo: {
    width: 66,
    height: 66,
    backgroundColor: "#CED5DB",
    borderRadius: 32,
  },
  nickname: {
    color: "#CED5DB",
    fontFamily: "Nunito-SemiBold",
    fontSize: 28,
    textAlign: "center",
  },
  statsBlock: {},
  buttonsBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 34,

    gap: 14,
  },
  button: {
    width: "100%",
    height: 59,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CED5DB",
    borderRadius: 13,
  },
  textButton: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "#1D1F25",
  },
  border: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#272931",
  },
  headerBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statsRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    paddingHorizontal: 34,
    paddingVertical: 10,
  },
});
