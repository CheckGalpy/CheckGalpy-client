import { StyleSheet } from "react-native";

import { PRIMARY_YELLOW } from "../../constants/colors";

const styles = StyleSheet.create({
  selectionContainer: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  activeTab: {
    backgroundColor: PRIMARY_YELLOW,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  pinButton: {
    width: 25,
    height: 25,
  },
});

export default styles;
