import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "../utils/storage";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants/api";

export default function Stats() {
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
  const { data, error, isPending } = useQuery({
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
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Статистика</Text>
        <View style={styles.headerContainer}>
          <View style={styles.logo}></View>
          <View>
            <Text style={styles.nickname}>@{data.username}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsBlock}>
        {statsData.map((item) => {
          return (
            <View
              key={item.title}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
              }}
            >
              <Text style={styles.textTitle}>{item.value}</Text>
              <Text style={styles.textValue}>{item.title}</Text>
            </View>
          );
        })}
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
    paddingVertical: 100,
    flex: 1,
    backgroundColor: "#1D1F25",
    paddingHorizontal: 34,
    gap: 20,
    justifyContent: "space-between",
  },
  header: { gap: 25 },
  heading: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 38,
    color: "#CED5DB",
    textAlign: "center",
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
  statsBlock: { gap: 10 },
  buttonsBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
