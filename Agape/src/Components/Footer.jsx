export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-xl font-semibold mb-4">GET IN TOUCH WITH LINOUGE</h2>
          <p className="text-sm text-gray-400">
            Contact us and our managers will be happy to answer all your questions
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Men</li>
            <li>Women</li>
            <li>Lookbook</li>
            <li>About</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Info</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Account</li>
            <li>Help Center</li>
            <li>Shipping & Payments</li>
            <li>Contacts</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <input
            className="w-full p-2 bg-transparent border border-gray-600"
            placeholder="Email"
          />
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm pb-6">
        © 2025 Linouge. All rights reserved.
      </div>

    </footer>
  );
}