import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { REACT_APP_API_URI as API_URI } from "@env";

import { setAuthStatus } from "../../redux/authStatusSlice";

import styles from "./styles";

export default function Setting() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.currentUserId.currentUserId,
  );

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getcurrentUser = async () => {
      const response = await fetch(`${API_URI}/api/users/${currentUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const currentUser = await response.json();
      setCurrentUser(currentUser);
    };

    getcurrentUser();
  }, [currentUserId]);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(setAuthStatus("pending"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: currentUser?.avatarURL }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            {currentUser?.familyName + currentUser?.givenName}
          </Text>
          <Text style={styles.email}>{currentUser?.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}
