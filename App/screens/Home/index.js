import React, { useState, useEffect } from "react";

import { View, Text, Button } from "react-native";
import { styles } from "./styles";
import { connect, useSelector } from "react-redux";
import { getInfo } from "../../services/Authentication";
import { SafeAreaView } from "react-native";

const Home = ({ dispatch }) => {
  const userToken = useSelector((state) => state.loginReducer.userToken);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    async function retrieveUserInfo() {
      try {
        const res = await getInfo(userToken);
        setEmail(res.email);
        setFirstName(res.firstName);
        setLastName(res.lastName);
      } catch (error) {
        logout();
      }
    }
    retrieveUserInfo();
  }, []);

  const logout = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Profile</Text>
        </View>
        <Text>{email}</Text>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
        <View style={{ marginTop: 40, height: 40 }}>
          <Button testID="logoutButton" onPress={logout} title="Logout" />
        </View>
      </>
    </SafeAreaView>
  );
};

export default connect()(Home);
