import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  filterText: {
    fontSize: 10,
    fontcolor: "#e1e1e1",
  },
  filterIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});

export default styles;
