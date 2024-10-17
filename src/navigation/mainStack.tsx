import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "../screens/initialScreen";
import Stats from "../screens/stats";
import Word from "../screens/word";
import { RootStackParamList } from "../types/rootStackParamList";
import Login from "../screens/login";
import Register from "../screens/register";
import Post from "../screens/post";
import Profile from "../screens/profile";
import Friends from "../screens/friends";
import Splash from "../screens/splash";

const Stack = createStackNavigator<RootStackParamList>();

export function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ gestureEnabled: false }}
      />

      <Stack.Screen
        name="Friends"
        component={Friends}
        // options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        // options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        // options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
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
