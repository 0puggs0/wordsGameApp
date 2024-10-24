import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard } from "../components/keyboard";
import { KeyboardItem, WordItem } from "../interfaces/wordScreenInterface";
import { checkString } from "../utils/checkString";
import ModalWindow from "../components/modalWindow";
import { getWords } from "../constants/wordArray";
import { getKeyboard } from "../constants/keyboardArray";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { baseUrl } from "../constants/api";
import { Storage } from "../utils/storage";
import { SCREEN_WIDTH } from "../constants/sizes";
import Symbol from "../components/symbol";
import { useSharedValue, withTiming } from "react-native-reanimated";

type Props = StackScreenProps<RootStackParamList, "Word", "MyStack">;
export default function Word({ navigation, route }: Props) {
  const token = Storage.get("token");
  const message = route?.params?.message;
  const sendedUser = route?.params?.username;
  const requestId = route?.params?.requestId;

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
  const [disabledButton, setDisabledButton] = useState(false);
  useEffect(() => {
    if (message === undefined) {
      getData();
    } else {
      setData(message);
    }
  }, []);

  const colorMap = {
    green: ["#02C39A", "#189D7C"],
    borderGreen: ["#189D7C", "#02C39A"],
    yellow: ["#D9B952", "#FDD85D"],
    borderYellow: ["#FDD85D", "#D9B952"],
    default: ["#2D3047", "#48495F"],
    borderDefault: ["#48495F", "#2D3047"],
    greenText: "#1D6B55",
    yellowText: "#837035",
  };
  const getData = async () => {
    const response = await fetch(`${baseUrl}/five_letters/words`).then((data) =>
      data.json()
    );
    setData(response.word);
  };
  const postStats = async (isWin: boolean, word: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(`${baseUrl}/five_letters/finish`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        isWin: isWin,
        answer: word,
        requestId: requestId,
      }),
    });
    console.log(await response.json());
  };

  const modalNext = async () => {
    if (isWin) {
      postStats(true, data);
    } else {
      postStats(false, data);
    }
    getData();
    resetStates();
  };
  const modalExit = async () => {
    if (isWin) {
      postStats(true, data);
    } else {
      postStats(false, data);
    }
    setIsWin(false);
    setModalVisible(false);
    setWord(getWords());
    setRussianKeyboardData(getKeyboard());
    setCurrentColumn(0);
    setCurrentRow(0);
    navigation.navigate("InitialScreen");
  };
  const checkWordInData = async (input: string) => {
    const response = await fetch(
      `${baseUrl}/five_letters/checkWord/${input}`
    ).then((data) => data.json());
    return response.message;
  };
  const resetStates = () => {
    setModalVisible(false);
    setTimeout(() => {
      setIsWin(false);
      setWord(getWords());
      setRussianKeyboardData(getKeyboard());
      setCurrentColumn(0);
      setCurrentRow(0);
    }, 100);
  };
  const showErrorWordLengthModal = () => {
    setIsError(true);
    setErrorType("wordLength");
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setTimeout(() => {
        setIsError(false);
        setErrorType("");
      }, 300);
    }, 1500);
  };
  const showErrorCorrectWordModal = () => {
    setIsError(true);
    setErrorType("correctWord");
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setTimeout(() => {
        setIsError(false);
        setErrorType("");
      }, 300);
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
    console.log(data);
    setDisabledButton(true);
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
          data.toLowerCase() ===
          currentWord[currentRow]
            .map((item) => item.symbol)
            .join("")
            .toLowerCase()
        ) {
          setIsWin(true);
          newCheckObj.forEach((item) => {
            if (item.color === "green") {
              currentWord[currentRow][item.index].textColor =
                colorMap.greenText;
              currentWord[currentRow][item.index].backgroundColor =
                colorMap.green;
              currentWord[currentRow][item.index].borderBackgroundColor =
                colorMap.borderGreen;
              setWord(currentWord);
            }
            if (item.color === "yellow") {
              currentWord[currentRow][item.index].textColor =
                colorMap.yellowText;
              currentWord[currentRow][item.index].backgroundColor =
                colorMap.yellow;
              currentWord[currentRow][item.index].borderBackgroundColor =
                colorMap.borderYellow;
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
              currentWord[currentRow][item.index].borderBackgroundColor =
                colorMap.borderGreen;
              setWord(currentWord);
            }
            if (item.color === "yellow") {
              currentWord[currentRow][item.index].textColor =
                colorMap.yellowText;
              currentWord[currentRow][item.index].backgroundColor =
                colorMap.yellow;
              currentWord[currentRow][item.index].borderBackgroundColor =
                colorMap.borderYellow;
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
    setDisabledButton(false);
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
          <Text style={styles.headerText}>
            {message === undefined
              ? "Рандомные слова"
              : `Слово от ${sendedUser}`}
          </Text>
        </View>
        <View style={styles.strokeContainer}>
          {word.map((stroke, indexStroke) => {
            return (
              <View key={indexStroke} style={styles.stroke}>
                {stroke.map((symbol, indexSymbol) => {
                  return (
                    <Symbol
                      word={word}
                      indexStroke={indexStroke}
                      indexSymbol={indexSymbol}
                      symbol={symbol}
                    />
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
          disabledButton={disabledButton}
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
          navigate={modalExit}
          sendedUser={sendedUser}
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
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  strokeContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  stroke: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontFamily: "Nunito-Bold",
    color: "#A3A3AE",
    fontSize: 30,
  },
  symbolBorderContainer: {
    // width: 65,
    width: SCREEN_WIDTH / 5 - 12,
    height: SCREEN_WIDTH / 5 - 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  symbolInnerContainer: {
    width: SCREEN_WIDTH / 5 - 24,
    height: SCREEN_WIDTH / 5 - 24,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
