import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "../screens/initialScreen";
import Stats from "../screens/stats";
import Word from "../screens/word";
import { RootStackParamList } from "../types/rootStackParamList";
import Login from "../screens/login";
import Register from "../screens/register";
const Stack = createStackNavigator<RootStackParamList>();

export function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{ gestureEnabled: false }}
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
