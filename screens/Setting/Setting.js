import { useDispatch } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

import { setAuthStatus } from "../../redux/authSlice";

import styles from "./styles";

export default function Setting() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(setAuthStatus("pending"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
