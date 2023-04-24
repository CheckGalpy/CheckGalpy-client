import { View, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function ListSelectionTab({ activeTab, handleTabSwitch }) {
  return (
    <View style={styles.selectionContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "MY" && styles.activeTab]}
        onPress={() => handleTabSwitch("MY")}
      >
        <Text style={styles.tabText}>MY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "collected" && styles.activeTab]}
        onPress={() => handleTabSwitch("collected")}
      >
        <Image
          source={
            activeTab === "collected"
              ? require("../../assets/images/button-uncollect.png")
              : require("../../assets/images/button-collect.png")
          }
          style={styles.pinButton}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

ListSelectionTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabSwitch: PropTypes.func.isRequired,
};
