import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  Platform,
  Button,
  Image,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BackgroundAnimation from "../Components/ImageBackground.js";

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#2D2429" />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#2D2429",
        }}
      >
        <BackgroundAnimation
          imageSource={require("../assets/images/backgroundSignIn.png")}
        />
      </View>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <Text style={styles.logo}>Readius.</Text>
        <View style={styles.roundedRectangle}>
          <TextInput
            style={styles.emailInput}
            keyboardType="email-address"
            placeholder="Email"
          />
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            /* handle sign up here */
          }}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.createAccount}>
            Don't have an account? Create one!
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontFamily: "BrightCircle",
    color: "#ECEFE8",
    fontSize: 75,
    marginBottom: 50,
  },
  roundedRectangle: {
    backgroundColor: "#ECEFE8",
    height: 187,
    width: 330,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emailInput: {
    marginTop: 2,
    fontFamily: "GartSerif",
    borderColor: "#C8C2D3",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 267,
    height: 46,
  },
  passwordInput: {
    marginTop: 15,
    fontFamily: "GartSerif",
    borderColor: "#C8C2D3",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 267,
    height: 46,
  },
  signUpButton: {
    elevation: 8,
    backgroundColor: "#C8C2D3",
    borderRadius: 32,
    paddingVertical: 11,
    paddingHorizontal: 70,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "GartSerif",
    fontSize: 24,
    color: "#2D2429",
  },
  createAccount: {
    fontFamily: "GartSerif",
    fontSize: 16,
    color: "#ECEFE8",
    marginTop: 15,
  },
});
