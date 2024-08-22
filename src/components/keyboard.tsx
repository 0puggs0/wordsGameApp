import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface Props {}

export function Keyboard() {
  const mass = [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ъ",
    "Ы",
    "Ь",
    "Э",
    "Ю",
    "Я",
  ];
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.keyboard}>
          {mass.map((item) => {
            return (
              <TouchableOpacity>
                <LinearGradient
                  style={{ borderRadius: 13 }}
                  colors={["#2D3047", "#48475F"]}
                >
                  <Text style={styles.wordText}>{item}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <TouchableOpacity>
            <LinearGradient
              style={{ borderRadius: 13 }}
              colors={["#2D3047", "#48475F"]}
            >
              <Text style={{ fontSize: 23, padding: 15, color: "white" }}>
                Cтереть
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <LinearGradient
              style={{ borderRadius: 13 }}
              colors={["#2D3047", "#48475F"]}
            >
              <Text style={{ fontSize: 23, padding: 15, color: "white" }}>
                Далее
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  wordText: {
    overflow: "hidden",
    fontSize: 23,
    textAlign: "center",
    color: "white",
    padding: 10,
    width: 47,
  },
});
