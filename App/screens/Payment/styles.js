import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "50rem",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "20rem",
  },
  cardInformationContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  cardNumberContainer: {
    borderRadius: "1000rem",
    alignItems: "center",
    padding: "15rem",
    backgroundColor: "#E9E9E9",
    width: "70%",
  },
  cardNumberTextInput: {},
  otherCardInfoContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10rem",
  },
  cardExpirationContainer: {
    marginRight: "10rem",
    borderRadius: "1000rem",
    alignItems: "center",
    padding: "15rem",
    backgroundColor: "#E9E9E9",
    width: "50%",
  },
  cardCVCContainer: {
    marginLeft: "10rem",
    borderRadius: "1000rem",
    alignItems: "center",
    padding: "15rem",
    backgroundColor: "#E9E9E9",
    width: "30%",
  },
  payButtonContainer: {
    margin: "5rem",
    padding: "15rem",
    paddingLeft: "25rem",
    paddingRight: "25rem",
    borderRadius: "1000rem",
    backgroundColor: "#3ADFF3",
    width: "50%",
    alignItems: "center",
  },
  backIconContainer: {
    position: "absolute",
    top: "10rem",
    left: "10rem",
    zIndex: 1,
  },
});
