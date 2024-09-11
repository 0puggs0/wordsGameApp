import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LinearGradient
        style={{
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 40,
        }}
        colors={["#48495F", "#2D3047"]}
      >
        <LinearGradient
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
          colors={["#2D3047", "#48495F"]}
        >
          <Text style={{ color: "#A3A3AE", fontSize: 110 }}>D</Text>
        </LinearGradient>
      </LinearGradient>
      <LinearGradient
        style={{
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 40,
        }}
        colors={["#189D7C", "#02C39A"]}
      >
        <LinearGradient
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
          colors={["#02C39A", "#189D7C"]}
        >
          <Text style={{ color: "#1D6B55", fontSize: 110 }}>D</Text>
        </LinearGradient>
      </LinearGradient>
      <LinearGradient
        style={{
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 40,
        }}
        colors={["#FDD85D", "#D9B952"]}
      >
        <LinearGradient
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
          colors={["#D9B952", "#FDD85D"]}
        >
          <Text style={{ color: "#837035", fontSize: 110 }}>D</Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({});
