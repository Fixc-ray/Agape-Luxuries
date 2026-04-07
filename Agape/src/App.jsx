import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Men from "./Components/Men";
import Women from "./Components/Women";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;