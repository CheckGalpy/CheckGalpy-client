import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const MAX_HASHTAG_DISPLAY = 5;

export default function HashtagFrequencyGraph({ data }) {
  const sortedData = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_HASHTAG_DISPLAY);
  const maxFrequency = Math.max(...sortedData.map(([key, value]) => value));

  return (
    <View>
      {sortedData.map(([hashtag, frequency], index) => {
        const barWidth = `${(frequency / maxFrequency) * 100}%`;
        return (
          <View key={index} style={styles.chartContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>#{hashtag}</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { width: barWidth }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

HashtagFrequencyGraph.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
};
