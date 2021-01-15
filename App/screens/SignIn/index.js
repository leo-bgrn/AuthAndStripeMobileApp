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

const SignIn = ({ dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const action = { type: "SET_USER_TOKEN", value: email };
    dispatch(action);
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
                  onPress={login}
                  style={styles.loginButtonContainer}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={login}
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
