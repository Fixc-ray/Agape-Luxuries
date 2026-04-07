import { products } from "./products";

export default function Women() {
  const womenProducts = products.filter(
    (p) => p.category?.toLowerCase() === "women"
  );

  const perfumes = womenProducts.filter(
    (p) => p.type?.toLowerCase() === "perfume"
  );

  const jewelry = womenProducts.filter(
    (p) => p.type?.toLowerCase() === "jewelry"
  );

  return (
    <div className="bg-white text-black">

      {/* HERO SECTION */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <img
          src="https://i.pinimg.com/736x/4a/e8/48/4ae848cb3e62031e03842b43ce3b309c.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Women Collection"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            WOMEN'S COLLECTION
          </h1>
          <p className="mt-3 text-lg tracking-widest">
            Elegance. Grace. Power.
          </p>
        </div>
      </div>

      {/* PERFUMES SECTION */}
      <section className="px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Perfumes
        </h2>

        {perfumes.length === 0 ? (
          <p className="text-gray-500">No perfumes available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perfumes.map((product) => (
              <div
                key={product.id}
                className="group border rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    KES {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* JEWELRY SECTION */}
      <section className="px-6 py-12 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Jewelry
        </h2>

        {jewelry.length === 0 ? (
          <p className="text-gray-500">No jewelry available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {jewelry.map((product) => (
              <div
                key={product.id}
                className="group border rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    KES {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}