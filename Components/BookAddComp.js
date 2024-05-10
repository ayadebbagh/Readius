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

function BookAddComp({}) {
  return (
    <View style={styles.rectangle}>
      <TouchableOpacity>
        <Image source={require("../assets/images/burgundyplus.png")} />
      </TouchableOpacity>
    </View>
  );
}
export default React.memo(BookAddComp);

const styles = StyleSheet.create({
  rectangle: {
    width: 190,
    height: 245,
    backgroundColor: "#ECEFE8",
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
});
