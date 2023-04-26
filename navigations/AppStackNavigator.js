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

import SearchFriend from "../screens/SearchFriend/SearchFriend";
import ExternalBookmark from "../screens/ExternalBookmark/ExternalBookmark";
import BookmarkDetailReadOnly from "../screens/BookmarkDetailReadOnly/BookmarkDetailReadOnly";

export default function AppStackNavigator() {
  const Stack = createStackNavigator();
  const authStatus = useSelector((state) => state.authStatus.authStatus);
  const accessedUser = useSelector((state) => state.accessedUser.accessedUser);

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
          <Stack.Screen
            name="ExternalBookmark"
            component={ExternalBookmark}
            options={{
              header: () => (
                <TitleHeader
                  screenInfo={{ title: accessedUser.name + "님의 책갈피" }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="BookmarkDetailReadOnly"
            component={BookmarkDetailReadOnly}
            options={{
              header: () => (
                <TitleHeader
                  screenInfo={{ title: accessedUser.name + "님의 책갈피" }}
                />
              ),
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
