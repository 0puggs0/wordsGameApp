import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { SetStateAction } from "react";
import Animated, { ZoomOut } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Friend } from "../interfaces/getUser";

interface Props {
  navigationPost: () => void;
  navigationStats: () => void;
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  isLongPress: Boolean;
  setLongPress: (value: SetStateAction<boolean>) => void;
  item: Friend;
  setCurrentUserId: (value: string) => void;
  setModalVisible: (value: SetStateAction<boolean>) => void;
}
export default function FriendElement({
  navigationPost,
  navigationStats,
  bottomSheetRef,
  setLongPress,
  isLongPress,
  item,
  setCurrentUserId,
  setModalVisible,
}: Props) {
  return (
    <Animated.View exiting={ZoomOut.springify().stiffness(200).damping(80)}>
      <TouchableOpacity
        onPress={async () => {
          try {
            navigationStats();
            bottomSheetRef?.current?.dismiss();
          } catch (error) {
            console.error("Error fetching user stats:", error);
          }
        }}
        onLongPress={() => setLongPress(!isLongPress)}
        style={styles.friendCard}
      >
        <View style={styles.friendCardContent}>
          <Image
            style={styles.friendLogo}
            source={{
              uri: !item.image
                ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                : item.image,
            }}
          />

          <Text style={styles.friendNameText}>{item.username}</Text>
        </View>
        {isLongPress ? (
          <TouchableOpacity
            onPress={() => {
              setCurrentUserId(item.id);
              setModalVisible(true);
            }}
          >
            <AntDesign
              style={styles.closeButton}
              name="close"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigationPost()}>
            <Feather name="mail" size={27} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  friendCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: "#6F7276",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  friendCardContent: {
    flexDirection: "row",
    alignItems: "center",

    gap: 13,
  },
  friendLogo: {
    width: 50,
    height: 50,
    backgroundColor: "grey",
    borderRadius: 25,
  },
  friendNameText: {
    fontFamily: "Nunito-Regular",
    fontSize: 20,
    color: "white",
  },
  closeButton: {
    padding: 3,
    backgroundColor: "#fc4949",
    borderRadius: 8,
    overflow: "hidden",
  },
  chatButton: {
    padding: 5,
    backgroundColor: "#02C39A",
    borderRadius: 8,
    overflow: "hidden",
  },
});
