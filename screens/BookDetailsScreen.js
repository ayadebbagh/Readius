import React, { useState, useEffect } from "react";
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

const screenWidth = Dimensions.get("window").width;

export default function BookDetailsScreen({ navigation, route }) {
  const [username, setUsername] = useState(null);
  const [instagramUsername, setInstagramUsername] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [publisherEmail, setPublisherEmail] = useState(null);
  const { email, title, description, author, bookURL } = route.params || {};

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      console.log("Current user email:", email);

      const db = getFirestore();

      // Fetch user data
      const userDocRef = doc(db, "users", email);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUsername(userData.username);
        setInstagramUsername(userData.igUser);
      } else {
        console.log("No user document found!");
      }

      // Fetch book data
      const booksRef = collection(db, "users", email, "books");
      const q = query(
        booksRef,
        where("title", "==", title),
        where("author", "==", author)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const bookData = querySnapshot.docs[0].data();
        console.log("Book data:", bookData);
        setPublisherEmail(bookData.publisherEmail);

        // Check if the current user is the book's owner
        const ownerStatus = email === bookData.publisherEmail;
        console.log("Is owner:", ownerStatus);
        setIsOwner(ownerStatus);
      } else {
        console.log("No matching book found");
      }
    };

    fetchData();
  }, [email, title, author]);

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
            const booksRef = collection(db, "users", email, "books");
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
      <Image source={{ uri: bookURL }} style={styles.bookImage} />
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between", // Ensure space between items
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFE8",
  },
  bookImage: {
    width: screenWidth,
    height: screenWidth,
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
    width: 30,
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
