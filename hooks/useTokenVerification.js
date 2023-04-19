import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { REACT_APP_API_URI as API_URI } from "@env";

import { setAuthStatus } from "../redux/authSlice";
import { setUserId } from "../redux/userSlice";

export default function useTokenVerification() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) verifyToken(token);
    };

    getTokenFromStorage();
  }, []);

  const verifyToken = async (token) => {
    const accessToken = JSON.parse(token)?.accessToken;
    const refreshToken = JSON.parse(token)?.refreshToken;

    try {
      const response = await fetch(`${API_URI}/api/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
          Refresh: refreshToken,
        },
      });

      const data = await response.json();
      if (data.authStatus === "expired") return;
      if (data.authStatus === "refreshed") {
        await SecureStore.setItemAsync("token", JSON.stringify(data.token));
      }

      dispatch(setUserId(data.userId));
      dispatch(setAuthStatus("authorized"));
    } catch (error) {
      console.warn(error);
    }
  };

  return null;
}
