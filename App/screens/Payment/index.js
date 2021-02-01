import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { styles } from "./styles";
import { Icon } from "react-native-elements";
const stripe = require("stripe-client")(
  "pk_test_51IEeqhHxQv90d4PcszcEWZDxaG5wccliRWcZVTnKVuL2UAEFgelqVozL4ojJVX2ND0g7bKNgr1880HYPyELUg0lJ00dLO9EjnN"
);
import * as PaymentApi from "../../services/Payment";

const Payment = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const userToken = useSelector((state) => state.loginReducer.userToken);

  const customSetCardNumber = (text) => {
    setCardNumber(
      text
        .replaceAll(" ", "")
        .match(/.{1,4}/g)
        .join(" ")
    );
  };

  const onPressBack = () => {
    navigation.navigate("Home");
  };

  const customSetCardExpiration = (text) => {
    if (text.length === 1 && parseInt(text) > 1) {
      return;
    } else if (text.length === 2 && cardExpiration.length !== 3) {
      if (parseInt(text) > 12) {
        return;
      }
      setCardExpiration(text + "/");
    } else if (text.length === 3 && text.slice(2, 3) === "/") {
      setCardExpiration(text.slice(0, -1));
    } else if (text.length === 3 && text.slice(2, 3) !== "/") {
      setCardExpiration(text.slice(0, -1) + "/" + text.slice(-2, -1));
    } else {
      setCardExpiration(text);
    }
  };

  const makePayment = async () => {
    const card = await stripe.createToken({
      card: {
        number: cardNumber.replaceAll(" ", ""),
        exp_month: cardExpiration.slice(0, 2),
        exp_year: cardExpiration.slice(3, 5),
        cvc: cardCvc,
      },
    });
    if (card.id) {
      try {
        await PaymentApi.pay(userToken, card.id);
        alert("Payment accepted. Thanks !");
      } catch (e) {
        alert("An error occurred");
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={onPressBack}
          >
            <Icon
              name="chevron-back-outline"
              type="ionicon"
              size={35}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Payment</Text>
              </View>
              <View style={styles.cardInformationContainer}>
                <View style={styles.cardNumberContainer}>
                  <TextInput
                    style={styles.cardNumberTextInput}
                    keyboardType="number-pad"
                    placeholderTextColor="#A9A9A9"
                    placeholder="Card Number"
                    onChangeText={customSetCardNumber}
                    value={cardNumber}
                    maxLength={19}
                  />
                </View>
                <View style={styles.otherCardInfoContainer}>
                  <View style={styles.cardExpirationContainer}>
                    <TextInput
                      style={styles.cardExpirationTextInput}
                      keyboardType="number-pad"
                      placeholderTextColor="#A9A9A9"
                      placeholder="Expiration date"
                      onChangeText={customSetCardExpiration}
                      value={cardExpiration}
                      maxLength={5}
                    />
                  </View>
                  <View style={styles.cardCVCContainer}>
                    <TextInput
                      style={styles.cardCVCTextInput}
                      keyboardType="number-pad"
                      placeholderTextColor="#A9A9A9"
                      placeholder="CVC"
                      onChangeText={setCardCvc}
                      maxLength={3}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={makePayment}
                  style={styles.payButtonContainer}
                >
                  <Text>Payer 0.50€</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default connect()(Payment);
