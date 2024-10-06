import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Storage } from "../utils/storage";
import { baseUrl } from "../constants/api";
import { UserData } from "../interfaces/getUser";

export default function Profile() {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const token = Storage.get("token");

  const { data, error, isPending, refetch } = useQuery<UserData>({
    queryKey: ["username"],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
      };
      if (token) {
        headers.Authorization = token;
      }
      const response = await fetch(`${baseUrl}/five_letters/user`, {
        headers: headers,
      });
      return response.json();
    },
  });

  const [username, setUsername] = useState(data?.username);

  const changeData = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    await fetch(`${baseUrl}/five_letters/edit`, {
      method: "POST",
      body: JSON.stringify({
        username: loginValue,
      }),
      headers: headers,
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const refresh = () => {
    if (loginValue !== data?.username && loginValue.length) {
      setUsername(loginValue);
      changeData();
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", gap: 5 }}>
        <View
          style={{
            width: 1,
            padding: 50,
            backgroundColor: "gray",
            borderRadius: 50,
          }}
        ></View>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={{ width: "100%", gap: 10 }}>
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Логин</Text>
          <TextInput
            placeholder="Новый логин"
            placeholderTextColor={"#6F7276"}
            style={{
              height: 54,
              backgroundColor: "#272931",
              borderRadius: 13,
              paddingHorizontal: 19,
              fontFamily: "Nunito-Regular",
              color: "#6F7276",
              fontSize: 15,
            }}
            value={loginValue}
            onChangeText={(value) => setLoginValue(value)}
          />
        </View>

        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Пароль</Text>
          <TextInput
            placeholder="Новый пароль"
            placeholderTextColor={"#6F7276"}
            style={{
              width: "100%",
              height: 54,
              backgroundColor: "#272931",
              borderRadius: 13,
              paddingHorizontal: 19,
              fontFamily: "Nunito-Regular",
              color: "#6F7276",
              fontSize: 15,
            }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => refresh()} style={{ width: "100%" }}>
        <Text
          style={{
            paddingVertical: 16,
            backgroundColor: "#02C39A",
            textAlign: "center",
            borderRadius: 13,
            overflow: "hidden",
            color: "white",
            fontFamily: "Nunito-Bold",
            fontSize: 18,
          }}
        >
          Сохранить
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 80,
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1D1F25",
  },
  username: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 25,
    color: "#CED5DB",
  },
  title: {
    fontFamily: "Nunito-Regular",
    fontSize: 17,
    color: "#CED5DB",
  },
});
