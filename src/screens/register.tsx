import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { baseUrl } from "../constants/api";
import { Storage } from "../utils/storage";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = StackScreenProps<RootStackParamList, "Register", "MyStack">;

export default function Register({ navigation }: Props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { error, data, isPending, mutate } = useMutation({
    mutationKey: ["register", userName, userEmail, userPassword],
    mutationFn: () => {
      return fetch(`${baseUrl}/five_letters/register`, {
        method: "POST",
        body: JSON.stringify({
          username: userName,
          email: userEmail,
          password: userPassword,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => {
          Storage.set("token", json.token);
        });
    },
  });

  // const register = () => {
  //   setIsLoading(true);
  //   fetch(`${baseUrl}/five_letters/register`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: userName,
  //       email: userEmail,
  //       password: userPassword,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setIsLoading(false);
  //       Storage.set("token", json.token);
  //     });
  // };
  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <View style={styles.heading}>
          <Text style={styles.headingFirst}>Catch</Text>
          <Text style={styles.headingSecond}>Word</Text>
        </View>
      </View>
      <View style={styles.centerBlock}>
        <View style={styles.title}>
          <Text style={styles.titleFirstText}>Создайте аккаунт</Text>
          <Text style={styles.titleSecondText}>Пожалуйста заполните форму</Text>
        </View>
        <View style={styles.inputBlock}>
          <TextInput
            placeholderTextColor={"#484B55"}
            placeholder="Имя"
            selectionColor={"#02C39A"}
            style={styles.textInput}
            value={userName}
            onChangeText={(value) => setUserName(value)}
            keyboardAppearance="dark"
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            placeholderTextColor={"#484B55"}
            placeholder="Email"
            selectionColor={"#02C39A"}
            style={styles.textInput}
            value={userEmail}
            onChangeText={(value) => setUserEmail(value)}
            keyboardAppearance="dark"
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            placeholderTextColor={"#484B55"}
            placeholder="Пароль"
            selectionColor={"#02C39A"}
            style={styles.textInput}
            value={userPassword}
            onChangeText={(value) => setUserPassword(value)}
            keyboardAppearance="dark"
            autoCapitalize="none"
          ></TextInput>
        </View>
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={() => {
              mutate();
            }}
            style={styles.topButton}
          >
            {isPending ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text style={styles.topButtonText}>Зарегистрироваться</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.register}>
          <Text style={styles.firstRegisterText}>Есть аккаунт?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.secondRegisterText}> Войдите</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 103,
    paddingHorizontal: 51,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1D1F25",
  },
  topBlock: { gap: 55 },
  centerBlock: {
    width: "100%",
    gap: 48,
  },
  bottomBlock: { width: "100%" },
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
  title: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleFirstText: {
    color: "white",
    fontFamily: "Nunito-Regular",
    fontSize: 25,
  },
  titleSecondText: {
    textAlign: "center",
    color: "#484B55",
    fontFamily: "Nunito-Regular",
    fontSize: 17,
  },
  inputBlock: { gap: 13 },
  textInput: {
    width: "100%",
    height: 54,
    backgroundColor: "#272931",
    borderRadius: 13,
    paddingHorizontal: 19,
    fontFamily: "Nunito-Regular",
    color: "#484B55",
    fontSize: 15,
  },
  forgotPassword: {
    textAlign: "right",
    fontFamily: "Nunito-Regular",
    color: "#484B55",
    fontSize: 15,
  },
  bottomButtons: {
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
    gap: 13,
  },
  topButton: {
    width: "100%",
    height: 59,
    backgroundColor: "#02C39A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonText: {
    color: "white",
    fontFamily: "Nunito-SemiBold",
    fontSize: 15,
  },
  centerButton: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    height: 59,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonText: {
    color: "#1D1F25",
    fontFamily: "Nunito-SemiBold",
    fontSize: 15,
  },
  bottomButton: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    height: 59,
    backgroundColor: "#2586F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonText: {
    color: "white",
    fontFamily: "Nunito-SemiBold",
    fontSize: 15,
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  firstRegisterText: {
    fontFamily: "Nunito-SemiBold",
    color: "white",
    fontSize: 15,
  },
  secondRegisterText: {
    fontFamily: "Nunito-Bold",
    color: "#02C39A",
    fontSize: 15,
  },
});
