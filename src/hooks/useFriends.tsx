import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";
import { UserData } from "../interfaces/getUser";
import { FriendRequestsData } from "../interfaces/getFriendRequests";
import { SearchAllUsers } from "../interfaces/getAllUsers";
import { baseUrl, headers } from "../constants/api";
import { Storage } from "../utils/storage";
import { Alert } from "react-native";
import { useState } from "react";

const useFriends = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const token = Storage.get("token");

  const friendRequests = useQuery<FriendRequestsData>({
    queryKey: ["friends"],
    queryFn: async () =>
      await fetchData("five_letters/friend-requests", headers, token),
  });
  const friends = useQuery<UserData>({
    queryKey: ["user"],
    queryFn: async () => await fetchData("five_letters/user", headers, token),
  });
  const users = useQuery<SearchAllUsers>({
    enabled: true,
    queryKey: ["users"],
    queryFn: async () => await fetchData("five_letters/users", headers, token),
  });
  const fetchAcceptRequest = async (
    id: string,
    action: "approve" | "reject"
  ) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(
      `https://oh.sssh.it/five_letters/friend-requests/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          action,
        }),
        headers: headers,
      }
    );

    friendRequests.refetch();
    if (action === "approve") {
      friends.refetch();
    }
  };
  const removeFriend = async (id: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(
      `${baseUrl}/five_letters/remove-friend/${id}`,
      {
        method: "POST",
        body: "",
        headers: headers,
      }
    );
    friends.refetch();
    setModalVisible(false);
  };
  const addFriend = async (id: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(`${baseUrl}/five_letters/add-friend`, {
      method: "POST",
      body: JSON.stringify({
        userId: id,
      }),
      headers: headers,
    });
    if (response.ok) {
      Alert.alert("Заявка отправлена", "");
    }
  };
  return {
    friendRequests,
    friends,
    users,
    addFriend,
    removeFriend,
    fetchAcceptRequest,
    modalVisible,
    setModalVisible,
  };
};
export default useFriends;
