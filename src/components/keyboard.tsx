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
    { id: 33, key: 5, letter: "стереть" },
  ];
  const initialValue = ["Емеля".split("")];
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [word, setWord] = useState([Array.from({ length: 25 }, () => "")]);
  const handleInput = (symbol: string) => {
    const currentWord = [...word];
    currentWord[currentRow][currentColumn] = symbol;
    setCurrentColumn((prev) => prev + 1);
    setWord(currentWord);
  };
  const handleCheck = () => "";
  const handleClear = (symbol: string) => {};
  return (
    <View>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {word.map((item) => {
            return (
              <View
                style={{
                  gap: 15,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  flexShrink: 3,
                }}
              >
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
        <View style={styles.keyboard}>
          {russianKeyboardData.map((item, index) => {
            const isLastItem = index === russianKeyboardData.length - 1;
            return (
              <TouchableOpacity onPress={() => handleInput(item.letter)}>
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
    backgroundColor: "black",
    borderRadius: 8,
  },
  lastWordBlock: {
    width: 124,
  },
  wordBlock: {},
  button: {
    paddingVertical: 15,
    backgroundColor: "black",
    width: "100%",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 10,
    fontSize: 18,
  },
});
