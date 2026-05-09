import { collection, getDocs } from "firebase/firestore";
import { db } from "../Components/firebase";

export const fetchPerfumes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "perfumes"));

    return snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name || "",
        price: Number(data.price) || 0,
        oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
        category: data.category || "Perfumes",
        imageUrl: data.imageUrl || "/placeholder.png",
        description: data.description || "",
        inStock: data.inStock ?? true
      };
    });

  } catch (error) {
    console.error("Error fetching perfumes:", error);
    return [];
  }
};