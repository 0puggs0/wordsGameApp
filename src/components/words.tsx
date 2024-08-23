import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Words() {
  const data = [
    "Eмеля".toUpperCase().split(""),
    "Аудио".toUpperCase().split(""),
    "Кирка".toUpperCase().split(""),
  ];

  return (
    <View>
      {data.map((item) => {
        return (
          <View style={{ gap: 10, flexDirection: "row" }}>
            {item.map((item) => {
              return (
                <View style={{ gap: 5 }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      padding: 15,
                      overflow: "hidden",
                      backgroundColor: "gray",
                      width: 50,
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
