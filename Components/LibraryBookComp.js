import React, { useRef, useState, useEffect } from "react";
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

function LibraryBookComp(props) {
  const { book, navigation } = props;
  const email = props.email;
  console.log("image url from librarybookcomp: " + book.URL);
  console.log("title from librarybookcomp: " + book.title);
  console.log("email from librarybookcomp: " + email);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={styles.rectangle}
        onPress={() =>
          navigation.navigate("BookDetailsScreen", {
            title: book.title,
            author: book.author,
            description: book.description,
            email: email,
            bookURL: book.URL,
          })
        }
      >
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
  },
  author: {
    color: "#9388A6",
    fontFamily: "GartSerif",
    fontSize: 15,
  },
});
