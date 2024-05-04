import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import FbApp from "../Helpers/FirebaseConfig.js";
import { Logs } from "expo";

// Use FbApp to get Firestore
const db = getFirestore(FbApp);
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ProfileSetUp({ navigation, route }) {
  const [user, setUser] = useState(null);
  const email = route.params?.email;
  console.log("email:", email);

  useEffect(() => {
    async function fetchUserData() {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(`Fetched user data: ${doc.id} => ${doc.data()}`);
        console.log("Username:", doc.data().username); // Add this line
        setUser(doc.data());
      });
    }

    if (email) {
      fetchUserData();
    }
  }, [email]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/defaultPfp.jpeg")}
        style={styles.profilePic}
      />
      <TouchableOpacity style={styles.roundedRectangle} />
      <TouchableOpacity style={styles.plusSign}>
        <Image
          source={require("../assets/images/plusSign.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      <Text style={styles.usernameText}>@{user ? user.username : ""}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECEFE8",
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 125,
    marginTop: -350,
    marginBottom: -70,
    zIndex: 1,
  },
  roundedRectangle: {
    backgroundColor: "#C8C2D3",
    height: screenHeight * 0.35,
    width: screenWidth,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -280,
  },
  plusSign: {
    height: 30,
    width: 30,
    marginTop: 15,
    marginLeft: 70,
    zIndex: 2,
  },
  usernameText: {
    marginTop: 15,
    fontFamily: "GartSerifBold",
    fontSize: 20,
    color: "#2D2429",
  },
});
