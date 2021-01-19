import React from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./styles";
import { connect, useSelector } from "react-redux";

const Home = ({ dispatch }) => {
  const userToken = useSelector((state) => state.loginReducer.userToken);

  const logout = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <View>
      <Text>Hello {userToken}</Text>
      <View style={{ marginTop: 40, height: 40 }}>
        <Button testID="logoutButton" onPress={logout} title="Logout" />
      </View>
    </View>
  );
};

export default connect()(Home);
