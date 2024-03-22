import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animation, TextInput, Platform, Button } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { TouchableOpacity} from 'react-native';
import { useFonts } from "expo-font";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore"; 


export default function App() {
  const [fontsLoaded] = useFonts({
    "BrightCircle": require("./assets/fonts/Bright-Circle-Font-by-Keithzo-BF65df84b7c2f07.otf"),
    "GartSerif": require("./assets/fonts/gartseriftrial-medium.otf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}>

      <Text style={styles.logo}>Readius.</Text>
      <View style={styles.roundedRectangle}>
        <TextInput style={styles.emailInput} keyboardType="email-address" placeholder="Email" />
        <TextInput style={styles.emailInput} secureTextEntry={true} placeholder="Password" />

      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={() => { /* handle sign up here */ }}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <Text style={styles.createAccount}>Don't have an account? Create one</Text>

      <StatusBar style="auto" />
      </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2429",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontFamily: "BrightCircle", 
    color: "#ECEFE8", 
    fontSize: 75,
    marginBottom: 50,

  },
  roundedRectangle: {
    backgroundColor: "#ECEFE8",
    height: 187,
    width: 330,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emailInput: {
    marginTop: 15,
    fontFamily: "GartSerif",
    borderColor: "#C8C2D3",
    borderWidth: 4,
    borderRadius: 29,
    padding: 10,
    width: 267,
    height: 46, 
  },
  signUpButton: {
    elevation: 8,
    backgroundColor: "#C8C2D3",
    borderRadius: 32,
    paddingVertical: 11,
    paddingHorizontal: 70,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "GartSerif",
    fontSize: 24,
    color: "2D2429",
  },
  createAccount: {
    fontFamily: "GartSerif",
    fontSize: 16,
    color: "#ECEFE8",
    marginTop: 15,

  }
 
});