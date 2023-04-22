import { Image, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function TitleHeader({ screenInfo }) {
  const { navigate, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            source={require("../../assets/images/button-back.png")}
            style={styles.backButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerCenter}>
        <Text style={styles.screenTitle}>{screenInfo.title}</Text>
      </View>
      <View style={styles.containerRight}>
        <TouchableOpacity onPress={() => navigate(screenInfo.next)}>
          <Image
            source={screenInfo.imageSource}
            style={styles.addButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

TitleHeader.propTypes = {
  screenInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    next: PropTypes.string,
    imageSource: PropTypes.number,
  }),
};
