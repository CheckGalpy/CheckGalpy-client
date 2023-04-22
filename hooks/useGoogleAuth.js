import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  REACT_APP_WEB_CLIENT_ID as WEB_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID as ANDROID_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID as IOS_CLIENT_ID,
} from "@env";

import { setAuthStatus } from "../redux/authStatusSlice";
import { setCurrentUserId } from "../redux/currentUserIdSlice";
import requestTokenAndStore from "../utils/requestTokenAndStore";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth() {
  const dispatch = useDispatch();

  const [googleAccessToken, setGoogleAccessToken] = useState(null);
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
            headers: { Authorization: `Bearer ${googleAccessToken}` },
          },
        );
        const user = await response.json();
        setGoogleUser(user);
      } catch (error) {
        console.warn(error);
      }
    };

    if (response?.type === "success") {
      setGoogleAccessToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [request, response, googleAccessToken]);

  useEffect(() => {
    if (googleUser?.email) {
      const userInfo = {
        email: googleUser.email,
        givenName: googleUser.given_name,
        familyName: googleUser.family_name,
        avatarURL: googleUser.picture,
      };
      requestTokenAndStore(dispatch, setAuthStatus, setCurrentUserId, userInfo);
    }
  }, [googleUser]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return [handleGoogleLogin];
}
