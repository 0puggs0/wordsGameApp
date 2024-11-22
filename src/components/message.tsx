import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  logo: string;
  date: string;
  time: string;
  sender: string;
  message: string;
  word: string;
  button: () => void;
  isSender: boolean;
  status: string;
  MessageStatus: () => React.JSX.Element;
}

export default function Message(props: Props) {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#6F7276",
          fontFamily: "Nunito-Bold",
          fontSize: 18,
          marginBottom: 16,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap:
              props.status !== "pending" ||
              (props.status === "pending" && props.isSender)
                ? 0
                : 10,
            paddingHorizontal: 22,
            paddingVertical: 14,
            backgroundColor: "#CED5DB",
            borderRadius: 10,
          }}
        >
          <props.MessageStatus />
          <Text
            style={{
              fontFamily: "Nunito-Regular",
              fontSize: 16,
              color: "#1D1F25",
            }}
          >
            {props.message}
          </Text>
          {props.status !== "pending" && (
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 16,
                color: "#1D1F25",
              }}
            >
              {props.word.toUpperCase()}
            </Text>
          )}
          {props.status === "pending" && props.isSender && (
            <Text
              style={{
                fontFamily: "Nunito-Bold",
                fontSize: 16,
                color: "#1D1F25",
              }}
            >
              {props.word.toUpperCase()}
            </Text>
          )}
          {!props.isSender && props.status === "pending" && (
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
        <Text
          style={{
            alignSelf: "flex-end",
            fontFamily: "Nunito-Bold",
            fontSize: 15,
            color: "#6F7276",
            bottom: 10,
          }}
        >
          {props.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 46,
    height: 46,
    backgroundColor: "#CED5DB",
    borderRadius: 32,
    borderColor: "#02C39A",
    borderWidth: 4,
  },
  messageContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  messageContainerReverse: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
});
