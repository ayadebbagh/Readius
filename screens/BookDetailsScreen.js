import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { EmailContext } from "../Helpers/EmailContext.js";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function BookDetailsScreen({ navigation, route }) {
  const [username, setUsername] = useState(null);
  const [instagramUsername, setInstagramUsername] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { email } = useContext(EmailContext);
  const { publisherEmail, title, description, author } = route.params || {};
  const [bookURL, setBookURL] = useState(null);
  const styles = getDynamicStyles(screenWidth);

  const fetchData = async () => {
    console.log("Fetching data in BookDetailsScreen...");
    console.log("Publisher email (from route params):", publisherEmail);
    console.log("Logged-in user email:", email);

    const db = getFirestore();

    try {
      const bookOwnerDocRef = doc(db, "users", publisherEmail);
      console.log("Fetching book owner document for:", publisherEmail);

      const bookOwnerDocSnap = await getDoc(bookOwnerDocRef);

      if (bookOwnerDocSnap.exists()) {
        const bookOwnerData = bookOwnerDocSnap.data();
        console.log("Book owner data retrieved:", bookOwnerData);

        const isOwner = email === publisherEmail;
        console.log(
          `Is the logged-in user the owner? ${isOwner ? "Yes" : "No"}`
        );
        setIsOwner(isOwner);

        setUsername(bookOwnerData.username || "Unknown");
        setInstagramUsername(bookOwnerData.igUser || "Unknown");
        const booksCollection = collection(
          db,
          "users",
          publisherEmail,
          "books"
        );
        const q = query(
          booksCollection,
          where("title", "==", title),
          where("author", "==", author)
        );
        const booksSnapshot = await getDocs(q);

        if (!booksSnapshot.empty) {
          const bookDoc = booksSnapshot.docs[0];
          const bookData = bookDoc.data();
          setBookURL(bookData.URL); // Use the URL field
        } else {
          console.log("Book not found");
        }
      } else {
        console.log("Book owner document does not exist!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [publisherEmail, email])
  );

  useEffect(() => {
    console.log("Is owner (current state):", isOwner);
  }, [isOwner]);

  useEffect(() => {
    console.log("Book URL:", bookURL);
  }, [bookURL]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleInstagramPress = () => {
    if (instagramUsername) {
      Linking.openURL(`https://instagram.com/${instagramUsername}`);
    }
  };

  const handleEdit = () => {
    navigation.navigate("EditBook", {
      title,
      description,
      author,
      bookURL,
    });
  };

  const handleDelete = async () => {
    console.log("Delete button pressed");
    Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            console.log("Attempting to delete book");
            const db = getFirestore();
            const booksRef = collection(db, "users", publisherEmail, "books");
            const q = query(
              booksRef,
              where("title", "==", title),
              where("author", "==", author)
            );
            const querySnapshot = await getDocs(q);

            console.log("Query snapshot size:", querySnapshot.size);

            if (!querySnapshot.empty) {
              const bookDoc = querySnapshot.docs[0];
              await deleteDoc(bookDoc.ref);
              console.log("Book deleted successfully");
              Alert.alert("Success", "Book deleted successfully");
              navigation.goBack();
            } else {
              console.log("Book not found");
              Alert.alert("Error", "Book not found");
            }
          } catch (error) {
            console.error("Error deleting book:", error);
            Alert.alert("Error", "Failed to delete the book");
          }
        },
      },
    ]);
  };

  console.log("Rendering BookDetailsScreen");
  console.log("Is owner:", isOwner);

  return (
    <View style={styles.container}>
      {bookURL ? (
        <Image
          source={{ uri: bookURL }}
          style={styles.bookImage}
          onError={(error) => console.log("Image loading error:", error)}
        />
      ) : (
        <Text>Loading image...</Text>
      )}
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleGoBack}
            style={styles.arrowContainer}
          >
            <Image
              style={styles.arrow}
              source={require("../assets/images/backArrow.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleInstagramPress}
            style={styles.usernameContainer}
          >
            <Text style={styles.usernameText}>{username}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.authorText}>{author}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        {isOwner && (
          <View style={styles.ownerActions}>
            <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const getDynamicStyles = (screenWidth) => {
  const isSmallScreen = screenWidth < 380;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ECEFE8",
    },
    bookImage: {
      width: screenWidth,
      height: isSmallScreen ? screenWidth * 0.75 : screenWidth,
      resizeMode: "cover",
    },
    contentContainer: {
      flex: 1,
      padding: 20,
    },
    usernameContainer: {
      alignItems: "flex-end",
      marginBottom: 10,
    },
    usernameText: {
      color: "#2D2429",
      fontSize: 20,
      fontFamily: "GartSerifBold",
    },
    textContainer: {
      flex: 1,
    },
    titleText: {
      color: "#2D2429",
      fontSize: 36,
      fontFamily: "GartSerif",
      marginBottom: 10,
    },
    authorText: {
      color: "#9388A6",
      fontSize: 30,
      fontFamily: "GartSerif",
      marginBottom: 10,
    },
    descriptionText: {
      color: "#625874",
      fontSize: 16,
      fontFamily: "GartSerif",
    },
    arrowContainer: {
      alignItems: "flex-start",
      marginBottom: 10,
    },
    arrow: {
      width: 35,
      height: 30,
    },
    ownerActions: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
    },
    actionButton: {
      backgroundColor: "#2D2429",
      padding: 15,
      borderRadius: 30,
      paddingRight: 30,
      paddingLeft: 30,
    },
    actionButtonText: {
      color: "#ECEFE8",
      fontSize: 16,
      fontFamily: "GartSerif",
    },
  });
};
