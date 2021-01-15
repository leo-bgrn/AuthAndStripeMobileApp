import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "70%",
    margin: "5rem",
    padding: "15rem",
    borderRadius: "1000rem",
    backgroundColor: "#E9E9E9",
  },
  loginButtonContainer: {
    margin: "5rem",
    padding: "15rem",
    paddingLeft: "25rem",
    paddingRight: "25rem",
    borderRadius: "1000rem",
    backgroundColor: "#3ADFF3",
  },
  loginButtonText: {
    fontWeight: "bold",
  },
  signInText: {
    fontWeight: "bold",
    fontSize: "25rem",
  },
  signInContainer: {
    width: "70%",
    padding: "10rem",
    paddingLeft: 0,
    marginBottom: "10rem",
  },
  buttonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10rem",
  },
  signUpButtonContainer: {
    alignItems: "center",
    marginBottom: "10rem",
  },
  signUpButtonText: {
    fontWeight: "bold",
  },
});
