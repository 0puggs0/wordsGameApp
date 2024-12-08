import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import StatsBoardListItem from "../components/statsBoardListItem";
import BestPlayer from "../components/bestPlayer";
import { LeaderBoardItem } from "../interfaces/getLeaderBord";
import {
  backgroundColors,
  mapaBorders,
  mapaNumbers,
} from "../constants/leaderboardColors";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";

type Props = StackScreenProps<RootStackParamList, "StatsBoard", "MyStack">;

export default function StatsBoard({ navigation }: Props) {
  const [data, setData] = useState<LeaderBoardItem[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://oh.sssh.it/five_letters/leaders");
      if (response.ok) {
        const json = await response.json();
        setData(json.data);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{ zIndex: 1 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            position: "absolute",
            textAlign: "center",
            width: "100%",
            fontFamily: "Nunito-Medium",
            color: "white",
            fontSize: 25,
          }}
        >
          Таблица лидеров
        </Text>
      </View>

      <View
        style={{
          width: "150%",
          borderBottomColor: "gray",
          borderBottomWidth: 0.5,
          alignSelf: "center",
        }}
      ></View>
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            {[data[1], data[0], data[2]].map((item: LeaderBoardItem, index) => {
              return (
                <BestPlayer
                  name={item?.username}
                  percentOfWins={item?.win_percentage.toString()}
                  image={item?.avatar}
                  imageSize={index === 1 ? 130 : 85}
                  innerImageSize={35}
                  number={mapaNumbers[index].toString()}
                  borderColor={mapaBorders[index]}
                />
              );
            })}
          </View>
        )}
        indicatorStyle="white"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <StatsBoardListItem
              name={item.username}
              image={
                item.avatar
                  ? item.avatar
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              number={index + 1}
              percentOfWins={item.win_percentage}
              color={
                backgroundColors[index + 1]
                  ? backgroundColors[index + 1]
                  : "#1D1F25"
              }
              textColor={index < 3 ? "#1D1F25" : "white"}
              textPercentColor={
                index < 3 ? "rgba(29,31,37,0.6)" : "rgba(255, 255,255, 0.7)"
              }
              navigate={() =>
                navigation.navigate("Stats", {
                  userFriends: 0,
                  userId: item.id,
                  userImage: item.avatar,
                  userName: item.username,
                })
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 34,

    flex: 1,
    backgroundColor: "#1D1F25",
    paddingTop: 80,
  },
});
