import { View, Text, Image, TouchableOpacity } from "react-native";

import useGoogleAuth from "../../hooks/useGoogleAuth";
import logo from "../../assets/images/logo.png";
import splash from "../../assets/images/sign-in-background.png";
import styles from "./styles";

export default function Login() {
  const [handleGoogleLogin] = useGoogleAuth();

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image source={splash} style={styles.background} />
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Text>구글계정으로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
