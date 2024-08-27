import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard } from "../components/keyboard";
import { WordItem } from "../interfaces/wordScreenInterface";
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
    green: ["#4CAF50", "#81C784"], // Цвета для зеленого
    yellow: ["#FFEB3B", "#FFF176"], // Цвета для желтого
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
    const newCheckObj = checkString(data.toLowerCase(), word, currentRow);
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
