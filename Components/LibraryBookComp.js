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

function LibraryBookComp({ book }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity style={styles.rectangle}>
        <Image
          source={{ uri: book.imageUri }}
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
