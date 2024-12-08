import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

interface Props {
  name: string;
  number: string;
  percentOfWins: string;
  image: string;
  imageSize: number;
  innerImageSize: number;
  borderColor: string;
}
export default function BestPlayer({
  name,
  percentOfWins,
  image,
  imageSize,
  innerImageSize,
  number,
  borderColor,
}: Props) {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{
          uri: image
            ? image
            : "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        }}
        style={{
          width: imageSize,
          height: imageSize,
          backgroundColor: "gray",
          borderRadius: 65,
          borderWidth: 6,
          borderColor: borderColor,
        }}
      />
      <View
        style={{
          // 35
          width: innerImageSize,
          height: innerImageSize,
          backgroundColor: "white",
          borderRadius: 17.5,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#1D1F25",
          borderWidth: 6,
          bottom: 15,
        }}
      >
        <Text
          style={{
            color: "#1D1F25",
            fontFamily: "Nunito-SemiBold",
            fontSize: 16,
          }}
        >
          {number}
        </Text>
      </View>
      <View style={{ alignItems: "center", gap: 5 }}>
        <Text
          style={{ color: "white", fontFamily: "Nunito-Medium", fontSize: 18 }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "Nunito-Medium",
            fontSize: 16,
          }}
        >
          {percentOfWins} p/w
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
