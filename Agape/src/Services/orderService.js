import { db } from "../Components/firebase";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";

export const placeOrder = async (orderData) => {
  
  const orderRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    createdAt: serverTimestamp(),
  });

  // 🔥 Auto register client
  const clientRef = doc(db, "users", orderData.phone);

  await setDoc(clientRef, {
    name: orderData.name,
    phone: orderData.phone,
    email: orderData.email,
    lastOrder: serverTimestamp(),
  }, { merge: true });

  return orderRef.id;
};