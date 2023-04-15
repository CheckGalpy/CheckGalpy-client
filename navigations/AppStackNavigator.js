import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabNavigator from "./MainTabNavigator";
import CameraHeader from "../headers/CaneraHeader/CameraHeader";
import ScanEdit from "../screens/ScanEdit/ScanEdit";
import Setting from "../screens/Setting/Setting";
import SignIn from "../screens/SignIn/SignIn";
import Album from "../screens/Album/Album";

export default function AppStackNavigator() {
  const user = useSelector((state) => state.user.userInfo);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {user ? (
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
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
