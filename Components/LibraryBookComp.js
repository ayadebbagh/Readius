import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  PixelRatio,
} from "react-native";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  userDoc,
  setDoc,
  addDoc,
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
const db = getFirestore(FbApp);
import { EmailContext } from "../Helpers/EmailContext.js";

function LibraryBookComp(props) {
  const { book, navigation } = props;
  const { email } = useContext(EmailContext);
  console.log("image url from librarybookcomp: " + book.URL);
  console.log("title from librarybookcomp: " + book.title);
  console.log("email from librarybookcomp: " + email);

  const handlePress = () => {
    console.log("Publisher email: in book comp " + book.publisherEmail); // Log the publisher's email
    console.log("Logged-in email: in book comp " + email); // Log the logged-in email
    navigation.navigate("BookDetailsScreen", {
      title: book.title,
      author: book.author,
      description: book.description,
      publisherEmail: book.publisherEmail, // Pass the publisher's email // Pass the logged-in email separately
      bookURL: book.URL,
    });
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity style={styles.rectangle} onPress={handlePress}>
        <Image
          source={{ uri: book.URL }}
          style={{ width: 143, height: 143, borderRadius: 30 }}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
    </View>
  );
}
export default React.memo(LibraryBookComp);
const styles = StyleSheet.create({
  rectangle: {
    width: 150,
    height: 150,
    backgroundColor: "#ECEFE8",
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#2D2429",
    fontFamily: "GartSerif",
    fontSize: 17,
    marginTop: 2,
    width: 140,
    textAlign: "center",
  },
  author: {
    color: "#9388A6",
    fontFamily: "GartSerif",
    fontSize: 15,
  },
});
