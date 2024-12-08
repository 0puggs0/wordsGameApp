import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardItem } from "../interfaces/wordScreenInterface";

interface Props {
  handleCheck: () => void;
  handleClear: () => void;
  handleInput: (symbol: string) => void;
  russianKeyboardData: KeyboardItem[];
  disabledButton: boolean;
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
                key={item.id}
                style={[
                  styles.keyButton,
                  {
                    flexGrow: isLastItem ? 1 : 0,
                  },
                ]}
                onPress={() =>
                  item.letter.length === 1
                    ? props.handleInput(item.letter)
                    : props.handleClear()
                }
              >
                {index === props.russianKeyboardData.length - 1 ? (
                  <item.component />
                ) : (
                  <Text
                    style={[
                      {
                        width: isLastItem ? "100%" : 27,
                        flexGrow: isLastItem ? 1 : 0,
                        backgroundColor:
                          props.russianKeyboardData[index].backgroundColor,
                      },
                      styles.keyText,
                    ]}
                  >
                    {item.letter}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          disabled={props.disabledButton}
          onPress={props.handleCheck}
          style={styles.checkButton}
        >
          {!props.disabledButton ? (
            <Text style={styles.button}>ПРОВЕРИТЬ СЛОВО</Text>
          ) : (
            <View style={styles.freezeButton}>
              <ActivityIndicator size={"small"} />
            </View>
          )}
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
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  keyButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    overflow: "hidden",
    fontSize: 23,
    paddingVertical: 8,
    color: "white",
    textAlign: "center",
    borderRadius: 8,
    fontFamily: "Nunito-Regular",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#48495F",
    width: "100%",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "Nunito-SemiBold",
  },
  checkButton: {
    paddingHorizontal: 5,
    width: "100%",
    marginTop: 5,
  },
  freezeButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#48495F",
    width: "100%",
  },
});
