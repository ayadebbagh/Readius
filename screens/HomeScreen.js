import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import FbApp from "../Helpers/FirebaseConfig.js";
import { Logs } from "expo";

// Use FbApp to get Firestore
const db = getFirestore(FbApp);

export default function HomeScreen({ navigation, route }) {
  const animation = useRef(null);
  const email = route.params?.email;
  const [hasViewedHomeScreen, setHasViewedHomeScreen] = useState(false);

  useEffect(() => {
    const checkHomeScreenViewed = async () => {
      const userDocRef = doc(db, "users", email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.hasViewedHomeScreen) {
          navigation.navigate("ProfileSetUp", { email: email });
        } else {
          setHasViewedHomeScreen(false);
        }
      } else {
        // If the user document does not exist, create it with hasViewedHomeScreen set to false
        await setDoc(userDocRef, { hasViewedHomeScreen: false });
        setHasViewedHomeScreen(false);
      }
    };

    checkHomeScreenViewed();
  }, [email, navigation]);

  const handleProfileSetup = async () => {
    const userDocRef = doc(db, "users", email);
    await setDoc(userDocRef, { hasViewedHomeScreen: true }, { merge: true });
    navigation.navigate("ProfileSetUp", { email: email });
  };

  if (hasViewedHomeScreen) {
    return null; // Render nothing while checking the user's status
  }

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
  arrow: {
    width: 30,
    height: 30,
  },
});
