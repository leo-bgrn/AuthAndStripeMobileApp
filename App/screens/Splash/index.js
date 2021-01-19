import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import LottieView from "lottie-react-native";

const Splash = () => {
  return (
    <View style={{ flex: 1 }}>
      <LottieView
        source={require("../../assets/splash-screen.json")}
        autoPlay
        loop
        style={{ flex: 1 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Splash;
