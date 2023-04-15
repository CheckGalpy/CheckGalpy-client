import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

export default function Album() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate("Scan")}>
        <Text>앨범에서 선택</Text>
      </TouchableOpacity>
    </View>
  );
}
