import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Keyboard } from "./src/components/keyboard";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Medium": require("./assets/fonts/Nunito-Medium.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("./assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-Light": require("./assets/fonts/Nunito-Light.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
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
    backgroundColor: "#1D1F25",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
