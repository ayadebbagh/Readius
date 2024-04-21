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
import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BackgroundAnimation from "../Components/ImageBackground.js";
import FbApp from "../Helpers/FirebaseConfig.js";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Use FbApp to get Firestore
const db = getFirestore(FbApp);

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
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
          backgroundColor: "#C8C2D3",
        }}
      >
        <BackgroundAnimation
          imageSource={require("../assets/images/backgroundSignUp.png")}
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
            style={styles.UsernameInput}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
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
          style={styles.createAccountButton}
          onPress={async () => {
            try {
              const docRef = await setDoc(doc(db, "users", username), {
                username: username,
                email: email,
                password: password,
              });
              console.log("Document written with ID: ", username);
              navigation.goBack();
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }}
        >
          <Text style={styles.buttonText}>Create Account</Text>
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
    color: "#2D2429",
    fontSize: 75,
    marginBottom: 50,
  },
  roundedRectangle: {
    backgroundColor: "#ECEFE8",
    height: 260,
    width: 330,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emailInput: {
    marginTop: 15,
    fontFamily: "GartSerif",
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 267,
    height: 46,
  },
  passwordInput: {
    marginTop: 15,
    fontFamily: "GartSerif",
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 267,
    height: 46,
  },
  UsernameInput: {
    fontFamily: "GartSerif",
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 267,
    height: 46,
  },
  createAccountButton: {
    elevation: 8,
    backgroundColor: "#2D2429",
    borderRadius: 32,
    paddingVertical: 11,
    paddingHorizontal: 70,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "GartSerif",
    fontSize: 24,
    color: "#ECEFE8",
  },
  createAccount: {
    fontFamily: "GartSerif",
    fontSize: 16,
    color: "#ECEFE8",
    marginTop: 15,
  },
});
