import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animation } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "BrightCircle": require("./assets/fonts/Bright-Circle-Font-by-Keithzo-BF65df84b7c2f07.otf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>Readius.</Text>

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2429",
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    fontSize: 20,
  },
  logo: {
    flex: 1,
    fontFamily: "BrightCircle", 
    color: "#ECEFE8", 
    fontSize: 75,

  }
 
});