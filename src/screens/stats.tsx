import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "../utils/storage";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants/api";
import Feather from "@expo/vector-icons/Feather";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { useFocusEffect } from "@react-navigation/native";

type Props = StackScreenProps<RootStackParamList, "Stats", "MyStack">;

export default function Stats({ navigation }: Props) {
  const [currentWins, setCurrentWins] = useState(0);
  const [currentGames, setCurrentGames] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestCurrentStreak, setBestCurrentStreak] = useState(0);
  useEffect(() => {
    const fetchStorageData = async () => {
      const storageWins = await AsyncStorage.getItem("wins");
      if (storageWins !== null) {
        const intWins = parseInt(storageWins);
        setCurrentWins(intWins);
      }
      const storageGames = await AsyncStorage.getItem("played");
      if (storageGames !== null) {
        const intGames = parseInt(storageGames);
        setCurrentGames(intGames);
      }
      const storageStreak = await AsyncStorage.getItem("currentStreak");
      if (storageStreak !== null) {
        const intCurrentStreak = parseInt(storageStreak);
        setCurrentStreak(intCurrentStreak);
      }
      const storageBestStreak = await AsyncStorage.getItem("bestStreak");
      if (storageBestStreak !== null) {
        const intBestCurrentStreak = parseInt(storageBestStreak);
        setBestCurrentStreak(intBestCurrentStreak);
      }
    };
    fetchStorageData();
  }, []);

  const token = Storage.get("token");
  const { data, error, isPending, refetch } = useQuery({
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
  const resetStates = () => {
    setCurrentGames(0);
    setBestCurrentStreak(0);
    setCurrentStreak(0);
    setCurrentWins(0);
  };
  const statsData = [
    { value: currentGames, title: "Игр" },
    {
      value:
        currentGames !== 0
          ? ((currentWins / currentGames) * 100).toFixed(1)
          : 0,
      title: "Побед %",
    },
    { value: currentStreak, title: "Текущ. стрик" },
    { value: bestCurrentStreak, title: "Макс. стрик" },
    { value: 10, title: "Друзья" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
        {statsData.map((item, index, arr) => {
          return (
            <View style={{}}>
              <View
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#272931",
                }}
              ></View>

              <View
                key={item.title}
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  paddingHorizontal: 34,
                  paddingVertical: 10,
                }}
              >
                <Text style={styles.textTitle}>{item.value}</Text>
                <Text style={styles.textValue}>{item.title}</Text>
              </View>
            </View>
          );
        })}
        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#272931",
          }}
        ></View>
      </View>
      <View style={styles.buttonsBlock}>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.clear();
            resetStates();
          }}
          style={styles.button}
        >
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
});
