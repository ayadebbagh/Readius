import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Animation,
  TextInput,
  Platform,
  Button,
} from "react-native";
import React, { useRef, useEffect, useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import HomeScreen from "./screens/HomeScreen";
import ProfileSetUp from "./screens/ProfileSetUp";
import AddBookScreen from "./screens/AddBookScreen";
import BookDetailsScreen from "./screens/BookDetailsScreen";
import BookContext from "./Helpers/BookContext";
import Explore from "./screens/Explore";
import EditBook from "./screens/EditBook";
import Tutorial1 from "./screens/Tutorial1";
import Tutorial2 from "./screens/Tutorial2";
import Tutorial3 from "./screens/Tutorial3";
import { EmailContext } from "./Helpers/EmailContext";

const Stack = createStackNavigator();

export default function App() {
  const [email, setEmail] = useState(null);
  const [books, setBooks] = useState([]);
  const addBook = (book) => {
    setBooks((prevBooks) => [book, ...prevBooks]);
  };
  const [fontsLoaded] = useFonts({
    BrightCircle: require("./assets/fonts/Bright-Circle-Font-by-Keithzo-BF65df84b7c2f07.otf"),
    GartSerif: require("./assets/fonts/gartseriftrial-medium.otf"),
    GartSerifBold: require("./assets/fonts/gartseriftrial-bold.otf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      <BookContext.Provider value={{ addBook }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{ gestureEnabled: false }}
          >
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: "SignIn",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: "SignUp",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: "HomeScreen",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProfileSetUp"
              component={ProfileSetUp}
              options={{
                title: "ProfileSetUp",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddBookScreen"
              component={AddBookScreen}
              options={{
                title: "AddBookScreen",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BookDetailsScreen"
              component={BookDetailsScreen}
              options={{
                title: "BookDetailsScreen",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Explore"
              component={Explore}
              options={{
                title: "Explore",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditBook"
              component={EditBook}
              options={{
                title: "EditBook",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Tutorial1"
              component={Tutorial1}
              options={{
                title: "Tutorial1",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Tutorial2"
              component={Tutorial2}
              options={{
                title: "Tutorial2",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Tutorial3"
              component={Tutorial3}
              options={{
                title: "Tutorial3",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BookContext.Provider>
    </EmailContext.Provider>
  );
}
