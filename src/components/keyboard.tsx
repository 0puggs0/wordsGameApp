import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { KeyboardItem } from "../interfaces/wordScreenInterface";

interface Props {
  handleCheck: () => void;
  handleClear: () => void;
  handleInput: (symbol: string) => void;
  russianKeyboardData: KeyboardItem[];
}
export function Keyboard(props: Props) {
  const russianKeyboardData: KeyboardItem[] = [
    { id: 1, key: 1, letter: "й", backgroundColor: "#343548", color: "white" },
    { id: 2, key: 1, letter: "ц", backgroundColor: "#343548", color: "white" },
    { id: 3, key: 1, letter: "у", backgroundColor: "#343548", color: "white" },
    { id: 4, key: 1, letter: "к", backgroundColor: "#343548", color: "white" },
    { id: 5, key: 1, letter: "е", backgroundColor: "#343548", color: "white" },
    { id: 6, key: 1, letter: "н", backgroundColor: "#343548", color: "white" },
    { id: 7, key: 1, letter: "г", backgroundColor: "#343548", color: "white" },

    { id: 8, key: 2, letter: "ш", backgroundColor: "#343548", color: "white" },
    { id: 9, key: 2, letter: "щ", backgroundColor: "#343548", color: "white" },
    { id: 10, key: 2, letter: "з", backgroundColor: "#343548", color: "white" },
    { id: 11, key: 2, letter: "х", backgroundColor: "#343548", color: "white" },
    { id: 12, key: 2, letter: "ъ", backgroundColor: "#343548", color: "white" },

    { id: 13, key: 3, letter: "ф", backgroundColor: "#343548", color: "white" },
    { id: 14, key: 3, letter: "ы", backgroundColor: "#343548", color: "white" },
    { id: 15, key: 3, letter: "в", backgroundColor: "#343548", color: "white" },
    { id: 16, key: 3, letter: "а", backgroundColor: "#343548", color: "white" },
    { id: 17, key: 3, letter: "п", backgroundColor: "#343548", color: "white" },
    { id: 18, key: 3, letter: "р", backgroundColor: "#343548", color: "white" },
    { id: 19, key: 3, letter: "о", backgroundColor: "#343548", color: "white" },

    { id: 20, key: 4, letter: "л", backgroundColor: "#343548", color: "white" },
    { id: 21, key: 4, letter: "д", backgroundColor: "#343548", color: "white" },
    { id: 22, key: 4, letter: "ж", backgroundColor: "#343548", color: "white" },
    { id: 23, key: 4, letter: "э", backgroundColor: "#343548", color: "white" },
    { id: 24, key: 4, letter: "я", backgroundColor: "#343548", color: "white" },
    { id: 25, key: 4, letter: "ч", backgroundColor: "#343548", color: "white" },
    { id: 26, key: 4, letter: "с", backgroundColor: "#343548", color: "white" },

    { id: 27, key: 5, letter: "м", backgroundColor: "#343548", color: "white" },
    { id: 28, key: 5, letter: "и", backgroundColor: "#343548", color: "white" },
    { id: 29, key: 5, letter: "т", backgroundColor: "#343548", color: "white" },
    { id: 30, key: 5, letter: "ь", backgroundColor: "#343548", color: "white" },
    { id: 31, key: 5, letter: "б", backgroundColor: "#343548", color: "white" },
    { id: 32, key: 5, letter: "ю", backgroundColor: "#343548", color: "white" },
    {
      id: 33,
      key: 5,
      letter: "стереть",
      backgroundColor: "#343548",
      color: "white",
    },
  ];
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.keyboard}>
          {props.russianKeyboardData.map((item, index) => {
            const isLastItem = index === russianKeyboardData.length - 1;
            return (
              <TouchableOpacity
                onPress={() =>
                  item.letter.length === 1
                    ? props.handleInput(item.letter)
                    : props.handleClear()
                }
              >
                <View style={styles.wordBlock}>
                  <Text
                    style={{
                      overflow: "hidden",
                      fontSize: 23,
                      paddingVertical: 8,
                      width: !isLastItem ? 27 : 120,
                      color: "white",
                      textAlign: "center",
                      backgroundColor:
                        props.russianKeyboardData[index].backgroundColor,
                      borderRadius: 8,
                      fontFamily: "Nunito-Regular",
                    }}
                  >
                    {item.letter}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => props.handleCheck()}
          style={{ paddingHorizontal: 5, width: "100%", marginTop: 5 }}
        >
          <Text style={styles.button}>ПРОВЕРИТЬ СЛОВО</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    justifyContent: "center",
    paddingHorizontal: 5,
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
    width: 122,
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
    fontSize: 15,
    fontFamily: "Nunito-SemiBold",
  },
});
