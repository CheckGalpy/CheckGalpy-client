import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function SortController({ sortOrder, handleSortToggle }) {
  return (
    <TouchableOpacity
      style={styles.filterInnerContainer}
      onPress={handleSortToggle}
    >
      <Text style={styles.filterText}>{sortOrder}</Text>
      <Image
        source={require("../../assets/images/icon-filter.png")}
        style={styles.filterIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

SortController.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  handleSortToggle: PropTypes.func.isRequired,
};
