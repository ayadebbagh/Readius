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

function BookAddComp(props) {
  const email = props.email;
  const title = props.title;
  const [imageUri, setImageUri] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const resizeImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 500, height: 500 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult.uri;
  };
  const pickImageBook = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload images.`
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        const resizedUri = await resizeImage(result.assets[0].uri);
        uploadImage(resizedUri, "books", setImageUri, email);
      }
    }
  };
  const uploadImage = async (uri, path, setImageUriFunc, email) => {
    const storage = getStorage();
    const uniqueID = `${email}_${title}`;
    const storageRef = ref(storage, `${path}/${uniqueID}`);
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        setImageUriFunc(downloadURL);
        setDownloadURL(downloadURL);
        props.onDownloadURL(downloadURL);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
          const userRef = doc(db, "users", document.id);
          await updateDoc(userRef, { [`${path}Picture`]: downloadURL });
        });
      }
    );
  };

  return (
    <View style={styles.rectangle}>
      <TouchableOpacity onPress={pickImageBook}>
        {downloadURL ? (
          <Image
            source={{ uri: downloadURL }}
            style={{ width: "100%", height: "100%" }}
            onError={(error) => console.log(error)}
          />
        ) : (
          <Image source={require("../assets/images/burgundyplus.png")} />
        )}
      </TouchableOpacity>
    </View>
  );
}
export default React.memo(BookAddComp);

const styles = StyleSheet.create({
  rectangle: {
    width: 245,
    height: 245,
    backgroundColor: "#ECEFE8",
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
});
