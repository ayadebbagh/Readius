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
import React, { useRef, useEffect, useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { FbApp } from "../Helpers/FirebaseConfig.js";
import BookContext from "../Helpers/BookContext.js";
import { emailContext } from "./ProfileSetUp.js";

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
  serverTimestamp,
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
import { EmailContext } from "../Helpers/EmailContext.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const db = getFirestore(FbApp);

export default function AddBookScreen({ navigation, route }) {
  const { addBook } = useContext(BookContext);
  const { email } = useContext(EmailContext);
  const [titleForBookAddComp, setTitleForBookAddComp] = useState("");
  const [renderBookAddComp, setRenderBookAddComp] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  function handleDownloadURL(url) {
    setDownloadURL(url);
  }
  useEffect(() => {
    console.log(`Title: ${title}`);
  }, [title]);
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
          title={titleForBookAddComp}
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
                addedAt: serverTimestamp(),
                publisherEmail: email,
              }
            );
            navigation.goBack();
            const newBook = {
              title: title,
              author: author,
              description: description,
              imageUri: downloadURL,
              email: email,
            };
            addBook(newBook);
          }}
        >
          <Text style={styles.swapText}>Get Swapping!</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.TitleInput}
          placeholder="Title"
          onChangeText={(text) => {
            setTitle(text);
            setTitleForBookAddComp(text);
          }}
          value={title}
        />

        <TextInput
          style={styles.AuthorInput}
          placeholder="Author"
          onChangeText={(text) => setAuthor(text)}
          value={author}
        />
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.DescriptionInput}
            placeholder="Description"
            onChangeText={(text) => {
              if (text.length <= 200) {
                setDescription(text);
                setCharCount(text.length);
              }
            }}
            multiline={true}
            value={description}
          />
          <Text style={styles.charCount}>{charCount}/200</Text>
        </View>
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
  descriptionContainer: {
    position: "relative",
  },

  charCount: {
    position: "absolute",
    right: 10,
    bottom: 10,
    fontSize: 12,
    color: "#888",
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
