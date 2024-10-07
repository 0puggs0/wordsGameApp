import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { MyStack } from "./src/navigation/mainStack";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const client = new QueryClient();
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
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <QueryClientProvider client={client}>
          <View style={styles.container}>
            <NavigationContainer>
              <MyStack />
            </NavigationContainer>
            <StatusBar style="light" />
          </View>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1F25",
  },
});
