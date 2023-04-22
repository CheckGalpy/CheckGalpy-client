import React, { useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { setScannedImage } from "../../redux/scannedImageSlice";
import styles from "./styles";

export default function Scan() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const cameraRef = useRef(null);
  const [isCameraOn, setItCameraOn] = useState(true);

  useFocusEffect(
    useCallback(() => {
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

          dispatch(setScannedImage(scanData.base64));
          navigate("ScanEdit");
        }
      } catch (error) {
        console.warn(error);
      }
    } else {
      console.warn("cameraRef이 활성화 되지 않았습니다");
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
                source={require("../../assets/images/thumbnail-album.png")}
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
