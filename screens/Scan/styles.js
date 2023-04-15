import { StyleSheet } from "react-native";

import { PRIMARY_GREEN } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 8.5,
  },
  controlArea: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  controlAreaLeft: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  albumThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: PRIMARY_GREEN,
    borderWidth: 3,
  },
  text: { fontSize: 10, color: PRIMARY_GREEN },
  controlAreaCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shootButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: PRIMARY_GREEN,
    borderWidth: 7,
  },
  controlAreaRight: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_GREEN,
  },
});

export default styles;
