import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  PixelRatio,
  FlatList,
} from "react-native";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import FbApp from "../Helpers/FirebaseConfig.js";
import { Logs } from "expo";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import LibraryBookComp from "../Components/LibraryBookComp.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function BookDetailsScreen({ navigation, route }) {
  const [username, setUsername] = useState(null);
  const email = route.params?.email;
  const title = route.params?.title;
  const description = route.params?.description;
  const author = route.params?.author;
  const bookURL = route.params?.bookURL;
  console.log("email BookDetailsScreen:" + email);
  console.log(route.params);

  useEffect(() => {
    const fetchUsername = async () => {
      const db = getFirestore();
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsername(docSnap.data().username);
      } else {
        console.log("No such document!");
      }
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: bookURL }} style={styles.bookImage} />
      </View>
      <View style={{ top: -150 }}>
        <TouchableOpacity
          style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
        >
          <Text style={styles.usernameText}>@{username}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.authorText}>{author}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProfileSetUp", {
            email: email,
          })
        }
      >
        <Image
          style={styles.arrow}
          source={require("../assets/images/backArrow.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECEFE8",
  },
  bookImage: {
    width: screenWidth,
    height: screenWidth,
    top: -250,
  },
  usernameText: {
    color: "#2D2429",
    fontSize: 20,
    marginTop: 10,
    fontFamily: "GartSerifBold",
    right: -150,
    top: -90,
    position: "absolute",
  },
  titleText: {
    marginTop: 10,
    color: "#2D2429",
    fontSize: 36,
    fontFamily: "GartSerif",
    left: -170,
    top: -60,
    position: "absolute",
  },
  authorText: {
    marginTop: 10,
    color: "#9388A6",
    fontSize: 30,
    fontFamily: "GartSerif",
    left: -170,
    top: -20,
    position: "absolute",
  },
  descriptionText: {
    marginTop: 10,
    color: "#625874",
    fontSize: 16,
    fontFamily: "GartSerif",
    left: -170,
    top: 20,
    position: "absolute",
  },
  arrow: {
    bottom: -180,
    left: -160,
    position: "absolute",
  },
});
