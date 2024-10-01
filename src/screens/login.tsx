import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { baseUrl } from "../constants/api";
import { Storage } from "../utils/storage";
import { useMutation } from "@tanstack/react-query";
type Props = StackScreenProps<RootStackParamList, "Login", "MyStack">;

export default function Login({ navigation }: Props) {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => {
      return fetch(`${baseUrl}/five_letters/login`, {
        method: "POST",
        body: JSON.stringify({
          email: loginValue,
          password: passwordValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.token) {
            console.log(data.data.token);
            Storage.set("token", data.data.token);
            navigation.navigate("InitialScreen");
          }
        })
        .catch((e) => {
          console.log(e);
          Alert.alert("Ошибка", "Неверный логин или пароль");
        });
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <View style={styles.heading}>
          <Text style={styles.headingFirst}>Catch</Text>
          <Text style={styles.headingSecond}>Word</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleFirstText}>С возвращением!</Text>
          <Text style={styles.titleSecondText}>
            Пожалуйста войдите в ваш аккаунт
          </Text>
        </View>
      </View>
      <View style={styles.centerBlock}>
        <View style={styles.inputBlock}>
          <TextInput
            placeholderTextColor={"#484B55"}
            placeholder="Логин"
            selectionColor={"#02C39A"}
            style={styles.textInput}
            value={loginValue}
            onChangeText={(value) => setLoginValue(value)}
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            placeholderTextColor={"#484B55"}
            placeholder="Пароль"
            secureTextEntry={true}
            selectionColor={"#02C39A"}
            style={styles.textInput}
            value={passwordValue}
            onChangeText={(value) => setPasswordValue(value)}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Забыли пароль?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={() =>
              passwordValue.length && loginValue.length
                ? mutate()
                : Alert.alert("Ошибка", "Вы ввели не все данные", [
                    {
                      text: "Закрыть",
                      style: "cancel",
                    },
                  ])
            }
            style={styles.topButton}
          >
            {isPending ? (
              <ActivityIndicator color={"white"} size={"small"} />
            ) : (
              <Text style={styles.topButtonText}>Войти</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.centerButton}>
            <AntDesign name="google" size={24} color="black" />
            <Text style={styles.centerButtonText}>Войти через Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Entypo name="vk" size={24} color="white" />
            <Text style={styles.bottomButtonText}>Войти через VK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.register}>
          <Text style={styles.firstRegisterText}>Нет аккаунта?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.secondRegisterText}> Создайте его</Text>
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
    gap: 8,
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
