import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-[90px] sticky top-0 z-40 backdrop-blur bg-secondary/90 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-4 sm:px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold tracking-wide text-lg">
          <img src="/MICROCCTVLogo.png" alt="Logo" className="w-[200px] h-[200px] object-cover absolute left-[150px] cursor-pointer" onClick={
            () => navigate('/')
          } />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-15 text-sm uppercase">
          <Link to="/" className="hover:text-secondary transition">Home</Link>
          <Link to="/shop" className="hover:text-secondary transition">Shop</Link>
          <Link to="/service" className="hover:text-secondary transition">Service</Link>
          <Link to="/about" className="hover:text-secondary transition">About</Link>
          <Link to="/contact" className="hover:text-secondary transition">Contact</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition"
          >
            <FaCartShopping className="w-6 h-6" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="block lg:hidden p-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-accent/95 px-6 py-4 space-y-4 text-sm uppercase shadow-md">
          <Link to="/" className="block hover:text-secondary transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="block hover:text-secondary transition" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/service" className="block hover:text-secondary transition" onClick={() => setMenuOpen(false)}>Service</Link>
          <Link to="/about" className="block hover:text-secondary transition" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block hover:text-secondary transition" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
