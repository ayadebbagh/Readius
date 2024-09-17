import React, { useRef, useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import FbApp from "../Helpers/FirebaseConfig.js";
import { EmailContext } from "../Helpers/EmailContext.js";

const db = getFirestore(FbApp);

export default function Tutorial1({ navigation, route }) {
  const animation = useRef(null);
  const { email } = useContext(EmailContext);

  useEffect(() => {
    const updateHomeScreenViewed = async () => {
      const userDocRef = doc(db, "users", email);
      await setDoc(userDocRef, { hasViewedHomeScreen: true }, { merge: true });
    };

    updateHomeScreenViewed();
  }, [email]);

  const handleProfileSetup = () => {
    navigation.navigate("Tutorial2");
  };
  const handleTutorial = () => {};

  return (
    <View style={styles.homescreen}>
      <Text style={styles.welcomeText}>Welcome to Readius</Text>
      <LottieView
        autoPlay
        ref={animation}
        loop={true}
        style={{
          width: 250,
          height: 250,
        }}
        source={require("../assets/animations/upload.json")}
      />
      <Text style={styles.tutorial} onPress={handleTutorial}>
        First, start by uploading books to your library...
      </Text>

      <Text style={styles.setProfile}>Next</Text>
      <TouchableOpacity style={styles.button} onPress={handleProfileSetup}>
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
  tutorial: {
    fontFamily: "GartSerif",
    fontSize: 20,
    color: "#ECEFE8",
    marginTop: 20,
    width: "90%",
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
    bottom: 45,
  },
  button: {
    position: "absolute",
    width: 30,
    height: 30,
    right: 30,
    bottom: 40,
  },
  arrow: {
    width: 30,
    height: 30,
  },
});
