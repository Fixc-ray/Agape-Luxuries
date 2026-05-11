import { BrowserRouter, Routes, Route } from "react-router-dom";

// USER COMPONENTS
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import DubaiShipping from "./Components/DubaiShipping";
import FragranceHero from "./Components/FragranceHero";
import ProductGrid from "./Components/ShopPage";
import ProductDetails from "./Components/ProductDetails";
import Blogs from "./Components/Blogs";
import DubaiShippingOrder from "./Components/DubaiShippingOrder";

// ADMIN COMPONENTS
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminLogin from "./Admin/AdminLogin";

// AUTH
import ProtectedRoute from "./Context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />

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

          <Route
            path="/blogs"
            element={
              <Layout>
                <Blogs />
              </Layout>
            }
          />

          <Route
            path="/dubai-shipping-order"
            element={
              <Layout>
                <DubaiShippingOrder />
              </Layout>
            }
          />

          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />

          {/* ADMIN LOGIN (PUBLIC) */}
          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          {/* PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* /admin */}
            <Route index element={<AdminDashboard />} />

            {/* /admin/products */}
            <Route
              path="products"
              element={<AdminProducts />}
            />

            {/* /admin/orders */}
            <Route
              path="orders"
              element={<AdminOrders />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;