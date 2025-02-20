"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo et description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-500">e-fast</h2>
          <p className="text-gray-400 mt-2">Simplifiez la gestion universitaire avec notre plateforme.</p>
        </div>

        {/* Liens de navigation */}
        <ul className="flex space-x-6 text-gray-400">
          {[].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#" className="hover:text-blue-500 transition">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Icônes réseaux sociaux */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
            <motion.a
              key={index}
              whileHover={{ scale: 1.1 }}
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition"
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} e-fast. Tous droits réservés.
      </div>
    </footer>
  );
}
