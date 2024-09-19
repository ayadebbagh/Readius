import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import HomeScreen from "./screens/HomeScreen";
import ProfileSetUp from "./screens/ProfileSetUp";
import AddBookScreen from "./screens/AddBookScreen";
import BookDetailsScreen from "./screens/BookDetailsScreen";
import Explore from "./screens/Explore";
import EditBook from "./screens/EditBook";
import Tutorial1 from "./screens/Tutorial1";
import Tutorial2 from "./screens/Tutorial2";
import Tutorial3 from "./screens/Tutorial3";

import { EmailContext } from "./Helpers/EmailContext";
import BookContext from "./Helpers/BookContext";
import { checkExistingSession } from "./Helpers/AuthFunctions";

const Stack = createStackNavigator();

export default function App() {
  const [email, setEmail] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    BrightCircle: require("./assets/fonts/Bright-Circle-Font-by-Keithzo-BF65df84b7c2f07.otf"),
    GartSerif: require("./assets/fonts/gartseriftrial-medium.otf"),
    GartSerifBold: require("./assets/fonts/gartseriftrial-bold.otf"),
  });

  const addBook = (book) => {
    setBooks((prevBooks) => [book, ...prevBooks]);
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const userEmail = await checkExistingSession();
        setEmail(userEmail);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  if (!fontsLoaded || isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      <BookContext.Provider value={{ books, addBook }}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName={email ? "ProfileSetUp" : "SignIn"}
            screenOptions={{ gestureEnabled: false, headerShown: false }}
          >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileSetUp" component={ProfileSetUp} />
            <Stack.Screen name="AddBookScreen" component={AddBookScreen} />
            <Stack.Screen
              name="BookDetailsScreen"
              component={BookDetailsScreen}
            />
            <Stack.Screen name="Explore" component={Explore} />
            <Stack.Screen name="EditBook" component={EditBook} />
            <Stack.Screen name="Tutorial1" component={Tutorial1} />
            <Stack.Screen name="Tutorial2" component={Tutorial2} />
            <Stack.Screen name="Tutorial3" component={Tutorial3} />
          </Stack.Navigator>
        </NavigationContainer>
      </BookContext.Provider>
    </EmailContext.Provider>
  );
}
