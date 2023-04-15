import {
  REACT_APP_WEB_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID,
} from "@env";
import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { setUserInfo } from "../../redux/userSlice";
import logo from "../../assets/images/logo.png";
import splash from "../../assets/images/sign-in-background.png";
import styles from "./styles";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [accessToken, setAccessToken] = useState("");
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: REACT_APP_WEB_CLIENT_ID,
    androidclientIdd: REACT_APP_ANDROID_CLIENT_ID,
    iosclientI: REACT_APP_IOS_CLIENT_ID,
    prompt: "select_account",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [request, response, accessToken]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const user = await response.json();
      dispatch(setUserInfo(user));
    } catch (error) {
      console.warn(error);
    }
  };

  const handlePress = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image source={splash} style={styles.background} />
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text>구글계정으로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
