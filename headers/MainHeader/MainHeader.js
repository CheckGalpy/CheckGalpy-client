import { Image, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function MainHeader({ screenTitle }) {
  const navigation = useNavigation();

  const backButtonImg = require("../../assets/images/button-back.png");
  const settingButtonImg = require("../../assets/images/button-setting.png");

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
        <Text style={styles.screenTitle}>{screenTitle}</Text>
      </View>
      <View style={styles.containerRight}>
        <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
          <Image
            source={settingButtonImg}
            style={styles.settingButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

MainHeader.propTypes = {
  screenTitle: PropTypes.string.isRequired,
};
