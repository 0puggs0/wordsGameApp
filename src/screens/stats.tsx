import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Stats() {
  const [currentWins, setCurrentWins] = useState(0);
  const [currentGames, setCurrentGames] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
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
    };
    fetchStorageData();
  }, []);

  const newArr = [
    { value: currentGames, title: "Игр" },
    {
      value:
        currentGames !== 0
          ? ((currentWins / currentGames) * 100).toFixed(1)
          : 0,
      title: "Побед %",
    },
    { value: currentStreak, title: "Текущ. стрик" },
    { value: 6, title: "Макс. стрик" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            width: 66,
            height: 66,
            backgroundColor: "#CED5DB",
            borderRadius: 32,
          }}
        ></View>
        <View>
          <Text
            style={{
              color: "#CED5DB",
              fontFamily: "Nunito-ExtraBold",
              fontSize: 28,
            }}
          >
            @puggsMaster
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {newArr.map((item) => {
          return (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textTitle}>{item.value}</Text>
              <Text style={styles.textValue}>{item.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    flex: 1,
    backgroundColor: "#1D1F25",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  textTitle: {
    color: "#02C39A",
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    fontSize: 32,
    width: 170,
  },
  textValue: {
    color: "#CED5DB",
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    width: 130,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});
