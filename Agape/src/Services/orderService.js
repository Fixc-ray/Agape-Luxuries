import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../Components/firebase";

export async function placeOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(),
      status: "pending",
    });

    return docRef.id;
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    throw error;
  }
}