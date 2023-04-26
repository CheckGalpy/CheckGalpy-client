import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

import PropTypes from "prop-types";

export default function ProgressBar({ progress, duration, style }) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration,
      useNativeDriver: false,
    }).start();
  }, [progress, duration]);

  return (
    <View
      style={[
        (style = { position: "absolute", bottom: 0, left: 0, right: 0 }),
        { backgroundColor: "gray", height: 5 },
      ]}
    >
      <Animated.View
        style={[
          { backgroundColor: "cornflowerblue" },
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
            height: "100%",
          },
        ]}
      />
    </View>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  style: PropTypes.array,
};
