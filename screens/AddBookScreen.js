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
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BackgroundAnimation from "../Components/ImageBackground.js";
import FbApp from "../Helpers/FirebaseConfig.js";
import {
  getFirestore,
  setDoc,
  doc,
  docRef,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Logs } from "expo";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import BookAddComp from "../Components/BookAddComp.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function AddBookScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.addBookText}>Add a book!</Text>
      <ScrollView horizontal style={styles.scrollView}>
        <BookAddComp style={styles.bookAdd} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C8C2D3",
  },
  addBookText: {
    fontFamily: "GartSerifBold",
    fontSize: 55,
    color: "#2D2429",
    left: 25,
    top: 75,
    position: "absolute",
  },
  scrollView: {
    height: 250,
    width: screenWidth,
    position: "absolute",
    left: 25,
    top: 180,
  },
  bookAdd: {},
});
