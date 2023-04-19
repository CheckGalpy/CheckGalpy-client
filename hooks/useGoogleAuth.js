import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  REACT_APP_WEB_CLIENT_ID as WEB_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID as ANDROID_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID as IOS_CLIENT_ID,
} from "@env";

import { setAuthStatus } from "../redux/authSlice";
import requestToken from "../utils/requestTokenAndStore";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth() {
  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    androidclientIdd: ANDROID_CLIENT_ID,
    iosclientI: IOS_CLIENT_ID,
    prompt: "select_account",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const user = await response.json();
        setGoogleUser(user);
      } catch (error) {
        console.warn(error);
      }
    };

    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [request, response, accessToken]);

  useEffect(() => {
    if (googleUser?.id) {
      const userInfo = {
        _id: googleUser.id,
        email: googleUser.email,
        givenName: googleUser.given_name,
        familyName: googleUser.family_name,
        avatarURL: googleUser.picture,
      };
      requestToken(dispatch, setAuthStatus, userInfo);
    }
  }, [googleUser]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return [handleGoogleLogin];
}
