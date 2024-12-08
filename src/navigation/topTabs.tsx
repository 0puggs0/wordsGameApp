import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StatsBoard from "../screens/statsBoard";

const Tab = createMaterialTopTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="StatsTab" component={<></>} />
    </Tab.Navigator>
  );
}
