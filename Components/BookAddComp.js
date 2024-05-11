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
  getDoc,
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
import * as Random from "expo-random";
import * as Crypto from "expo-crypto";

function BookAddComp(props) {
  const email = props.email;
  console.log("Email in BookAddComp:", email);
  const [imageUri, setImageUri] = useState(null);

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
    }
  };

  return (
    <View style={styles.rectangle}>
      <TouchableOpacity onPress={pickImageBook}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: "100%" }}
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
