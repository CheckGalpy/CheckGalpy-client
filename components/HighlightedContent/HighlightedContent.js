import { Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function HighlightedContent({ text, keyword }) {
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));

  return (
    <Text style={styles.content}>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <Text key={index} style={styles.highlightedText}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        ),
      )}
    </Text>
  );
}

HighlightedContent.propTypes = {
  text: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};
