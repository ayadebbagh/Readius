import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Text,
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
import { EmailContext } from "../Helpers/EmailContext.js";

const db = getFirestore(FbApp);
const screenWidth = Dimensions.get("window").width;
const bookWidth = 150;
const spaceBetweenBooks = 10;
const padding = 20;

const calculateNumColumns = (screenWidth, bookWidth, margin, padding) => {
  return Math.floor((screenWidth - padding * 2) / (bookWidth + margin));
};

export default function Explore({ navigation, route }) {
  const [books, setBooks] = useState([]);
  const { email } = useContext(EmailContext);

  console.log("Explore screen email: " + email);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [numColumns, setNumColumns] = useState(
    calculateNumColumns(screenWidth, bookWidth, spaceBetweenBooks, padding)
  );
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllBooks = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);

    let allBooks = [];

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const userEmail = userData.email;
      const username = userData.username;
      const booksCollection = collection(db, "users", userDoc.id, "books");
      const q = query(booksCollection, orderBy("addedAt", "desc"));
      const booksSnapshot = await getDocs(q);

      const userBooks = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        userEmail: userEmail,
        username: username,
        ...doc.data(),
      }));

      allBooks = [...allBooks, ...userBooks];
    }

    allBooks.sort((a, b) => b.addedAt.toDate() - a.addedAt.toDate());

    setBooks(allBooks);
    setFilteredBooks(allBooks);
  };

  useFocusEffect(
    useCallback(() => {
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
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  useEffect(() => {
    const handleResize = () => {
      const newNumColumns = calculateNumColumns(
        Dimensions.get("window").width,
        bookWidth,
        spaceBetweenBooks,
        padding
      );
      setNumColumns(newNumColumns);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllBooks();
    setRefreshing(false);
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No books found.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title, author, or user"
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
        key={numColumns}
        contentContainerStyle={{ paddingHorizontal: spaceBetweenBooks / 2 }}
        style={styles.flatlist}
        ListEmptyComponent={renderEmptyComponent}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate("ProfileSetUp")}
      >
        <Image
          source={require("../assets/images/profileicon.png")}
          style={{ width: 55, height: 55 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bookIcon}
        onPress={() => navigation.navigate("AddBookScreen")}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#9388A6",
    fontSize: 16,
    fontFamily: "GartSerif",
  },
});
