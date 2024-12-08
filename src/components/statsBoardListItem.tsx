import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  name: string;
  image: string;
  number: number;
  percentOfWins: number;
  color: string;
  textColor: string;
  textPercentColor: string;
  navigate: () => void;
}
export default function StatsBoardListItem({
  name,
  image,
  number,
  percentOfWins,
  color,
  textColor,
  textPercentColor,
  navigate,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() => navigate()}
      style={{
        backgroundColor: color,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 15,
      }}
    >
      <View style={styles.leftContent}>
        <Text
          style={{
            fontFamily: "Nunito-Medium",
            fontSize: 16,
            color: textColor,
          }}
        >
          {number}
        </Text>
        <View style={styles.innerLeftContent}>
          <Image
            style={{
              width: 40,
              height: 40,
              backgroundColor: "white",
              borderRadius: 25,
            }}
            source={{ uri: image }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "Nunito-Medium",
              fontSize: 20,
              color: textColor,
              width: 100,
            }}
          >
            {name}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: textPercentColor,
          fontFamily: "Nunito-Medium",
          fontSize: 18,
        }}
      >
        {percentOfWins} p/w
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  leftContent: {
    gap: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  innerLeftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
