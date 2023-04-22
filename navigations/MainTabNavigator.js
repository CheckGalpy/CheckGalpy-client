import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import TitleHeader from "../components/TitleHeader/TitleHeader";
import Dashboard from "../screens/Dashboard/Dashboard";
import Bookmark from "../screens/Bookmark/Bookmark";
import Following from "../screens/Following/Following";
import Setting from "../screens/Setting/Setting";

export default function MainTabNavigator() {
  const MainTab = createBottomTabNavigator();

  const bookmarkScreen = {
    title: "책갈피",
    next: "Scan",
    imageSource: require("../assets/images/button-add-bookmark.png"),
  };
  const followingScreen = {
    title: "팔로잉",
    next: "SearchFriend",
    imageSource: require("../assets/images/button-add-following.png"),
  };
  const settingScreen = { title: "설정" };

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#33363F",
        },
      }}
    >
      <MainTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/tab-dashboard-active.png")
                  : require("../assets/images/tab-dashboard-inactive.png")
              }
              resizeMode="contain"
              style={{
                height: 40,
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          header: () => <TitleHeader screenInfo={bookmarkScreen} />,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/tab-bookmark-active.png")
                  : require("../assets/images/tab-bookmark-inactive.png")
              }
              resizeMode="contain"
              style={{
                height: 40,
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Following"
        component={Following}
        options={{
          header: () => <TitleHeader screenInfo={followingScreen} />,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/tab-following-active.png")
                  : require("../assets/images/tab-following-inactive.png")
              }
              resizeMode="contain"
              style={{
                height: 40,
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Setting"
        component={Setting}
        options={{
          header: () => <TitleHeader screenInfo={settingScreen} />,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/tab-setting-active.png")
                  : require("../assets/images/tab-setting-inactive.png")
              }
              resizeMode="contain"
              style={{
                height: 40,
              }}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}
