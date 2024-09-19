import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FbApp from "../Helpers/FirebaseConfig.js";

const db = getFirestore(FbApp);

export async function createSession(email) {
  try {
    const sessionRef = await addDoc(collection(db, "sessions"), {
      email: email,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
    });

    await AsyncStorage.setItem("sessionId", sessionRef.id);
    await AsyncStorage.setItem("userEmail", email);

    return sessionRef.id;
  } catch (error) {
    console.error("Error creating session: ", error);
    throw error;
  }
}

export async function checkExistingSession() {
  try {
    const sessionId = await AsyncStorage.getItem("sessionId");
    const email = await AsyncStorage.getItem("userEmail");

    if (sessionId && email) {
      const sessionRef = doc(db, "sessions", sessionId);
      const sessionSnap = await getDoc(sessionRef);

      if (sessionSnap.exists() && sessionSnap.data().email === email) {
        return email;
      } else {
        await AsyncStorage.removeItem("sessionId");
        await AsyncStorage.removeItem("userEmail");
      }
    }

    return null;
  } catch (error) {
    console.error("Error checking session: ", error);
    return null;
  }
}

export async function logout() {
  try {
    const sessionId = await AsyncStorage.getItem("sessionId");

    if (sessionId) {
      const sessionRef = doc(db, "sessions", sessionId);
      await deleteDoc(sessionRef);
    }

    await AsyncStorage.removeItem("sessionId");
    await AsyncStorage.removeItem("userEmail");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
}
