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
import React, { useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    BrightCircle: require("./assets/fonts/Bright-Circle-Font-by-Keithzo-BF65df84b7c2f07.otf"),
    GartSerif: require("./assets/fonts/gartseriftrial-medium.otf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
