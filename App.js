import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import StackNavigator from "./navigations/StackNavigator";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
