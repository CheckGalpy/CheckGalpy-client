import React, { useEffect, useState } from "react";
import { View, TextInput, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function SearchBox({
  searchKeyword,
  setSearchKeyword,
  placeholder,
}) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (!searchKeyword) {
      setInputText("");
    }
  }, [searchKeyword]);

  const handleSubmit = () => {
    setSearchKeyword(inputText);
  };

  return (
    <View style={styles.searchContainer}>
      <Image
        style={styles.lenseIcon}
        source={require("../../assets/images/icon-lense.png")}
        resizeMode="contain"
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}

SearchBox.propTypes = {
  searchKeyword: PropTypes.string,
  setSearchKeyword: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
