import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "white",
  },
  containerLeft: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  containerCenter: {
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  containerRight: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  backButton: {
    width: 20,
    height: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  screenTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  addButton: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
  },
});

export default styles;
