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
        <View style={styles.modalContentContainer}>
          <View style={styles.modalContent}>
            {props.isError ? (
              <View style={styles.errorBlock}>
                <View style={styles.errorBlockHeading}>
                  <Text style={styles.errorBlockStyle}>Ошибка!</Text>
                </View>
                <View style={styles.textError}>
                  <Text style={styles.errorText}>
                    {props.errorType === "wordLength" &&
                      "Введите слово из 5 букв"}
                    {props.errorType === "correctWord" &&
                      "Данного слова не существует"}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.modalCheckBlock}>
                <View style={styles.modalCheckHeadingBlock}>
                  <Text style={styles.modalCheckHeadingText}>
                    {props.isWin ? "ПОБЕДА!" : "ПОРАЖЕНИЕ"}
                  </Text>
                </View>
                <View style={styles.modalCheckContent}>
                  <View style={styles.modalCheckCorrectWordBlock}>
                    <Text style={styles.modalCheckCorrectWordTitle}>
                      Правильное слово -
                    </Text>
                    <Text style={styles.modalCheckCorrectWordWord}>
                      {" " + props.correctWord.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.modalCheckButtonsBlock}>
                    <TouchableOpacity>
                      <Text style={styles.modalCheckButton}>Выйти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.modalNext}>
                      <Text style={styles.modalCheckButton}>Далее</Text>
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
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#343548",
    width: "100%",
  },
  errorBlock: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  errorBlockHeading: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  errorBlockStyle: {
    fontFamily: "Nunito-Bold",
    fontSize: 29,
    width: "100%",
    color: "white",
    textAlign: "center",
  },
  textError: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  errorText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  modalCheckBlock: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
  },
  modalCheckHeadingBlock: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",

    borderBottomColor: "white",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  modalCheckHeadingText: {
    fontFamily: "Nunito-Bold",
    fontSize: 28,
    color: "white",
    textAlign: "center",
    width: "100%",
  },
  modalCheckContent: {
    gap: 20,
    justifyContent: "center",
    paddingVertical: 20,
  },
  modalCheckCorrectWordBlock: { flexDirection: "row" },
  modalCheckCorrectWordTitle: {
    fontFamily: "Nunito-Regular",
    fontSize: 19,
    color: "white",
  },
  modalCheckCorrectWordWord: {
    fontFamily: "Nunito-Bold",
    fontSize: 19,
    color: "white",
  },
  modalCheckButtonsBlock: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCheckButton: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#343548",
    color: "white",
  },
});
