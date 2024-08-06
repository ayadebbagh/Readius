import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
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
      };

      fetchAllBooks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text>Explore</Text>
      <FlatList
        data={books}
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
});
