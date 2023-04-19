import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

export default function LogoHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/button-back.png")}
            style={styles.backButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerCenter}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Image
            source={require("../../../assets/images/logo-green.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerRight} />
    </View>
  );
}
