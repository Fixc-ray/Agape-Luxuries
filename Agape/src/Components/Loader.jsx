LogoLoader.jsx
import "../App.css";
import transparentfemlogo from "../Images/transparentfemlogo.png"; // Ensure you have a logo image in this path

const LogoLoader = ({ fadeOut }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black loader-container ${fadeOut ? "fade-out" : ""}`}>
      <img src={transparentfemlogo} alt="Loading..." className="logo-loader" />
    </div>
  );
};

export default LogoLoader;