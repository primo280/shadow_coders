"use client";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 pb-2" >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-500">e-fast</h1>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Services", "FAQ", "Contact"].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="#"
                className="font-bold text-blue-500 hover:text-orange-600 transition"
              >
                {item}
              </a>
            </motion.li>
          ))}
          <div className="flex space-x-4">
            {/* Bouton Connexion */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/connexion"
              className="flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
            >
              <LogIn className="w-5 h-5" /> Connexion
            </motion.a>

            {/* Bouton Inscription */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/inscription"
              className="flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
            >
              <UserPlus className="w-5 h-5" /> Inscription
            </motion.a>
          </div>
        </ul>

        {/* Bouton du menu mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile avec animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-md p-4 space-y-4"
          >
            {["Home", "Services", "FAQ", "Contact"].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a href="#" className="block font-bold text-blue-500 hover:text-orange-600 transition">
                  {item}
                </a>
              </motion.li>
            ))}
            <div className="flex flex-col space-y-2">
              {/* Bouton Connexion */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/connexion"
                className="flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
              >
                <LogIn className="w-5 h-5" /> Connexion
              </motion.a>

              {/* Bouton Inscription */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/inscription"
                className="flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
              >
                <UserPlus className="w-5 h-5" /> Inscription
              </motion.a>
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
