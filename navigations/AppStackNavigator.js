import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabNavigator from "./MainTabNavigator";
import CameraHeader from "../headers/CameraHeader/CameraHeader";
import ScanEdit from "../screens/ScanEdit/ScanEdit";
import Setting from "../screens/Setting/Setting";
import Login from "../screens/Login/Login";
import Album from "../screens/Album/Album";
import useTokenVerification from "../hooks/useTokenVerification";

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
              header: () => <CameraHeader />,
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
