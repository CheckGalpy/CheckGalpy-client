import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

export default function CameraHeader() {
  const navigation = useNavigation();

  const backButtonImg = require("../../assets/images/button-back.png");
  const logoImg = require("../../assets/images/logo-green.png");

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={backButtonImg}
            style={styles.backButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerCenter}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerRight} />
    </View>
  );
}
