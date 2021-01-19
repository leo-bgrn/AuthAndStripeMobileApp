import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { validateUserToken, login } from "../../services/Authentication";

const SignIn = ({ dispatch, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    dispatch({ type: "LOGGING_IN" });

    try {
      // const res = await login(email, password);
      const res = await login("bongiorno.leo@gmail.com", "mypassword");
      console.log("User token created: " + res);
      await validateUserToken(res);
      setTimeout(() => dispatch({ type: "RESTORE_TOKEN", token: res }), 1000);
    } catch (error) {
      setTimeout(() => dispatch({ type: "SIGN_OUT" }), 1000);
      console.warn(error);
      alert("An error occurred while login. Please try again or contact us.");
    }
  };

  const onPressSignUp = () => {
    navigation.navigate("SignUp");
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Sign In</Text>
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
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={onPressLogin}
                  style={styles.loginButtonContainer}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={onPressSignUp}
            style={styles.signUpButtonContainer}
          >
            <Text style={styles.signUpButtonText}>
              Already have an account ? Sign Up
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default connect()(SignIn);
