import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import useTokenVerification from "../hooks/useTokenVerification";
import MainTabNavigator from "./MainTabNavigator";
import LogoHeader from "../components/headers/LogoHeader/LogoHeader";
import Login from "../screens/Login/Login";
import Album from "../screens/Album/Album";
import ScanEdit from "../screens/ScanEdit/ScanEdit";
import BookmarkDetail from "../screens/BookmarkDetail/BookmarkDetail";
import Setting from "../screens/Setting/Setting";

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
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Album" component={Album} />
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
