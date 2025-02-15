"use client";

import { Calendar, CreditCard, LayoutDashboard, Bell, MonitorSmartphone } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Gestion des Emplois du Temps",
    description: "Consultez et gérez vos horaires de cours en temps réel.",
    icon: <Calendar size={28} />, 
    color: "bg-blue-500",
  },
  {
    title: "Paiements Académiques",
    description: "Payez vos frais académiques en ligne de manière sécurisée.",
    icon: <CreditCard size={28} />, 
    color: "bg-green-500",
  },
  {
    title: "Tableau de Bord",
    description: "Accédez à un tableau de bord clair et intuitif.",
    icon: <LayoutDashboard size={28} />, 
    color: "bg-purple-500",
  },
  {
    title: "Notifications en Temps Réel",
    description: "Recevez des rappels pour vos cours et paiements.",
    icon: <Bell size={28} />, 
    color: "bg-yellow-500",
  },
  {
    title: "Interface Moderne et Responsive",
    description: "Profitez d’une expérience utilisateur fluide sur tous les appareils.",
    icon: <MonitorSmartphone size={28} />, 
    color: "bg-pink-500",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Pourquoi Choisir Notre Plateforme ?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">Une solution complète pour la gestion universitaire avec une interface moderne et intuitive.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full ${feature.color} text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
