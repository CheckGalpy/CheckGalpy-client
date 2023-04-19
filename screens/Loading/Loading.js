import { View } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

export default function Loading() {
  const animationSource = require("../../assets/animations/bookAnimation.json");

  return (
    <View style={styles.lottieContainer}>
      <LottieView source={animationSource} autoPlay loop speed={1.5} />
    </View>
  );
}
