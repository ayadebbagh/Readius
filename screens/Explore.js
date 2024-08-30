import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import LibraryBookComp from "../Components/LibraryBookComp.js";
import FbApp from "../Helpers/FirebaseConfig.js";

const db = getFirestore(FbApp);
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const bookWidth = 150;
const spaceBetweenBooks = 10;
const numColumns = Math.floor(
  (screenWidth - spaceBetweenBooks) / (bookWidth + spaceBetweenBooks)
);

export default function Explore({ navigation, route }) {
  const [books, setBooks] = useState([]);
  const email = route.params?.email;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllBooks = async () => {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);

        let allBooks = [];

        for (const userDoc of usersSnapshot.docs) {
          const userEmail = userDoc.data().email;
          const booksCollection = collection(db, "users", userDoc.id, "books");
          const q = query(booksCollection, orderBy("addedAt", "desc"));
          const booksSnapshot = await getDocs(q);

          const userBooks = booksSnapshot.docs.map((doc) => ({
            id: doc.id,
            userEmail: userEmail,
            ...doc.data(),
          }));

          allBooks = [...allBooks, ...userBooks];
        }

        // Sort all books by addedAt
        allBooks.sort((a, b) => b.addedAt.toDate() - a.addedAt.toDate());

        setBooks(allBooks);
        setFilteredBooks(allBooks);
      };

      fetchAllBooks();
    }, [])
  );
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title or author"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <LibraryBookComp
              book={item}
              email={item.userEmail}
              navigation={navigation}
            />
          </View>
        )}
        keyExtractor={(item) => `${item.userEmail}-${item.id}`}
        horizontal={false}
        numColumns={numColumns}
        contentContainerStyle={{ paddingHorizontal: spaceBetweenBooks / 2 }}
        style={styles.flatlist}
      />
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() =>
          navigation.navigate("ProfileSetUp", {
            email: email,
          })
        }
      >
        <Image
          source={require("../assets/images/profileicon.png")}
          style={{ width: 55, height: 55 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bookIcon}
        onPress={() =>
          navigation.navigate("AddBookScreen", {
            email: email,
          })
        }
      >
        <Image
          source={require("../assets/images/bookicon.png")}
          style={{ width: 55, height: 55 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
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
  searchBar: {
    height: 40,
    borderColor: "#2D2429",
    borderWidth: 3,
    borderRadius: 50,
    paddingHorizontal: 10,
    margin: 10,
    width: "90%",
    fontFamily: "GartSerif",
  },
  profileIcon: {
    position: "absolute",
    left: 30,
    bottom: 30,
    zIndex: 2,
  },
  bookIcon: {
    position: "absolute",
    right: 30,
    bottom: 30,
    zIndex: 2,
  },
});
