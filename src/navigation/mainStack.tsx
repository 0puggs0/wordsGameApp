import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "../screens/initialScreen";
import Stats from "../screens/stats";
import Word from "../screens/word";
import { RootStackParamList } from "../types/rootStackParamList";
const Stack = createStackNavigator<RootStackParamList>();

export function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        // options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Stats"
        component={Stats}
        // options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Word"
        component={Word}
        // options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
