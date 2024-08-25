import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export function Keyboard() {
  const russianKeyboardData = [
    { id: 1, key: 1, letter: "й" },
    { id: 2, key: 1, letter: "ц" },
    { id: 3, key: 1, letter: "у" },
    { id: 4, key: 1, letter: "к" },
    { id: 5, key: 1, letter: "е" },
    { id: 6, key: 1, letter: "н" },
    { id: 7, key: 1, letter: "г" },

    { id: 8, key: 2, letter: "ш" },
    { id: 9, key: 2, letter: "щ" },
    { id: 10, key: 2, letter: "з" },
    { id: 11, key: 2, letter: "х" },
    { id: 12, key: 2, letter: "ъ" },

    { id: 13, key: 3, letter: "ф" },
    { id: 14, key: 3, letter: "ы" },
    { id: 15, key: 3, letter: "в" },
    { id: 16, key: 3, letter: "а" },
    { id: 17, key: 3, letter: "п" },
    { id: 18, key: 3, letter: "р" },
    { id: 19, key: 3, letter: "о" },

    { id: 20, key: 4, letter: "л" },
    { id: 21, key: 4, letter: "д" },
    { id: 22, key: 4, letter: "ж" },
    { id: 23, key: 4, letter: "э" },
    { id: 24, key: 4, letter: "я" },
    { id: 25, key: 4, letter: "ч" },
    { id: 26, key: 4, letter: "с" },

    { id: 27, key: 5, letter: "м" },
    { id: 28, key: 5, letter: "и" },
    { id: 29, key: 5, letter: "т" },
    { id: 30, key: 5, letter: "ь" },
    { id: 31, key: 5, letter: "б" },
    { id: 32, key: 5, letter: "ю" },
    {
      id: 33,
      key: 5,
      letter: "стереть",
    },
  ];
  const initialValue = ["Емеля".split("")];
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [word, setWord] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const handleInput = (symbol: string) => {
    const currentWord = [...word];

    if (currentColumn >= 4) {
      setCurrentColumn(-1);
      setCurrentRow((prev) => prev + 1);
    }
    currentWord[currentRow][currentColumn] = symbol;
    setCurrentColumn((prev) => prev + 1);
    setWord(currentWord);
  };
  const handleCheck = () => "";
  const handleClear = () => {
    const currentWord = [...word];
    currentWord[currentRow][currentColumn - 1] = "";
    if (currentColumn >= 1) {
      setCurrentColumn((prev) => prev - 1);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {word.map((item) => {
            return (
              <View
                style={{
                  gap: 3,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.map((item) => {
                  return (
                    <View style={{}}>
                      <LinearGradient
                        colors={["#2D3047", "#48495F"]}
                        style={{
                          width: 73,
                          height: 67,
                          borderRadius: 10,
                          overflow: "hidden",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#A3A3AE",
                            fontSize: 38,
                            fontFamily: "Nunito-Bold",
                          }}
                        >
                          {item.toUpperCase()}
                        </Text>
                      </LinearGradient>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.keyboard}>
          {russianKeyboardData.map((item, index) => {
            const isLastItem = index === russianKeyboardData.length - 1;
            return (
              <TouchableOpacity
                onPress={() =>
                  item.id < 33 ? handleInput(item.letter) : handleClear()
                }
              >
                <View style={styles.wordBlock}>
                  <Text
                    style={[
                      styles.wordText,
                      isLastItem && styles.lastWordBlock,
                    ]}
                  >
                    {item.letter}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={{ width: "100%", marginTop: 5 }}>
          <Text style={styles.button}>Проверить слово</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  wordText: {
    overflow: "hidden",
    fontSize: 23,
    paddingVertical: 8,
    width: 27,
    color: "white",
    textAlign: "center",
    backgroundColor: "#343548",
    borderRadius: 8,
    fontFamily: "Nunito-Regular",
  },
  lastWordBlock: {
    width: 124,
  },
  wordBlock: {},
  button: {
    paddingVertical: 15,
    backgroundColor: "#343548",
    width: "100%",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 7,
    fontSize: 18,
    fontFamily: "Nunito-Regular",
  },
});
