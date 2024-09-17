import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const screenWidth = Dimensions.get("window").width;

export default function EditBookScreen({ navigation, route }) {
  const {
    title: initialTitle,
    description: initialDescription,
    author: initialAuthor,
  } = route.params;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [author, setAuthor] = useState(initialAuthor);

  const handleUpdateBook = async () => {
    const db = getFirestore();
    const booksRef = collection(db, "users", email, "books");

    // Construct query to find the document
    const q = query(
      booksRef,
      where("title", "==", initialTitle),
      where("author", "==", initialAuthor)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Access the document reference
        const bookDocRef = querySnapshot.docs[0].ref;

        // Update the document
        await updateDoc(bookDocRef, {
          title,
          description,
          author,
        });

        Alert.alert("Success", "Book updated successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", "No book found with the given author and title.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Alert.alert("Error", "Failed to update the book. Please try again.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.editBookText}>Edit Book</Text>
      <TextInput
        style={styles.TitleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.AuthorInput}
        value={author}
        onChangeText={setAuthor}
        placeholder="Author"
      />
      <TextInput
        style={styles.DescriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateBook}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8C2D3",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  editBookText: {
    fontFamily: "GartSerifBold",
    fontSize: 55,
    color: "#2D2429",
    marginBottom: 30,
  },
  TitleInput: {
    fontFamily: "GartSerif",
    fontSize: 18,
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: screenWidth - 40,
    height: 46,
    backgroundColor: "#ECEFE8",
    marginBottom: 15,
  },
  AuthorInput: {
    fontFamily: "GartSerif",
    fontSize: 18,
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: screenWidth - 40,
    height: 46,
    backgroundColor: "#ECEFE8",
    marginBottom: 15,
  },
  DescriptionInput: {
    fontFamily: "GartSerif",
    fontSize: 18,
    borderColor: "#2D2429",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: screenWidth - 40,
    height: 140,
    backgroundColor: "#ECEFE8",
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#2D2429",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#ECEFE8",
    fontSize: 16,
    fontFamily: "GartSerif",
  },
});
