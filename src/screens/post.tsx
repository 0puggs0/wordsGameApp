import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Message from "../components/message";

export default function Post() {
  const data = [
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
    {
      date: "13.09",
      time: "13:20",
      message: "Отправил слово",
    },
  ];
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Nunito-ExtraBold",
          fontSize: 28,
          color: "#6F7276",
        }}
      >
        Евпатий К
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item) => {
          return (
            <Message
              logo={""}
              date={item.date}
              time={item.time}
              message={item.message}
              button={() => ""}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 34,
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 90,
    backgroundColor: "#1D1F25",
    gap: 30,
  },
});
