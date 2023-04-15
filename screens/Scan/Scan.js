import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Camera } from "expo-camera";

import { setPictureInfo } from "../../redux/pictureSlice";
import styles from "./styles";

export default function Scan() {
  const albumThumbnail = require("../../assets/images/album-thumbnail.png");

  const [isCameraOn, setItCameraOn] = useState(true);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const cameraRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      setItCameraOn(true);

      return () => {
        setItCameraOn(false);
      };
    }, []),
  );

  const handleScan = async () => {
    if (isCameraOn && cameraRef.current) {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status === "granted") {
          await cameraRef.current.resumePreview();
          const scanData = await cameraRef.current.takePictureAsync({
            quality: 0.3,
            base64: true,
          });
          await cameraRef.current.pausePreview();

          dispatch(setPictureInfo(scanData.base64));
          navigate("ScanEdit");
        }
      } catch (error) {
        console.warn(error);
      }
    } else {
      console.warn("cameraRef is not active.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        {isCameraOn && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
          />
        )}
        <View style={styles.controlArea}>
          <View style={styles.controlAreaLeft}>
            <TouchableOpacity onPress={() => navigate("Album")}>
              <Image
                source={albumThumbnail}
                style={styles.albumThumbnail}
                resizeMode="contain"
              />
              <Text style={styles.text}>앨범에서 선택</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.controlAreaCenter}>
            <TouchableOpacity style={styles.shootButton} onPress={handleScan} />
          </View>
          <View style={styles.controlAreaRight} />
        </View>
      </View>
    </>
  );
}
