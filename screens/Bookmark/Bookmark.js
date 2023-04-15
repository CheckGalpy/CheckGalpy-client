import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";

export default function Bookmark() {
  const text = useSelector((state) => state.text.textInfo);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}
