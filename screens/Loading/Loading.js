import LottieView from "lottie-react-native";
import { View } from "react-native";

import styles from "./styles";

export default function Loading() {
  return (
    <View style={styles.lottieContainer}>
      <LottieView
        source={require("../../assets/animations/bookAnimation.json")}
        autoPlay
        loop
        speed={1.5}
      />
    </View>
  );
}
