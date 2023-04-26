import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  labelContainer: {
    minWidth: 50,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
  },
  barContainer: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  bar: {
    height: 16,
    borderRadius: 4,
    backgroundColor: "#4A90E2",
  },
});

export default styles;
