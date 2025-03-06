import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import logo1 from "../assets/logo1.jpg"
const Navbar = ({ logo }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white px-6 md:px-10 py-4 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="w-[80px] ">
        <img src={logo1} alt="Logo" className="w-full rounded-sm" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/" className="hover:text-gray-400 transition">Home</Link>
        <Link to="/about" className="hover:text-gray-400 transition">About</Link>
        <Link to="/contact" className="hover:text-gray-400 transition">Contact Us</Link>
        <Link to="/authoptions">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Live Demo
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <TiThMenu
        className="text-3xl cursor-pointer md:hidden"
        onClick={handleMenuClick}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className="bg-black fixed inset-0 flex flex-col items-center justify-center text-2xl"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <IoMdClose
              className="absolute top-6 right-6 text-4xl cursor-pointer"
              onClick={handleMenuClick}
            />
            <ul className="flex flex-col gap-6">
              <li><Link to="/" onClick={handleMenuClick}>Home</Link></li>
              <li><Link to="/about" onClick={handleMenuClick}>About</Link></li>
              <li><Link to="/contact" onClick={handleMenuClick}>Contact Us</Link></li>
              <li>
                <Link to="/live-demo">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Live Demo
                  </button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
