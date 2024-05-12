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
import { FbApp } from "../Helpers/FirebaseConfig.js";

import {
  getFirestore,
  setDoc,
  doc,
  docRef,
  collection,
  query,
  where,
  getDocs,
  getDoc,
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
const db = getFirestore(FbApp);

export default function AddBookScreen({ navigation, route }) {
  const email = route.params?.email;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  function handleDownloadURL(url) {
    setDownloadURL(url);
  }
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <Text style={styles.addBookText}>Add a book!</Text>

        <BookAddComp
          style={styles.book}
          email={email}
          title={title}
          onDownloadURL={handleDownloadURL}
        />

        <TouchableOpacity
          style={styles.swapButton}
          onPress={async () => {
            console.log(`email: ${email}`);
            await setDoc(
              doc(db, "users", email, "books", title + "_" + email),
              {
                title: title,
                author: author,
                description: description,
                URL: downloadURL,
              }
            );
            navigation.navigate("ProfileSetUp", { email: email });
          }}
        >
          <Text style={styles.swapText}>Get Swapping!</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.TitleInput}
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <TextInput
          style={styles.AuthorInput}
          placeholder="Author"
          onChangeText={(text) => setAuthor(text)}
          value={author}
        />
        <TextInput
          style={styles.DescriptionInput}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          value={description}
        />
      </KeyboardAwareScrollView>
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
  infoContainer: {
    left: 25,
    top: 440,
    position: "absolute",
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

    top: 180,
  },
  swapButton: {
    width: 240,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D2429",
    borderRadius: 30,
    position: "absolute",
    bottom: 60,
  },
  swapText: {
    fontFamily: "GartSerif",
    fontSize: 24,
    color: "#ECEFE8",
  },
  TitleInput: {
    marginTop: 15,
    fontFamily: "GartSerif",
    fontSize: 18,
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 350,
    height: 46,
    backgroundColor: "#ECEFE8",
  },
  AuthorInput: {
    marginTop: 15,
    fontFamily: "GartSerif",
    fontSize: 18,
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 350,
    height: 46,
    backgroundColor: "#ECEFE8",
  },
  DescriptionInput: {
    marginTop: 15,
    fontFamily: "GartSerif",
    fontSize: 18,
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 350,
    height: 140,
    backgroundColor: "#ECEFE8",
    textAlignVertical: "top",
  },
});
