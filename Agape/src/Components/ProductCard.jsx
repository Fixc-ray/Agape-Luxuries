import { useNavigate } from "react-router-dom";
import { addToCart } from "../Services/cartService";
import { ShoppingBag, Star } from "lucide-react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const {
    id,
    name = "Unnamed Product",
    price = 0,
    oldPrice,
    imageUrl,
    image,
    inStock = true,
  } = product;

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : null;

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      await addToCart(product, 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="
        bg-white rounded-[28px]
        border border-[#ece7de]
        overflow-hidden
        cursor-pointer
        hover:-translate-y-1
        transition-all duration-300
        group
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative h-[200px]
          bg-[#f3efe8]
          overflow-hidden
        "
      >
        <img
          src={
            imageUrl ||
            image ||
            "/placeholder.png"
          }
          alt={name}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition duration-700
          "
        />

        {/* DISCOUNT */}
        {discount && (
          <span
            className="
              absolute top-4 left-4
              bg-[#3c4b37]
              text-white text-xs
              px-3 py-1 rounded-full
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* STOCK */}
        {!inStock && (
          <span
            className="
              absolute top-4 right-4
              bg-red-500
              text-white text-xs
              px-3 py-1 rounded-full
            "
          >
            Out
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* NAME */}
        <h3
          className="
            mt-2 text-lg font-semibold
            text-[#1a1a1a]
            line-clamp-1
          "
        >
          {name}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            text-sm text-[#777]
            mt-2 line-clamp-2
          "
        >
          Crafted for elegance, confidence and
          timeless luxury.
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-3 mt-5">
          <span className="text-xl font-semibold text-[#1a1a1a]">
            KSh {price.toLocaleString()}
          </span>

          {oldPrice && (
            <span className="text-sm text-[#999] line-through">
              KSh {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="
            mt-5 w-full
            bg-[#3c4b37]
            text-white
            py-3 rounded-full
            text-sm font-medium
            flex items-center justify-center gap-2
            hover:opacity-90 transition
            disabled:opacity-50
          "
        >
          <ShoppingBag size={16} />
          Add To Cart
        </button>
      </div>
    </div>
  );
}