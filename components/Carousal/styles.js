import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 465,
  },
  viewPager: {
    flex: 1,
  },
  touchable: {
    flex: 1,
  },
  bookmark: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    marginTop: 10,
  },
  label: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 12,
    color: "#3B5637",
  },
  sectionTitle: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitleTextBold: {
    fontSize: 20,
    fontWeight: "600",
  },
  sectionTitleTextNormal: {
    fontSize: 20,
    fontWeight: "300",
  },
  hashtagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 15,
  },
  tag: {
    marginRight: 15,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    color: "#152B61",
    backgroundColor: "white",
  },
  content: {},
  carousalBottomContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  carousalBottomLeftContainer: {
    flex: 4,
    flexDirection: "row",
  },
  followingButtonContainer: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  followingButton: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  creatorNameTextContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  creatorNameText: {
    fontSize: 20,
    fontWeight: "600",
  },
  decorativeText: {
    fontSize: 16,
    fontWeight: "300",
  },
  carousalBottomRightContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonCollect: {
    width: 45,
    height: 45,
  },
  pagination: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginTop: 25,
    paddingVertical: 5,
  },
  dot: {
    width: 8,
    height: 8,
    marginHorizontal: 4,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeDot: {
    width: 11,
    height: 11,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});

export default styles;
