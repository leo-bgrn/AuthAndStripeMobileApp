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

const SignUp = ({ dispatch }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPressSignUp = () => {
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default connect()(SignUp);
