import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { Icon } from "react-native-elements";
import {
  register,
  login,
  validateUserToken,
} from "../../services/Authentication";

const SignUp = ({ dispatch, navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPressSignUp = async () => {
    dispatch({ type: "LOGGING_IN" });
    try {
      await register(
        "bongiorno.leo@gmail.com",
        "Léo",
        "BONGIORNO",
        "mypassword",
        "mypassword"
      );
      const res = await login("bongiorno.leo@gmail.com", "mypassword");
      await validateUserToken(res);
      setTimeout(() => dispatch({ type: "RESTORE_TOKEN", token: res }), 1000);
    } catch (error) {
      setTimeout(() => dispatch({ type: "SIGN_OUT" }), 1000);
      console.warn(error);
      alert(
        "An error occurred while register. Please try again or contact us."
      );
    }
  };

  const onPressBack = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
          }}
        >
          <>
            <TouchableOpacity
              style={styles.backIconContainer}
              onPress={onPressBack}
            >
              <Icon
                name="chevron-back-outline"
                type="ionicon"
                size={35}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.mainContainer}>
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>Sign Up</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#A9A9A9"
                  placeholder="Email Address"
                  onChangeText={setEmail}
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#A9A9A9"
                  placeholder="First name"
                  onChangeText={setFirstName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#A9A9A9"
                  placeholder="Last name"
                  onChangeText={setLastName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#A9A9A9"
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="#A9A9A9"
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  onChangeText={setConfirmPassword}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={onPressSignUp}
                    style={styles.signUpButtonContainer}
                  >
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default connect()(SignUp);
