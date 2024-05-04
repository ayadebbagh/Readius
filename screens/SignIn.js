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
  Alert,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BackgroundAnimation from "../Components/ImageBackground.js";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import FbApp from "../Helpers/FirebaseConfig.js";
const db = getFirestore(FbApp);

export default function SignIn(route) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={async () => {
            const q = query(
              collection(db, "users"),
              where("email", "==", email)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              if (userData.password === password) {
                navigation.navigate("HomeScreen", { email: email });
              } else {
                Alert.alert("Your password is incorrect");
              }
            } else {
              Alert.alert("You don't have an account :(");
            }
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
