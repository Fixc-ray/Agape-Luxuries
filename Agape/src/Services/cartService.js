import { db } from "../Components/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField
} from "firebase/firestore";

const CART_ID = "guest_cart"; // later replace with userId

export const getCart = async () => {
  const ref = doc(db, "carts", CART_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];

  const data = snap.data().items || {};

  return Object.values(data);
};

export const addToCart = async (product, qty = 1) => {
  const ref = doc(db, "carts", CART_ID);
  const snap = await getDoc(ref);

  let items = {};

  if (snap.exists()) {
    items = snap.data().items || {};
  }

  const existing = items[product.id];

  items[product.id] = {
    ...product,
    qty: existing ? existing.qty + qty : qty,
  };

  await setDoc(ref, { items }, { merge: true });
};

export const updateCartQty = async (id, qty) => {
  const ref = doc(db, "carts", CART_ID);

  await updateDoc(ref, {
    [`items.${id}.qty`]: qty,
  });
};

export const removeFromCart = async (id) => {
  const ref = doc(db, "carts", CART_ID);

  await updateDoc(ref, {
    [`items.${id}`]: deleteField(),
  });
};