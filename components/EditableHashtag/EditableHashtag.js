import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function EditableHashtag({
  tag,
  index,
  onTagChange,
  onTagDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [initialEdit, setInitialEdit] = useState(true);

  const handlePress = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleTextChange = (newText) => {
    setInitialEdit(false);

    if (newText === "") {
      onTagDelete(index);
    } else {
      onTagChange(index, newText);
    }
  };

  return (
    <>
      {editing ? (
        <TextInput
          style={styles.editableHashtag}
          value={initialEdit ? "" : tag}
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
  onTagDelete: PropTypes.func.isRequired,
};
