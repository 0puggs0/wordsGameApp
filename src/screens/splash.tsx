import { View } from "react-native";
import React from "react";
import { Storage } from "../utils/storage";
import { baseUrl } from "../constants/api";
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from "../types/rootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { UserData } from "../interfaces/getUser";

type Props = StackScreenProps<RootStackParamList, "Splash", "MyStack">;

export default function Splash({ navigation }: Props) {
  const token = Storage.get("token");
  const { data, error, isPending } = useQuery<UserData>({
    queryKey: ["user"],
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
      if (response.ok) {
        navigation.navigate("InitialScreen");
      } else {
        navigation.navigate("Login");
      }
      return response.json();
    },
  });
  return <View style={{ flex: 1 }}></View>;
}
