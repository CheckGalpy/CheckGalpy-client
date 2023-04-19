import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import store from "./redux/store";

import AppStackNavigator from "./navigations/AppStackNavigator";
import Loading from "./screens/Loading/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Provider store={store}>
          <NavigationContainer>
            <AppStackNavigator />
          </NavigationContainer>
        </Provider>
      )}
    </>
  );
}
