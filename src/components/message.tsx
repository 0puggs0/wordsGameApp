import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  logo: string;
  date: string;
  time: string;
  message: string;
  button: () => void;
  isSender: boolean;
}

export default function Message(props: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          textAlign: "center",
          color: "#6F7276",
          fontFamily: "Nunito-Bold",
          fontSize: 18,
        }}
      >
        {props.date}
      </Text>
      <View
        style={
          !props.isSender
            ? styles.messageContainer
            : styles.messageContainerReverse
        }
      >
        <View style={{ gap: 5 }}>
          <View style={styles.logo}></View>
          <Text
            style={{
              color: "#6F7276",
              fontFamily: "Nunito-Bold",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {props.time}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 22,
            paddingVertical: 14,
            backgroundColor: "#CED5DB",
            borderRadius: 13,
            gap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito-SemiBold",
              fontSize: 20,
              color: "#1D1F25",
              maxWidth: 220,
            }}
          >
            {props.message}
          </Text>
          {!props.isSender && (
            <TouchableOpacity onPress={props.button}>
              <MaterialIcons
                style={{
                  padding: 6,
                  backgroundColor: "#02C39A",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                name="done"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 66,
    backgroundColor: "#CED5DB",
    borderRadius: 32,
    borderColor: "#02C39A",
    borderWidth: 6,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageContainerReverse: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
