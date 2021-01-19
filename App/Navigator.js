import React, { useState, useEffect } from "react";

import { connect, useSelector } from "react-redux";
import Home from "./screens/Home/index";
import SignIn from "./screens/SignIn/index";
import SignUp from "./screens/SignUp/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./screens/Splash";

import { validateUserToken } from "./services/Authentication";

const Navigator = ({ dispatch }) => {
  const userToken = useSelector((state) => state.loginReducer.userToken);
  const isLoading = useSelector((state) => state.loginReducer.isLoading);
  const isSignOut = useSelector((state) => state.loginReducer.isSignOut);
  const Stack = createStackNavigator();

  async function checkUserToken() {
    try {
      await validateUserToken(userToken);
      setTimeout(
        () => dispatch({ type: "RESTORE_TOKEN", token: userToken }),
        1000
      );
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: "SIGN_OUT" });
        alert("An error occurred while login. Please try again or contact us.");
      }, 1000);
      console.warn(error);
    }
  }

  useEffect(() => {
    if (userToken) {
      dispatch({ type: "LOGGING_IN" });
      checkUserToken();
    }
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignOut ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: "Sign in",
                animationTypeForReplace: "pop",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: "Sign Up",
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect()(Navigator);
