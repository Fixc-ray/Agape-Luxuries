// ProductDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Components/Firebase";
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
} from "lucide-react";
import { addToCart } from "../Services/cartService";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] =
    useState("50ML");

  // IMAGE GALLERY
  const [selectedImage, setSelectedImage] =
    useState("");

  // DELIVERY TIMER
  const [timeLeft, setTimeLeft] = useState("");

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "perfumes", id);

        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = {
            id: snap.id,
            ...snap.data(),
          };

          setProduct(data);

          setSelectedImage(
            data.imageUrl ||
              data.image ||
              "/placeholder.png"
          );
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // LIVE DELIVERY COUNTDOWN
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      const cutoff = new Date();

      // SAME DAY DELIVERY CUT OFF = 4PM
      cutoff.setHours(16, 0, 0, 0);

      const currentHour = now.getHours();

      // AFTER 4PM
      if (currentHour >= 16) {
        setTimeLeft(
          "Same day delivery unavailable"
        );

        return;
      }

      const diff = cutoff - now;

      const hours = Math.floor(
        diff / (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        (diff % (1000 * 60)) / 1000
      );

      setTimeLeft(
        `${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!product) return;

    await addToCart(product, qty);

    alert("Added to cart");
  };

  // DELIVERY STATUS
  const currentHour = new Date().getHours();

  const estimatedDelivery =
    currentHour < 16
      ? "Delivered Today (Before 6PM)"
      : "Delivered Tomorrow (8AM - 6PM)";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found.
      </div>
    );
  }

  // DISCOUNT
  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100
      )
    : null;

  // SIZES
  const sizes = [
    "50ML",
    "75ML",
    "100ML",
    "150ML",
  ];

  // GALLERY IMAGES
  const galleryImages = [
    product.imageUrl ||
      product.image ||
      "/placeholder.png",

    product.image2 ||
      product.imageUrl ||
      product.image ||
      "/placeholder.png",

    product.image3 ||
      product.imageUrl ||
      product.image ||
      "/placeholder.png",
  ];

  return (
    <div className="bg-[#f7f7f5] min-h-screen pt-28 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14">
        {/* LEFT SIDE */}
        <div>
          {/* MAIN IMAGE */}
          <div
            className="
              bg-[#ececeb]
              rounded-[32px]
              overflow-hidden
              h-[380px]
              sm:h-[500px]
              lg:h-[620px]
            "
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 mt-5">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedImage(img)
                }
                className={`
                  w-24 h-24 md:w-28 md:h-28
                  rounded-2xl overflow-hidden
                  border-2 transition
                  ${
                    selectedImage === img
                      ? "border-black"
                      : "border-gray-200"
                  }
                `}
              >
                <img
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="
                    w-full h-full object-cover
                    hover:scale-105 transition
                  "
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pt-2">
          {/* CATEGORY */}
          <span
            className="
              inline-block text-xs
              bg-white border border-gray-200
              px-4 py-2 rounded-full
              text-gray-600 mb-5
            "
          >
            {product.category}
          </span>

          {/* NAME */}
          <h1
            className="
              text-3xl md:text-5xl
              font-semibold text-[#111]
              mb-4 leading-tight
            "
          >
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="flex flex-wrap items-center gap-4 mb-7">
            <span className="text-3xl font-bold text-black">
              KSh {product.price}
            </span>

            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">
                KSh {product.oldPrice}
              </span>
            )}

            {discount && (
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* DELIVERY COUNTDOWN */}
          <div
            className="
              border border-gray-200
              bg-white rounded-3xl
              px-5 py-5
              mb-8
              flex items-center justify-between
              gap-4
            "
          >
            <div>
              <p className="text-sm text-gray-500">
                Order within the next
              </p>

              <h3 className="text-lg font-semibold text-black mt-1">
                {timeLeft}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                for same day delivery
              </p>
            </div>

            <div
              className="
                w-14 h-14 rounded-full
                bg-black text-white
                flex items-center justify-center
                text-xs font-medium
                shrink-0
              "
            >
              6PM
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-4 text-gray-700">
              Select Size
            </p>

            <div className="flex gap-3 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`w-16 h-16 rounded-full text-sm font-medium transition-all
                  ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-4 text-gray-700">
              Quantity
            </p>

            <div
              className="
                flex items-center
                border border-gray-200
                rounded-full overflow-hidden
                bg-white w-fit
              "
            >
              <button
                onClick={() =>
                  setQty(qty > 1 ? qty - 1 : 1)
                }
                className="w-12 h-12 text-lg hover:bg-gray-100 transition"
              >
                -
              </button>

              <span className="w-12 text-center font-medium">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-12 h-12 text-lg hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="
                flex-1 bg-black text-white
                h-14 rounded-full font-medium
                hover:opacity-90 transition
                flex items-center justify-center gap-2
                disabled:opacity-50
              "
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button
              className="
                w-14 h-14 rounded-full
                border border-gray-300
                bg-white flex items-center justify-center
                hover:bg-gray-100 transition
              "
            >
              <Heart size={20} />
            </button>
          </div>

          {/* DESCRIPTION */}
          <div className="border-t border-gray-200 pt-6 mb-10">
            <h3 className="font-semibold text-lg mb-4">
              Description & Details
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description ||
                "A luxurious fragrance designed with elegant long-lasting notes and a premium scent profile perfect for daily wear and special occasions."}
            </p>
          </div>

          {/* SHIPPING INFO */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-6">
              Shipping Information
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* GUARANTEE */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6f6f4] flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Guarantee
                  </p>

                  <p className="font-medium text-sm">
                    100% Original
                  </p>
                </div>
              </div>

              {/* DELIVERY */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6f6f4] flex items-center justify-center">
                  <Truck size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Delivery
                  </p>

                  <p className="font-medium text-sm">
                    {estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* RETURNS */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6f6f4] flex items-center justify-center">
                  <RotateCcw size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Returns
                  </p>

                  <p className="font-medium text-sm">
                    Easy Returns
                  </p>
                </div>
              </div>

              {/* REVIEWS */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6f6f4] flex items-center justify-center">
                  <Star size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Reviews
                  </p>

                  <p className="font-medium text-sm">
                    4.8 / 5 Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STOCK */}
          <div className="mt-6">
            <p
              className={`text-sm font-medium ${
                product.inStock
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.inStock
                ? "In Stock"
                : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}