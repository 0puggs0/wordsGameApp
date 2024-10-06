import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { Storage } from "../utils/storage";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants/api";
import Feather from "@expo/vector-icons/Feather";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { useFocusEffect } from "@react-navigation/native";
import { UserData } from "../interfaces/getUser";
import { calculateStats } from "../utils/calculateStats";

type Props = StackScreenProps<RootStackParamList, "Stats", "MyStack">;

export default function Stats({ navigation }: Props) {
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

  const statsData = [
    { value: data?.stats.length, title: "Игр" },
    {
      value: calculateStats(data)?.percentOfWins.toFixed(1),
      title: "Побед %",
    },
    { value: calculateStats(data)?.currentStreak, title: "Текущ. стрик" },
    { value: calculateStats(data)?.maxStreak, title: "Макс. стрик" },
    { value: data?.friends.length, title: "Друзья" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlock}>
          <Text style={styles.heading}>Профиль</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Feather name="settings" size={29} color="#CED5DB" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.logo}></View>
          <View>
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.nickname}>@{data?.username}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.statsBlock}>
        {statsData.map((item) => {
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Сбросить статистику</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Таблица лидеров</Text>
        </TouchableOpacity>
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
    fontFamily: "Nunito-ExtraBold",
    fontSize: 38,
    color: "#CED5DB",
    textAlign: "center",
    alignSelf: "center",
  },
  textTitle: {
    color: "#02C39A",
    textAlign: "right",
    fontFamily: "Nunito-Bold",
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
    fontFamily: "Nunito-ExtraBold",
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
