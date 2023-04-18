import * as SecureStore from "expo-secure-store";

export default async function requestToken(dispatch, setAuthStatus, userInfo) {
  try {
    const response = await fetch("http://192.168.0.15:8000/api/auth/signin", {
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
