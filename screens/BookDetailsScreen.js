import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  PixelRatio,
  FlatList,
  Linking,
} from "react-native";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function BookDetailsScreen({ navigation, route }) {
  const [username, setUsername] = useState(null);
  const [instagramUsername, setInstagramUsername] = useState(null);
  const email = route.params?.email;
  const title = route.params?.title;
  const description = route.params?.description;
  const author = route.params?.author;
  const bookURL = route.params?.bookURL;
  console.log("email BookDetailsScreen:" + email);
  console.log(route.params);
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const db = getFirestore();
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUsername(userData.username);
        setInstagramUsername(userData.igUser);
      } else {
        console.log("No such document!");
      }
    };

    fetchUsername();
  }, []);

  const handleInstagramPress = () => {
    if (instagramUsername) {
      Linking.openURL(`https://instagram.com/${instagramUsername}`);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: bookURL }} style={styles.bookImage} />
      </View>
      <View style={{ top: -150 }}>
        <TouchableOpacity
          onPress={handleInstagramPress}
          style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
        >
          <Text style={styles.usernameText}>{username}</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.authorText}>{author}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleGoBack} style={styles.arrowContainer}>
        <Image
          style={styles.arrow}
          source={require("../assets/images/backArrow.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECEFE8",
  },
  bookImage: {
    width: screenWidth,
    height: screenWidth,
    top: -250,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  usernameText: {
    color: "#2D2429",
    fontSize: 20,
    marginTop: 10,
    fontFamily: "GartSerifBold",
    right: -10,
    top: -90,
    position: "absolute",
  },
  titleText: {
    position: "absolute",
    marginTop: 10,
    color: "#2D2429",
    fontSize: 36,
    fontFamily: "GartSerif",
    width: "90%",
    left: -5,
    top: -80,
  },
  authorText: {
    marginTop: 10,
    color: "#9388A6",
    fontSize: 30,
    fontFamily: "GartSerif",
    position: "absolute",
    left: -5,
    top: -40,
  },
  descriptionText: {
    marginTop: 10,
    color: "#625874",
    fontSize: 16,
    fontFamily: "GartSerif",
    left: -5,
    top: -10,
    width: "90%",
  },
  arrowContainer: {
    position: "absolute",
    left: 30,
    bottom: 30,
  },
  arrow: {
    width: 30,
    height: 30,
  },
});
