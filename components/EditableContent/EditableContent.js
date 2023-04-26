import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import styles from "./styles";

export default function EditableContent({ content, onContentChange }) {
  const [editingContent, setEditingContent] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handlePress = () => {
    setEditingContent(true);
  };

  const handleBlur = () => {
    onContentChange(localContent);
    setEditingContent(false);
  };

  const handleContentChange = (newText) => {
    setLocalContent(newText);
  };

  const removeLineBreaks = () => {
    const newContent = localContent
      .split(/(\r\n|\n|\r)/gm)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join(" ");
    setLocalContent(newContent);
  };

  const onPinchEvent = ({ nativeEvent }) => {
    if (nativeEvent.scale < 0.99) {
      removeLineBreaks();
      console.warn("핀치모션 감지. 여백 삭제를 진행합니다.");
    }
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      removeLineBreaks();
    }
  };

  return (
    <>
      {editingContent ? (
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <View style={styles.container}>
            <TextInput
              value={localContent}
              onChangeText={handleContentChange}
              onBlur={handleBlur}
              autoFocus
              multiline
              style={styles.content}
            />
          </View>
        </PinchGestureHandler>
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.content}>{localContent}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

EditableContent.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};
