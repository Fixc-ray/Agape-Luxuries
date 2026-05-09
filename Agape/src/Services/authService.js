import { auth } from "../Components/firebase"; // ✅ FIXED PATH

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// 🔐 Admin email (restrict access)
const ADMIN_EMAIL = "rayjustin481@gmail.com";

// ✅ LOGIN
export const loginAdmin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    // 🔥 restrict access
    if (res.user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      throw new Error("Not authorized as admin");
    }

    return res.user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// ✅ LOGOUT
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

// ✅ AUTH LISTENER
export const listenToAuth = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    // 🔥 ensure only admin passes through
    if (user && user.email === ADMIN_EMAIL) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

// ✅ GET CURRENT USER (optional helper)
export const getCurrentUser = () => {
  return auth.currentUser;
};