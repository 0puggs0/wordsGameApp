import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard } from "../components/keyboard";

export default function Word() {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState("");
  const [checkObj, setCheckObj] = useState([]);
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
    <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {word.map((stroke, indexStroke) => {
            return (
              <View
                key={indexStroke}
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
                    <View style={{}} key={indexSymbol}>
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
        <Keyboard
          handleCheck={handleCheck}
          handleClear={handleClear}
          handleInput={(symbol) => handleInput(symbol)}
        ></Keyboard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
