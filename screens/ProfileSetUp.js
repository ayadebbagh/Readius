import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
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

// Use FbApp to get Firestore
const db = getFirestore(FbApp);
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ProfileSetUp({ navigation, route }) {
  const [rectangleImageUri, setRectangleImageUri] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const email = route.params?.email;
  console.log("email:", email);

  const resizeImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 500, height: 500 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult.uri;
  };

  const pickImagepfp = async () => {
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
        uploadImage(resizedUri, "profilePictures", setImageUri, email);
      }
    }
  };
  const pickImageRectangle = async () => {
    console.log("pickImageRectangle called");
    let resultBanner = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(resultBanner);

    if (!resultBanner.cancelled) {
      const resizedUri = await resizeImage(resultBanner.assets[0].uri);
      uploadImage(resizedUri, "banners", setRectangleImageUri, email);
    }
  };

  const uploadImage = async (uri, path, setImageUriFunc, email) => {
    const storage = getStorage();
    const uniqueID = `${email}_${path}`; // Unique ID is now email_pfp or email_banner
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
  useEffect(() => {
    async function fetchUserData() {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(`Fetched user data: ${doc.id} => ${doc.data()}`);
        console.log("Username:", doc.data().username);
        setUser(doc.data());
        setImageUri(doc.data().profilePicturesPicture);
        setRectangleImageUri(doc.data().bannersPicture);
      });
    }

    if (email) {
      fetchUserData();
    }
  }, [email]);

  return (
    <View style={styles.container}>
      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require("../assets/images/defaultPfp.jpeg")
        }
        style={styles.profilePic}
      />
      <TouchableOpacity
        style={styles.roundedRectangle}
        onPress={pickImageRectangle}
      >
        <Image
          source={{ uri: rectangleImageUri }}
          style={styles.roundedRectangleImage}
          onLoad={() => console.log("Image loaded")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.plusSign} onPress={pickImagepfp}>
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
  roundedRectangleImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});