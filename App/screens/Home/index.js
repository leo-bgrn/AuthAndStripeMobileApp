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
          <Text style={styles.titleText}>My Profile</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titlesContainer}>
            <View style={styles.lineContainer}>
              <Text style={styles.titleText}>Email</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.titleText}>First Name</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.titleText}>Last Name</Text>
            </View>
          </View>
          <View style={styles.contentsContainer}>
            <View style={styles.lineContainer}>
              <View style={styles.elementContainer}>
                <Text>{email}</Text>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <View style={styles.elementContainer}>
                <Text>{firstName}</Text>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <View style={styles.elementContainer}>
                <Text>{lastName}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 40 }}>
          <Button testID="logoutButton" onPress={logout} title="Logout" />
        </View>
      </>
    </SafeAreaView>
  );
};

export default connect()(Home);
