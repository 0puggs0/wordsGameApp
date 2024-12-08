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

function Message(props: Props) {
  const status = props.status;
  const gap = status !== "pending" || (status === "pending" && props.isSender);
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{props.date}</Text>
      <View
        style={
          !props.isSender
            ? styles.messageContainer
            : styles.messageContainerReverse
        }
      >
        <View
          style={[
            styles.messageContent,
            {
              gap: gap ? 0 : 10,
            },
          ]}
        >
          <props.MessageStatus />
          <Text style={styles.message}>{props.message}</Text>
          {status !== "pending" && (
            <Text style={styles.word}>{props.word.toUpperCase()}</Text>
          )}
          {status === "pending" && props.isSender && (
            <Text style={styles.word}>{props.word.toUpperCase()}</Text>
          )}
          {!props.isSender && status === "pending" && (
            <TouchableOpacity onPress={props.button}>
              <MaterialIcons
                style={styles.button}
                name="done"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.time}>{props.time}</Text>
      </View>
    </View>
  );
}
export default Message;
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
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
  messageContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: "#CED5DB",
    borderRadius: 10,
  },
  date: {
    textAlign: "center",
    color: "#6F7276",
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 16,
  },
  message: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: "#1D1F25",
  },
  word: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#1D1F25",
  },
  button: {
    padding: 6,
    backgroundColor: "#02C39A",
    borderRadius: 8,
    overflow: "hidden",
  },
  time: {
    alignSelf: "flex-end",
    fontFamily: "Nunito-Bold",
    fontSize: 15,
    color: "#6F7276",
    bottom: 10,
  },
});
