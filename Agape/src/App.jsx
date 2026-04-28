import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import DubaiShipping from "./Components/DubaiShipping";
import FragranceHero from "./Components/FragranceHero";
import ProductGrid from "./Components/ProductGrid";

// Layout with Navbar
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home WITHOUT Navbar */}
        <Route path="/" element={<Home />} />

        {/* Pages WITH Navbar */}
        <Route
          path="/men"
          element={
            <Layout>
              <Men />
            </Layout>
          }
        />

        <Route
          path="/women"
          element={
            <Layout>
              <Women />
            </Layout>
          }
        />

        {/* ✅ FIXED: inside Routes + with Layout */}
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />

        <Route
          path="/DubaiShipping"
          element={
            <Layout>
              <DubaiShipping />
            </Layout>
          }
        />
        <Route
          path="/fragrance-hero"
          element={
            <Layout>
              <FragranceHero />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductGrid />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;