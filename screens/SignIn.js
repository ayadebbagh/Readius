import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import BackgroundAnimation from "../Components/ImageBackground.js";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import FbApp from "../Helpers/FirebaseConfig.js";
import { EmailContext } from "../Helpers/EmailContext.js";

const db = getFirestore(FbApp);

export default function SignIn() {
  const navigation = useNavigation();
  const { setEmail } = useContext(EmailContext);
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [appPassword, setAppPassword] = useState("");

  const handleSignIn = async () => {
    if (emailInput && password && appPassword) {
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", emailInput)
        );
        const querySnapshot = await getDocs(q);

        if (appPassword !== "ReadiusApp") {
          Alert.alert("Enter the right App Password");
          return;
        }

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (userData.password === password) {
            setEmail(emailInput);
            if (userData.hasViewedHomeScreen) {
              navigation.navigate("ProfileSetUp");
            } else {
              navigation.navigate("HomeScreen");
            }
          } else if (userData.password !== password) {
            Alert.alert("Your password is incorrect");
          }
        } else if (querySnapshot.empty) {
          Alert.alert("You don't have an account :(");
        }
      } catch (e) {
        console.error("Error signing in: ", e);
      }
    } else {
      Alert.alert("Error", "Please fill all fields.");
    }
  };

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
            onChangeText={(text) => setEmailInput(text)}
            value={emailInput}
          />
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.AppPasswordInput}
            placeholder="App Password"
            secureTextEntry={true}
            onChangeText={(text) => setAppPassword(text)}
            value={appPassword}
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignIn}>
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
    height: 200,
    width: 300,
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
  AppPasswordInput: {
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
