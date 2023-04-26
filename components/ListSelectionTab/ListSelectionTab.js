import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function ListSelectionTab({ handleTabSwitch }) {
  const bookmarkTabStatus = useSelector(
    (state) => state.bookmarkTabStatus.bookmarkTabStatus,
  );

  return (
    <View style={styles.selectionContainer}>
      <TouchableOpacity
        style={[styles.tab, bookmarkTabStatus === "MY" && styles.activeTab]}
        onPress={() => handleTabSwitch("MY")}
      >
        <Text style={styles.tabText}>MY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          bookmarkTabStatus === "collected" && styles.activeTab,
        ]}
        onPress={() => handleTabSwitch("collected")}
      >
        <Image
          source={
            bookmarkTabStatus === "collected"
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
  handleTabSwitch: PropTypes.func.isRequired,
};
