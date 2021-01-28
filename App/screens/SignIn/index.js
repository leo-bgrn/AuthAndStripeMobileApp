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
import * as Authentication from "../../services/Authentication";
import * as Google from "expo-google-app-auth";
import { Icon } from "react-native-elements";
import * as Facebook from "expo-facebook";

const SignIn = ({ dispatch, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithFacebookAsync() {
    try {
      await Facebook.initializeAsync({
        appId: "876868839833495",
        appName: "AuthAndStripe",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      dispatch({ type: "LOGGING_IN" });
      if (type === "success") {
        const res = await Authentication.loginWithFacebook(token);
        await Authentication.validateUserToken(res);
        setTimeout(() => dispatch({ type: "RESTORE_TOKEN", token: res }), 1000);
        // Add back-end facebook login
        return { success: true };
      } else {
        setTimeout(() => dispatch({ type: "SIGN_OUT" }), 1000);
        return { cancelled: true };
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      setTimeout(() => dispatch({ type: "SIGN_OUT" }), 1000);
      return { cancelled: true };
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "356037238657-0ad7kuara91tcfv43iqhp72otue0nssa.apps.googleusercontent.com",
        iosClientId:
          "356037238657-6dhlgq75rvvfmt0us0ql7ue8977pkevt.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      dispatch({ type: "LOGGING_IN" });

      if (result.type === "success") {
        const res = await Authentication.loginWithGoogle(result.accessToken);
        await Authentication.validateUserToken(res);
        setTimeout(() => dispatch({ type: "RESTORE_TOKEN", token: res }), 1000);
        return { success: true };
      } else {
        setTimeout(() => dispatch({ type: "SIGN_OUT" }), 1000);
        return { cancelled: true };
      }
    } catch (e) {
      setTimeout(() => dispatch({ type: "SIGN_OUT" }), 1000);
      return { error: true };
    }
  }

  const onPressLogin = async () => {
    dispatch({ type: "LOGGING_IN" });

    try {
      const res = await Authentication.login(email, password);
      //const res = await login("bongiorno.leo@gmail.com", "mypassword");
      await Authentication.validateUserToken(res);
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
                keyboardType="email-address"
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
              <TouchableOpacity
                onPress={signInWithGoogleAsync}
                style={styles.googleButtonContainer}
              >
                <Icon type="ionicon" name="logo-google" size={20} />
                <Text style={styles.googleButtonText}>Sign In With Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={signInWithFacebookAsync}
                style={styles.googleButtonContainer}
              >
                <Icon type="ionicon" name="logo-facebook" size={20} />
                <Text style={styles.googleButtonText}>
                  Sign In With Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={onPressSignUp}
            style={styles.signUpButtonContainer}
          >
            <Text style={styles.signUpButtonText}>
              Does not have an account ? Sign Up
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default connect()(SignIn);
