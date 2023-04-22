import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";

export default function Dashboard() {
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  return (
    <View style={styles.container}>
      <Text>{currentUserId}</Text>
    </View>
  );
}
