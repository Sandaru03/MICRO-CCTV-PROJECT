import { Link } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="h-[90px] sticky top-0 z-40 backdrop-blur bg-black/80 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold tracking-wide text-lg">
          <FaVideo className="w-6 h-6" />
          <span>MICRO CCTV</span>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-sm uppercase">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <Link to="/shop" className="hover:text-red-500 transition">Shop</Link>
          <Link to="/service" className="hover:text-red-500 transition">Service</Link>
          <Link to="/about" className="hover:text-red-500 transition">About</Link>
          <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
        </nav>

        {/* Right Side: Cart + Login */}
        <div className="flex items-center gap-4">

          {/* Cart Button */}
          <Link to="/cart"
            className="relative flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition"
          >
            <FaCartShopping className="w-6 h-6" />
            
            </Link>

          {/* Login Button */}
          {/* <Link
            to="/login"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Login
          </Link> */}
        </div>
      </div>
    </header>
  );
}
