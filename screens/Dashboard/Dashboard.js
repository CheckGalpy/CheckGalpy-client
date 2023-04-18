import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";

export default function Dashboard() {
  const userId = useSelector((state) => state.user.userId);

  return (
    <View style={styles.container}>
      <Text>{userId}</Text>
    </View>
  );
}
