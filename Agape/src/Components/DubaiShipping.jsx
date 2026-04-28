export default function DubaiShipping() {
  return (
    <section className="w-full min-h-screen bg-black text-white flex flex-col justify-between">
      
      {/* Top Content */}
      <div className="grid md:grid-cols-2 gap-10 px-8 md:px-20 py-16 items-center">
        
        {/* LEFT TEXT */}
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-pink-400 text-4xl font-bold"></span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-[#E8D9A8]">
            DUBAI <br />
            PERFUMES <br />
            SHIPPING
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-gray-300 max-w-md leading-relaxed">
            The perfume you want is not on our catalog? <br />
            Order with us directly from Dubai.
          </p>

          {/* CTA */}
          <button className="mt-8 bg-[#ff6b6b] hover:bg-[#ff4c4c] px-6 py-3 rounded-full font-semibold shadow-lg transition">
            Place an Order
          </button>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center items-center">
          
          {/* Background blob */}
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[#E8D9A8] rounded-[50%_40%_60%_30%] blur-2xl opacity-80"></div>

          {/* Image */}
          <img
            src="/public/delivery2.png" // put your image in /public
            alt="Delivery"
            className="relative z-10 w-[280px] md:w-[380px] drop-shadow-2xl"
          />

        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#6b1f1f] text-[#E8D9A8] px-8 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <span className="text-3xl font-bold text-pink-300">A</span>

        <span className="flex items-center gap-2">
          📞 +254-711-1563-97
        </span>

        <span className="flex items-center gap-2">
          📍 DUBAI - KENYA
        </span>
      </div>
    </section>
  );
}