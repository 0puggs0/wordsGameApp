import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  subject: string;
  timeStart: string;
  timeEnd: string;
  adress: string;
  professor: string;
}

export default function Pair(props: Props) {
  return (
    <View
      style={{
        backgroundColor: "lightblue",
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 40,
      }}
    >
      <View>
        <Text>{props.timeStart}</Text>
        <Text>{props.timeEnd}</Text>
      </View>
      <View>
        <Text>{props.subject}</Text>
        <Text>{props.adress}</Text>
        <Text>{props.professor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
