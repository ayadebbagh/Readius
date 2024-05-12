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
import React, { useRef, useEffect, useState } from "react";
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

const Stack = createStackNavigator();

export default function App() {
  const [books, setBooks] = useState([]);
  const addBook = (book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
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
        </Stack.Navigator>
      </NavigationContainer>
    </BookContext.Provider>
  );
}
