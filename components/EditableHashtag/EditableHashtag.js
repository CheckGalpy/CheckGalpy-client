import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function EditableHashtag({ tag, index, onTagChange }) {
  const [editing, setEditing] = useState(false);

  const handlePress = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleTextChange = (newText) => {
    onTagChange(index, newText);
  };

  return (
    <>
      {editing ? (
        <TextInput
          style={styles.editableHashtag}
          value={tag}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <TouchableOpacity style={styles.hashtag} onPress={handlePress}>
          <Text>#{tag}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

EditableHashtag.propTypes = {
  tag: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onTagChange: PropTypes.func.isRequired,
};
