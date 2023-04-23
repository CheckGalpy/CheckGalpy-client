import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function SearchBox({ setSearchKeyword, placeholder }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    setSearchKeyword(inputText);
  };

  return (
    <View style={styles.searchContainer}>
      <Image
        source={require("../../assets/images/icon-lense.png")}
        style={styles.lenseIcon}
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={handleSubmit}
        style={styles.searchInput}
      />
    </View>
  );
}

SearchBox.propTypes = {
  setSearchKeyword: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
