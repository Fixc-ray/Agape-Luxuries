import { useNavigate } from "react-router-dom";
import DubaiShippingOrder from "./DubaiShippingOrder";

export default function DubaiShipping() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen bg-black text-white flex flex-col justify-between">

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10 px-6 sm:px-10 md:px-20 py-12 md:py-20 items-center">

        {/* LEFT */}
        <div className="max-w-xl">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-[#E8D9A8]">
            DUBAI <br />
            PERFUMES <br />
            SHIPPING
          </h1>

          <p className="mt-5 text-gray-300 leading-relaxed text-sm sm:text-base">
            The perfume you want is not on our catalog? <br />
            Order with us directly from Dubai.
          </p>

          {/* CTA → NAVIGATE */}
          <button
            onClick={() => navigate("/dubai-shipping-order")}
            className="mt-6 bg-[#ff6b6b] hover:bg-[#ff4c4c] px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Place an Order
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center items-center mt-10 md:mt-0">

          <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[420px] md:h-[420px] bg-[#E8D9A8] rounded-[50%_40%_60%_30%] blur-2xl opacity-70"></div>

          <img
            src="/delivery2.png"
            alt="Delivery"
            className="relative z-10 w-[220px] sm:w-[280px] md:w-[380px] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="bg-[#6b1f1f] text-[#E8D9A8] px-6 sm:px-10 md:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm sm:text-base">
        
        <span className="text-2xl font-bold text-pink-300">
          A
        </span>

        <span>📞 +254-711-1563-97</span>

        <span>📍 DUBAI - KENYA</span>
      </div>
    </section>
  );
}