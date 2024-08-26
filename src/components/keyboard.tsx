import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export function Keyboard() {
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState("");
  const [checkObj, setCheckObj] = useState([]);

  const getData = async () => {
    const response = await fetch("https://api.rosggram.ru/words/").then(
      (data) => data.json()
    );
    setData(response.word);
  };
  const checkString = (data: string) => {
    const newArr = [];
    const currentWord = [...word];
    const input = currentWord[currentRow].map((item) => item.symbol).join("");
    const correctCounts: any = {};

    for (let i = 0; i < input.length; i++) {
      if (input[i] === data[i]) {
        newArr.push({ index: i, color: "green" });
        if (correctCounts[input[i]]) {
          correctCounts[input[i]]++;
        } else {
          correctCounts[input[i]] = 1;
        }
      }
    }
    for (let i = 0; i < input.length; i++) {
      if (
        input[i] !== data[i] &&
        data.includes(input[i]) &&
        (!correctCounts[input[i]] ||
          correctCounts[input[i]] < data.split(input[i]).length - 1)
      ) {
        newArr.push({ index: i, color: "yellow" });
        correctCounts[input[i]] = (correctCounts[input[i]] || 0) + 1;
      }
    }
    return newArr;
  };

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
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [word, setWord] = useState([
    [
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
    ],
    [
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
    ],
    [
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
    ],
    [
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
    ],
    [
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
    ],
    [
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
      {
        symbol: "",
        backgroundColor: ["#2D3047", "#48495F"],
        textColor: "#A3A3AE",
      },
    ],
  ]);

  const colorMap = {
    green: ["#4CAF50", "#81C784"], // Цвета для зеленого
    yellow: ["#FFEB3B", "#FFF176"], // Цвета для желтого
    default: ["#2D3047", "#48495F"], // Стандартные цвета
  };

  const handleInput = (symbol: string) => {
    const currentWord = [...word];

    if (currentColumn <= 4) {
      currentWord[currentRow][currentColumn].symbol = symbol;
      setCurrentColumn((prev) => prev + 1);
      setWord(currentWord);
    }
  };
  const handleCheck = () => {
    const currentWord = [...word];
    const newCheckObj = checkString(data.toLowerCase());
    if (data === currentWord[currentRow].map((item) => item.symbol).join("")) {
      newCheckObj.forEach((item) => {
        if (item.color === "green") {
          currentWord[currentRow][item.index].textColor = "#1D6B55";
          currentWord[currentRow][item.index].backgroundColor = colorMap.green;
          setWord(currentWord);
        }
        if (item.color === "yellow") {
          currentWord[currentRow][item.index].textColor = "#837035";
          currentWord[currentRow][item.index].backgroundColor = colorMap.yellow;
          setWord(currentWord);
        }
      });
      console.log("Победа");
    } else {
      newCheckObj.forEach((item) => {
        if (item.color === "green") {
          currentWord[currentRow][item.index].textColor = "#1D6B55";
          currentWord[currentRow][item.index].backgroundColor = colorMap.green;
          setWord(currentWord);
        }
        if (item.color === "yellow") {
          currentWord[currentRow][item.index].backgroundColor = colorMap.yellow;
          currentWord[currentRow][item.index].textColor = "#837035";

          setWord(currentWord);
        }
      });
      setCurrentColumn(0);
      setCurrentRow((prev) => prev + 1);
    }
    console.log(data);
    console.log(checkObj);
  };
  const handleClear = () => {
    const currentWord = [...word];
    if (currentColumn >= 1) {
      currentWord[currentRow][currentColumn - 1].symbol = "";
      setCurrentColumn((prev) => prev - 1);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {word.map((stroke, indexStroke) => {
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
                {stroke.map((symbol, indexSymbol) => {
                  return (
                    <View style={{}}>
                      <LinearGradient
                        colors={word[indexStroke][indexSymbol].backgroundColor}
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
        <View style={styles.keyboard}>
          {russianKeyboardData.map((item, index) => {
            const isLastItem = index === russianKeyboardData.length - 1;
            return (
              <TouchableOpacity
                onPress={() =>
                  item.letter.length === 1
                    ? handleInput(item.letter)
                    : handleClear()
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
        <TouchableOpacity
          onPress={() => handleCheck()}
          style={{ width: "100%", marginTop: 5 }}
        >
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
