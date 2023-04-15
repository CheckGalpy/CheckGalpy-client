import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CameraHeader from "../headers/CameraHeader/CameraHeader";
import MainHeader from "../headers/MainHeader/MainHeader";
import Bookmark from "../screens/Bookmark/Bookmark";
import Dashboard from "../screens/Dashboard/Dashboard";
import Following from "../screens/Following/Following";
import Scan from "../screens/Scan/Scan";

export default function MainTabNavigator() {
  const MainTab = createBottomTabNavigator();

  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{ header: () => <MainHeader screenTitle="책갈피" /> }}
      />
      <MainTab.Screen
        name="Scan"
        component={Scan}
        options={{
          header: () => <CameraHeader />,
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        name="Following"
        component={Following}
        options={{ header: () => <MainHeader screenTitle="팔로잉" /> }}
      />
    </MainTab.Navigator>
  );
}
