import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function EditableContent({ content, onContentChange }) {
  const [editingContent, setEditingContent] = useState(false);

  const handlePress = () => {
    setEditingContent(true);
  };

  const handleBlur = () => {
    setEditingContent(false);
  };

  const handleContentChange = (newText) => {
    onContentChange(newText);
  };

  return (
    <>
      {editingContent ? (
        <TextInput
          value={content}
          onChangeText={handleContentChange}
          onBlur={handleBlur}
          autoFocus
          multiline
          style={styles.content}
        />
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.content}>{content}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

EditableContent.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};
