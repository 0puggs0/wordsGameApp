import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function InitialScreen() {
  return (
    <View style={styles.container}>
      <Text>initialScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1F25",
  },
});
