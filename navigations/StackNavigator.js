import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Bookmark from "../screens/Bookmark/Bookmark";
import Camera from "../screens/Camera/Camera";
import Dashboard from "../screens/Dashboard/Dashboard";
import Following from "../screens/Following/Following";
import Loading from "../screens/Loading/Loading";
import Setting from "../screens/Setting/Setting";
import SignIn from "../screens/SignIn/SignIn";

export default function StackNavigator() {
  const user = useSelector((state) => state.user.userInfo);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name="Loading" component={Loading} />
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Bookmark" component={Bookmark} />
          <Tab.Screen name="Camera" component={Camera} />
          <Tab.Screen name="Following" component={Following} />
          <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
