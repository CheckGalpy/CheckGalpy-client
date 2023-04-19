import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogoHeader from "../components/headers/LogoHeader/LogoHeader";
import TitleHeader from "../components/headers/TitleHeader/TitleHeader";
import Dashboard from "../screens/Dashboard/Dashboard";
import Bookmark from "../screens/Bookmark/Bookmark";
import Scan from "../screens/Scan/Scan";
import Following from "../screens/Following/Following";

export default function MainTabNavigator() {
  const MainTab = createBottomTabNavigator();

  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{ header: () => <TitleHeader screenTitle="책갈피" /> }}
      />
      <MainTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Scan"
        component={Scan}
        options={{
          header: () => <LogoHeader />,
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        name="Following"
        component={Following}
        options={{ header: () => <TitleHeader screenTitle="팔로잉" /> }}
      />
    </MainTab.Navigator>
  );
}
