"use client";
import { motion } from "framer-motion";
import { CreditCard, Briefcase  } from "lucide-react";
export default function Hero() {
  return (
    <motion.div
      className="h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
      style={{ backgroundImage: "url('/hero1.jpg')" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Bienvenue sur notre plateforme
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Gestion d'emploie de temps et paiement d'actes académiques.
      </motion.p>

      <motion.div
        className="mt-6 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.a
  href="/e-paiement"
  className="flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
  whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <CreditCard className="w-5 h-5" /> e-paiement
</motion.a>
        <motion.a
    href="/connexion"
    className="flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition"
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Briefcase className="w-5 h-5" /> e-emploie
  </motion.a>
      </motion.div>
    </motion.div>
  );
}
