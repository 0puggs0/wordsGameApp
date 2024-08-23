import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Keyboard } from "./src/components/keyboard";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Words></Words> */}
      <Keyboard></Keyboard>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
