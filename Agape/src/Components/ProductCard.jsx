// src/components/ProductCard.jsx

import { useNavigate } from "react-router-dom";
import { addToCart } from "../Services/cartService";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const {
    id,
    name,
    price,
    imageUrl,
    image,
    inStock = true,
  } = product;

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      await addToCart(product, 1);
      alert("Added to cart ✅");
    } catch (err) {
      alert("Login required ⚠️");
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-white rounded-2xl p-4 cursor-pointer"
    >
      <img
        src={imageUrl || image}
        alt={name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h3 className="mt-3 font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">KSh {price}</p>

      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        className="mt-3 w-full bg-black text-white py-2 rounded-lg"
      >
        <ShoppingBag size={16} /> Add To Cart
      </button>
    </div>
  );
}