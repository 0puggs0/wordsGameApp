import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
type Props = StackScreenProps<RootStackParamList, "InitialScreen", "MyStack">;

export default function InitialScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>initialScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
        <Text>Статистика</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Word")}>
        <Text>Играть</Text>
      </TouchableOpacity>
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
});
