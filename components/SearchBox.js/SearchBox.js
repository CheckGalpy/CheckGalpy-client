import React from "react";
import { View, TextInput, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";
export default function SearchBox({
  searchKeyword,
  setSearchKeyword,
  handleSearch,
  placeholder,
}) {
  return (
    <View style={styles.searchContainer}>
      <Image
        source={require("../../assets/images/icon-lense.png")}
        style={styles.lenseIcon}
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
      />
    </View>
  );
}

SearchBox.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
