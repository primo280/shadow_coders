"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Brand</h1>
        
        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:text-gray-600">Home</a></li>
          <li><a href="#" className="hover:text-gray-600">Services</a></li>
          <li><a href="#" className="hover:text-gray-600">FAQ</a></li>
          <li><a href="#" className="hover:text-gray-600">Contact</a></li>
        </ul>

        {/* Bouton du menu mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md p-4 space-y-4">
          <li><a href="#" className="block">Home</a></li>
          <li><a href="#" className="block">Services</a></li>
          <li><a href="#" className="block">FAQ</a></li>
          <li><a href="#" className="block">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}
