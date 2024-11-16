import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface Props {
  correctWord: string;
  modalVisible: boolean;
  isWin: boolean;
  modalNext: () => void;
  isError: boolean;
  errorType: string;
  navigate: () => void;
  sendedUser: string | undefined;
}
export default function ModalWindow(props: Props) {
  return (
    <Modal visible={props.modalVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContentContainer,
            {
              borderColor: props.isWin
                ? "#02C39A"
                : !props.isError
                ? "#FDD85D"
                : "white",
            },
          ]}
        >
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
                <View
                  style={[
                    styles.modalCheckHeadingBlock,
                    { borderBottomColor: props.isWin ? "#02C39A" : "#FDD85D" },
                  ]}
                >
                  <Text style={styles.modalCheckHeadingText}>
                    {props.isWin ? "ПОБЕДА!" : "ПОРАЖЕНИЕ"}
                  </Text>
                </View>
                <View style={styles.modalCheckContent}>
                  <View style={styles.modalCheckCorrectWordBlock}>
                    <Text style={styles.modalCheckCorrectWordTitle}>
                      Загаданное слово:
                    </Text>
                    <Text
                      style={[
                        styles.modalCheckCorrectWordWord,
                        { color: props.isWin ? "#02C39A" : "#FDD85D" },
                      ]}
                    >
                      {props.correctWord.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.modalCheckButtonsBlock}>
                    {props.sendedUser === undefined && (
                      <TouchableOpacity
                        onPress={props.modalNext}
                        style={{ width: "100%" }}
                      >
                        <Text
                          style={[
                            styles.modalCheckNextButton,
                            {
                              backgroundColor: props.isWin
                                ? "#02C39A"
                                : "#FDD85D",
                            },
                          ]}
                        >
                          Играть еще
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={props.navigate}
                      style={{ width: "100%" }}
                    >
                      <Text style={styles.modalCheckQuitButton}>Выйти</Text>
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
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,

    borderWidth: 3,
    backgroundColor: "#1D1F25",
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
    borderBottomWidth: 3,
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
  modalCheckCorrectWordBlock: {},
  modalCheckCorrectWordTitle: {
    fontFamily: "Nunito-Regular",
    fontSize: 22,
    color: "white",
  },
  modalCheckCorrectWordWord: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 25,
    textAlign: "center",
  },
  modalCheckButtonsBlock: {
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCheckNextButton: {
    paddingVertical: 13,
    overflow: "hidden",
    borderRadius: 10,

    color: "#1D1F25",
    textAlign: "center",
    fontFamily: "Nunito-ExtraBold",
    fontSize: 19,
  },
  modalCheckQuitButton: {
    paddingVertical: 13,
    overflow: "hidden",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: "#1D1F25",
    fontSize: 19,
    fontFamily: "Nunito-Bold",
  },
});
