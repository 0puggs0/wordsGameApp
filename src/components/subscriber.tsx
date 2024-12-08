import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Animated, { ZoomOut } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  username: string;
  id: string;
  fetchAcceptRequest: (id: string, status: "approve" | "reject") => void;
  image: string;
}
export default function Subscriber({
  username,
  id,
  image,
  fetchAcceptRequest,
}: Props) {
  return (
    <Animated.View exiting={ZoomOut.springify().stiffness(200).damping(80)}>
      <View style={styles.friendRequestCard}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "grey",
              borderRadius: 25,
            }}
          ></View> */}
          <Image
            style={{
              width: 50,
              height: 50,
              backgroundColor: "grey",
              borderRadius: 25,
            }}
            source={{ uri: image }}
          />
          <Text
            style={{
              fontFamily: "Nunito-Regular",
              fontSize: 20,
              color: "white",
            }}
          >
            {username}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              fetchAcceptRequest(id, "approve");
            }}
          >
            <AntDesign
              style={{
                padding: 5,
                backgroundColor: "#02C39A",
                borderRadius: 10,
                overflow: "hidden",
              }}
              name="check"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => fetchAcceptRequest(id, "reject")}>
            <AntDesign
              style={{
                padding: 5,
                backgroundColor: "#fc4949",
                borderRadius: 10,
                overflow: "hidden",
              }}
              name="close"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  friendRequestCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 17,
    marginBottom: 10,
  },
});
