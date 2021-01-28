import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "50rem",
    width: "100%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "20rem",
  },
  contentContainer: {
    width: "100%",
    flexDirection: "row",
  },
  titlesContainer: {
    alignItems: "center",
    paddingLeft: "15rem",
    paddingRight: "15rem",
  },
  contentsContainer: {
    paddingLeft: "15rem",
  },
  lineContainer: {
    height: "80rem",
    justifyContent: "center",
  },
  textContainer: {
    marginRight: "10rem",
  },
  elementTitle: {
    fontWeight: "bold",
    fontSize: "15rem",
  },
  elementContainer: {
    backgroundColor: "#C2C2C2",
    alignItems: "center",
    justifyContent: "center",
    padding: "13rem",
    borderRadius: "1000rem",
  },
});
