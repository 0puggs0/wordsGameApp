import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
type Props = StackScreenProps<RootStackParamList, "InitialScreen", "MyStack">;

export default function InitialScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CatchWord</Text>
      <View style={{ alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Word")}>
          <Text style={styles.button}>Играть</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
          <Text style={styles.button}>Статистика</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1F25",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Nunito-ExtraBold",
    color: "white",
    textAlign: "center",
    fontSize: 36,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: "hidden",
    backgroundColor: "#02C39A",
    color: "white",
    fontFamily: "Nunito-Meduim",
    fontSize: 25,
    borderRadius: 10,
  },
});
