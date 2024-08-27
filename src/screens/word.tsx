import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard } from "../components/keyboard";
import { KeyboardItem, WordItem } from "../interfaces/wordScreenInterface";
import { checkString } from "../utils/checkString";

export default function Word() {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState<string>("");
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [word, setWord] = useState<Array<WordItem[]>>([
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
    green: ["#02C39A", "#189D7C"], // Цвета для зеленого
    yellow: ["#D9B952", "#FDD85D"], // Цвета для желтого
    default: ["#2D3047", "#48495F"],
    greenText: "#1D6B55",
    yellowText: "#837035",
  };

  const [russianKeyboardData, setRussianKeyboardData] = useState<
    KeyboardItem[]
  >([
    {
      id: 1,
      key: 1,
      letter: "й",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 2,
      key: 1,
      letter: "ц",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 3,
      key: 1,
      letter: "у",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 4,
      key: 1,
      letter: "к",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 5,
      key: 1,
      letter: "е",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 6,
      key: 1,
      letter: "н",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 7,
      key: 1,
      letter: "г",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },

    {
      id: 8,
      key: 2,
      letter: "ш",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 9,
      key: 2,
      letter: "щ",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 10,
      key: 2,
      letter: "з",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 11,
      key: 2,
      letter: "х",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 12,
      key: 2,
      letter: "ъ",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },

    {
      id: 13,
      key: 3,
      letter: "ф",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 14,
      key: 3,
      letter: "ы",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 15,
      key: 3,
      letter: "в",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 16,
      key: 3,
      letter: "а",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 17,
      key: 3,
      letter: "п",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 18,
      key: 3,
      letter: "р",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 19,
      key: 3,
      letter: "о",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },

    {
      id: 20,
      key: 4,
      letter: "л",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 21,
      key: 4,
      letter: "д",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 22,
      key: 4,
      letter: "ж",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 23,
      key: 4,
      letter: "э",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 24,
      key: 4,
      letter: "я",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 25,
      key: 4,
      letter: "ч",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 26,
      key: 4,
      letter: "с",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },

    {
      id: 27,
      key: 5,
      letter: "м",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 28,
      key: 5,
      letter: "и",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 29,
      key: 5,
      letter: "т",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 30,
      key: 5,
      letter: "ь",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 31,
      key: 5,
      letter: "б",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 32,
      key: 5,
      letter: "ю",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
    {
      id: 33,
      key: 5,
      letter: "стереть",
      backgroundColor: "#343548",
      color: "white",
      disabled: false,
    },
  ]);

  const getData = async () => {
    const response = await fetch("https://api.rosggram.ru/words/").then(
      (data) => data.json()
    );
    setData(response.word);
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
    const newCheckObj = checkString(
      data.toLowerCase(),
      word,
      currentRow,
      russianKeyboardData,
      setRussianKeyboardData
    );
    if (data === currentWord[currentRow].map((item) => item.symbol).join("")) {
      newCheckObj.forEach((item) => {
        if (item.color === "green") {
          currentWord[currentRow][item.index].textColor = colorMap.greenText;
          currentWord[currentRow][item.index].backgroundColor = colorMap.green;

          setWord(currentWord);
        }
        if (item.color === "yellow") {
          currentWord[currentRow][item.index].textColor = colorMap.yellowText;
          currentWord[currentRow][item.index].backgroundColor = colorMap.yellow;
          setWord(currentWord);
        }
      });

      console.log("Победа");
    } else {
      newCheckObj.forEach((item) => {
        if (item.color === "green") {
          currentWord[currentRow][item.index].textColor = colorMap.greenText;
          currentWord[currentRow][item.index].backgroundColor = colorMap.green;
          setWord(currentWord);
        }
        if (item.color === "yellow") {
          currentWord[currentRow][item.index].textColor = colorMap.yellowText;
          currentWord[currentRow][item.index].backgroundColor = colorMap.yellow;

          setWord(currentWord);
        }
      });
      setCurrentColumn(0);
      setCurrentRow((prev) => prev + 1);
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
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        paddingVertical: 50,
      }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>Рандомные слова</Text>
        </View>
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 7 }}
        >
          {word.map((stroke, indexStroke) => {
            return (
              <View
                key={indexStroke}
                style={{
                  gap: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {stroke.map((symbol, indexSymbol) => {
                  return (
                    <View style={{}} key={indexSymbol}>
                      <LinearGradient
                        colors={word[indexStroke][indexSymbol].backgroundColor}
                        style={{
                          width: 70,
                          height: 64,
                          borderRadius: 20,
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
        <Keyboard
          handleCheck={handleCheck}
          handleClear={handleClear}
          handleInput={(symbol) => handleInput(symbol)}
          russianKeyboardData={russianKeyboardData}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    color: "#A3A3AE",
    fontSize: 30,
  },
});
