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
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.keyboard}>
          {props.russianKeyboardData?.map((item, index) => {
            const isLastItem = index === props.russianKeyboardData.length - 1;
            return (
              <TouchableOpacity
                key={item.letter}
                style={{
                  flexGrow: isLastItem ? 1 : 0,
                }}
                disabled={props.russianKeyboardData[index].disabled}
                onPress={() =>
                  item.letter.length === 1
                    ? props.handleInput(item.letter)
                    : props.handleClear()
                }
              >
                <Text
                  style={{
                    overflow: "hidden",
                    fontSize: 23,
                    paddingVertical: 8,
                    width: isLastItem ? "100%" : 27,
                    flexGrow: isLastItem ? 1 : 0,
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
    paddingHorizontal: 10,
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
