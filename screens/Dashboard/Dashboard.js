import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";

export default function Dashboard() {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userInfo)}</Text>
    </View>
  );
}
