import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface Props {
  correctWord: string;
  modalVisible: boolean;
  isWin: boolean;
  modalNext: () => void;
  isError: boolean;
  errorType: string;
}
export default function ModalWindow(props: Props) {
  return (
    <Modal visible={props.modalVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            gap: 10,
            borderColor: "#343548",
            borderWidth: 8,
            backgroundColor: "#6F7276",
            width: "100%",
            height: 200,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {props.isError ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontFamily: "Nunito-Bold", fontSize: 25 }}>
                  Ошибка!
                </Text>
                <Text style={{ fontFamily: "Nunito-Regular", fontSize: 19 }}>
                  {props.errorType === "wordLength" &&
                    "Введите слово из 5 букв"}
                  {props.errorType === "correctWord" &&
                    "Данного слова не существует"}
                </Text>
              </View>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontFamily: "Nunito-Bold", fontSize: 25 }}>
                  {props.isWin ? "ПОБЕДА!" : "ПОРАЖЕНИЕ"}
                </Text>
                <Text style={{ fontFamily: "Nunito-Regular", fontSize: 19 }}>
                  Правильное слово - {props.correctWord}
                </Text>
                <View>
                  <View style={{ flexDirection: "row", gap: 15 }}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          padding: 15,
                          overflow: "hidden",
                          borderRadius: 10,
                          backgroundColor: "#343548",
                          color: "white",
                        }}
                      >
                        Выйти
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.modalNext}>
                      <Text
                        style={{
                          padding: 15,
                          overflow: "hidden",
                          borderRadius: 10,
                          backgroundColor: "#343548",
                          color: "white",
                        }}
                      >
                        Далее
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
