import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard } from "../components/keyboard";
import { KeyboardItem, WordItem } from "../interfaces/wordScreenInterface";
import { checkString } from "../utils/checkString";
import ModalWindow from "../components/modalWindow";
import { getWords } from "../constants/wordArray";
import { getKeyboard } from "../constants/keyboardArray";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Word() {
  const [isError, setIsError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<string>("");
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [word, setWord] = useState<Array<WordItem[]>>(getWords());
  const [russianKeyboardData, setRussianKeyboardData] = useState<
    KeyboardItem[]
  >(getKeyboard());

  useEffect(() => {
    getData();
  }, []);

  const colorMap = {
    green: ["#02C39A", "#189D7C"], // Цвета для зеленого
    yellow: ["#D9B952", "#FDD85D"], // Цвета для желтого
    default: ["#2D3047", "#48495F"],
    greenText: "#1D6B55",
    yellowText: "#837035",
  };

  const getData = async () => {
    const response = await fetch("https://api.rosggram.ru/words/").then(
      (data) => data.json()
    );
    setData(response.word);
  };

  const modalNext = async () => {
    const currentPlayed = await AsyncStorage.getItem("played");
    if (currentPlayed === null) {
      await AsyncStorage.setItem("played", "1");
    } else {
      const intPlayed = parseInt(currentPlayed);
      await AsyncStorage.setItem("played", (intPlayed + 1).toString());
    }
    if (isWin) {
      const currentWins = await AsyncStorage.getItem("wins");
      const currentStreak = await AsyncStorage.getItem("currentStreak");
      const bestStreak = await AsyncStorage.getItem("bestStreak");
      if (currentWins === null) {
        await AsyncStorage.setItem("wins", "1");
      } else {
        const intWins = parseInt(currentWins);
        await AsyncStorage.setItem("wins", (intWins + 1).toString());
      }
      if (currentStreak === null) {
        await AsyncStorage.setItem("currentStreak", "1");
      } else {
        const intCurrentStreak = parseInt(currentStreak);
        await AsyncStorage.setItem(
          "currentStreak",
          (intCurrentStreak + 1).toString()
        );
      }
      if (bestStreak === null) {
        await AsyncStorage.setItem("bestStreak", "1");
      } else {
        if (currentStreak !== null) {
          if (parseInt(bestStreak) + 1 <= parseInt(currentStreak) + 1) {
            await AsyncStorage.setItem(
              "bestStreak",
              (parseInt(currentStreak) + 1).toString()
            );
          }
        }
      }
    } else {
      await AsyncStorage.setItem("currentStreak", "0");
    }
    // await AsyncStorage.clear();
    resetStates();
  };

  const checkWordInData = async (input: string) => {
    const response = await fetch(
      `https://api.rosggram.ru/checkWord/${input}`
    ).then((data) => data.json());
    return response.message;
  };

  const resetStates = () => {
    setIsWin(false);
    setModalVisible(false);
    setWord(getWords());
    setRussianKeyboardData(getKeyboard());
    setCurrentColumn(0);
    setCurrentRow(0);
    getData();
  };

  const showErrorWordLengthModal = () => {
    setIsError(true);
    setErrorType("wordLength");
    setModalVisible(true);
    setTimeout(() => {
      setIsError(false);
      setErrorType("");
      setModalVisible(false);
    }, 1500);
  };

  const showErrorCorrectWordModal = () => {
    setIsError(true);
    setErrorType("correctWord");
    setModalVisible(true);
    setTimeout(() => {
      setIsError(false);
      setErrorType("");
      setModalVisible(false);
    }, 1500);
  };

  const handleInput = (symbol: string) => {
    const currentWord = [...word];

    if (currentColumn <= 4) {
      currentWord[currentRow][currentColumn].symbol = symbol;
      setCurrentColumn((prev) => prev + 1);
      setWord(currentWord);
    }
  };
  const handleCheck = async () => {
    const currentWord = [...word];
    if (currentColumn > 4) {
      if (
        await checkWordInData(
          currentWord[currentRow].map((item) => item.symbol).join("")
        )
      ) {
        const newCheckObj = checkString(
          data.toLowerCase(),
          word,
          currentRow,
          russianKeyboardData,
          setRussianKeyboardData
        );
        if (currentRow > 4) {
          setModalVisible(true);
        }
        if (
          data === currentWord[currentRow].map((item) => item.symbol).join("")
        ) {
          setIsWin(true);
          newCheckObj.forEach((item) => {
            if (item.color === "green") {
              currentWord[currentRow][item.index].textColor =
                colorMap.greenText;
              currentWord[currentRow][item.index].backgroundColor =
                colorMap.green;
              setWord(currentWord);
            }
            if (item.color === "yellow") {
              currentWord[currentRow][item.index].textColor =
                colorMap.yellowText;
              currentWord[currentRow][item.index].backgroundColor =
                colorMap.yellow;
              setWord(currentWord);
            }
          });
          setModalVisible(true);
        } else {
          newCheckObj.forEach((item) => {
            if (item.color === "green") {
              currentWord[currentRow][item.index].textColor =
                colorMap.greenText;
              currentWord[currentRow][item.index].backgroundColor =
                colorMap.green;
              setWord(currentWord);
            }
            if (item.color === "yellow") {
              currentWord[currentRow][item.index].textColor =
                colorMap.yellowText;
              currentWord[currentRow][item.index].backgroundColor =
                colorMap.yellow;
              setWord(currentWord);
            }
          });
          setCurrentColumn(0);
          setCurrentRow((prev) => prev + 1);
        }
      } else {
        showErrorCorrectWordModal();
      }
    } else {
      showErrorWordLengthModal();
    }
    console.log(data);
  };
  const handleClear = () => {
    const currentWord = [...word];
    if (currentColumn >= 1) {
      currentWord[currentRow][currentColumn - 1].symbol = "";
      setCurrentColumn((prev) => prev - 1);
    }
  };
  return (
    <View style={styles.wordScreenContainer}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>Рандомные слова</Text>
        </View>
        <View style={styles.strokeContainer}>
          {word.map((stroke, indexStroke) => {
            return (
              <View key={indexStroke} style={styles.stroke}>
                {stroke.map((symbol, indexSymbol) => {
                  return (
                    <View key={indexSymbol}>
                      <LinearGradient
                        colors={word[indexStroke][indexSymbol].backgroundColor}
                        style={styles.strokeGradient}
                      >
                        <Text
                          style={{
                            color: word[indexStroke][indexSymbol].textColor,
                            fontSize: 38,
                            fontFamily: "Nunito-Bold",
                          }}
                        >
                          {symbol.symbol.toUpperCase()}
                        </Text>
                      </LinearGradient>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
        <Keyboard
          handleCheck={handleCheck}
          handleClear={handleClear}
          handleInput={(symbol) => handleInput(symbol)}
          russianKeyboardData={russianKeyboardData}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ModalWindow
          correctWord={data}
          modalVisible={modalVisible}
          isWin={isWin}
          modalNext={modalNext}
          isError={isError}
          errorType={errorType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wordScreenContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#1D1F25",
  },
  container: {
    paddingHorizontal: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  strokeContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 5,
  },
  stroke: {
    paddingHorizontal: 5,
    gap: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  strokeGradient: {
    width: 70,
    height: 70,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    color: "#A3A3AE",
    fontSize: 30,
  },
});
