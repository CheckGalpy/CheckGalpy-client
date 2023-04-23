import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import useTokenVerification from "../hooks/useTokenVerification";
import MainTabNavigator from "./MainTabNavigator";
import LogoHeader from "../components/LogoHeader/LogoHeader";
import TitleHeader from "../components/TitleHeader/TitleHeader";

import Login from "../screens/Login/Login";
import Album from "../screens/Album/Album";
import ScanEdit from "../screens/ScanEdit/ScanEdit";
import BookmarkDetail from "../screens/BookmarkDetail/BookmarkDetail";
import Scan from "../screens/Scan/Scan";
import SearchFriend from "../screens/SearchFriend/SearchFriend";

export default function AppStackNavigator() {
  const Stack = createStackNavigator();
  const authStatus = useSelector((state) => state.authStatus.authStatus);

  useTokenVerification();

  return (
    <Stack.Navigator>
      {authStatus === "authorized" ? (
        <>
          <Stack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Album"
            component={Album}
            options={{
              header: () => <LogoHeader />,
            }}
          />
          <Stack.Screen
            name="Scan"
            component={Scan}
            options={{
              header: () => <LogoHeader />,
            }}
          />
          <Stack.Screen
            name="ScanEdit"
            component={ScanEdit}
            options={{
              header: () => <LogoHeader />,
            }}
          />
          <Stack.Screen
            name="BookmarkDetail"
            component={BookmarkDetail}
            options={{
              header: () => <LogoHeader />,
            }}
          />
          <Stack.Screen
            name="SearchFriend"
            component={SearchFriend}
            options={{
              header: () => <TitleHeader screenInfo={{ title: "친구찾기" }} />,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
