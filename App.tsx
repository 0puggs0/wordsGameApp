import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Keyboard } from "./src/components/keyboard";

export default function App() {
  return (
    <View style={styles.container}>
      <Keyboard></Keyboard>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
