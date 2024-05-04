import React, { useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import { getFirestore } from "firebase/firestore";
import FbApp from "../Helpers/FirebaseConfig.js";
import { Logs } from "expo";

// Use FbApp to get Firestore
const db = getFirestore(FbApp);

export default function HomeScreen({ navigation, route }) {
  const animation = useRef(null);
  const email = route.params?.email;
  console.log("email: ", email);
  return (
    <View style={styles.homescreen}>
      <Text style={styles.welcomeText}>Welcome to Readius</Text>
      <LottieView
        autoPlay
        ref={animation}
        loop={false}
        style={{
          width: 250,
          height: 250,
        }}
        source={require("../assets/animations/books.json")}
      />
      <Text style={styles.setProfile}>Let's set up your profile</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProfileSetUp", { email: email })}
      >
        <Image
          source={require("../assets/images/arrow.png")}
          style={styles.arrow}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homescreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D2429",
  },
  welcomeText: {
    fontFamily: "BrightCircle",
    color: "#ECEFE8",
    fontSize: 55,
    textAlign: "center",
  },
  setProfile: {
    fontFamily: "GartSerif",
    fontSize: 20,
    color: "#ECEFE8",
    position: "absolute",
    right: 70,
    bottom: 40,
  },
  button: {
    position: "absolute",
    width: 30,
    height: 30,
    right: 30,
    bottom: 40,
  },
});
