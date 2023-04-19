import { REACT_APP_API_URI as API_URI } from "@env";
import * as SecureStore from "expo-secure-store";

export default async function requestTokenAndStore(
  dispatch,
  setAuthStatus,
  userInfo,
) {
  try {
    const response = await fetch(`${API_URI}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    await SecureStore.setItemAsync("token", JSON.stringify(data));

    dispatch(setAuthStatus("authorized"));
  } catch (error) {
    console.warn(error);
  }
}
