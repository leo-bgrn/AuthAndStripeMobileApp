import React from "react";
import { connect, useSelector } from "react-redux";
import Home from "./screens/Home/index";
import SignIn from "./screens/SignIn/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Navigator = () => {
  const userToken = useSelector((state) => state.setUserToken.userToken);
  console.log(userToken);
  const isSignedIn = userToken ? true : false;
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Sign in",
              animationTypeForReplace: "pop",
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect()(Navigator);
