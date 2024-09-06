import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
type Props = StackScreenProps<RootStackParamList, "InitialScreen", "MyStack">;

export default function InitialScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingFirst}>Catch</Text>
        <Text style={styles.headingSecond}>Word</Text>
      </View>
      <View style={styles.categories}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate("Word")}
        >
          <Text style={styles.playButtonText}>Играть</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.friendButton}
          onPress={() => navigation.navigate("Stats")}
        >
          <Text style={styles.friendButtonText}>Слово для друга</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCategories}>
        <View style={styles.bottomCategoriesBlock}>
          <TouchableOpacity style={styles.leftButton}>
            <Feather name="mail" size={34} color="#1D1F25" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.centerButton}>
            <Feather name="user" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Stats")}
            style={styles.leftButton}
          >
            <Ionicons name="stats-chart" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.signOutBlock}>
          <Text style={styles.signOutTitle}>Хотите сменить аккаунт?</Text>
          <TouchableOpacity>
            <Text style={styles.signOut}> Выйти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 51,
    paddingVertical: 144,
    flex: 1,
    backgroundColor: "#1D1F25",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headingFirst: {
    fontFamily: "Nunito-ExtraBold",
    color: "white",
    textAlign: "center",
    fontSize: 50,
    margin: 0,
    padding: 0,
  },
  headingSecond: {
    fontFamily: "Nunito-ExtraBold",
    color: "#02C39A",
    textAlign: "center",
    fontSize: 50,
    margin: 0,
    padding: 0,
  },
  playButton: {
    width: "100%",
    height: 69,
    backgroundColor: "#02C39A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  friendButton: {
    width: "100%",
    height: 69,
    backgroundColor: "#CED5DB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: {
    color: "white",
    fontFamily: "Nunito-Bold",
    fontSize: 22,
  },
  friendButtonText: {
    color: "#1D1F25",
    fontFamily: "Nunito-Bold",
    fontSize: 22,
  },
  categories: {
    width: "100%",
    gap: 20,
  },
  bottomCategories: {
    width: "100%",
    alignItems: "center",
  },
  bottomCategoriesBlock: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
  },
  leftButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 68,
    height: 62,
    backgroundColor: "#CED5DB",
    borderRadius: 13,
  },
  centerButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 91,
    height: 79,
    backgroundColor: "#02C39A",
    borderRadius: 13,
  },
  signOutBlock: {
    marginTop: 15,
    flexDirection: "row",
  },
  signOutTitle: {
    color: "#CED5DB",
    fontFamily: "Nunito-SemiBold",
    fontSize: 15,
  },
  signOut: {
    color: "#02C39A",
    fontFamily: "Nunito-Bold",
    fontSize: 15,
  },
});
