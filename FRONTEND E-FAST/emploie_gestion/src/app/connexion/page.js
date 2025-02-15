"use client";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);

    // Simulation d'une requête API (remplace ça par ton appel réel)
    setTimeout(() => {
      setLoading(false);
      setMessage("Connexion réussie!");
    }, 2000);
  };

  return (
    <div>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Bon retour <span className="text-yellow-500">👋</span>
        </h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Bouton de soumission */}
<button
  type="submit"
  className="w-full bg-green-700 text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300 flex justify-center items-center gap-2"
  disabled={loading}
>
  {loading ? (
    <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
  ) : (
    <>
      <LogIn className="w-5 h-5" />
      Se connecter
    </>
  )}
</button>
        </form>

        {/* Lien d'inscription */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Vous n'avez pas de compte? <a href="/inscription" className="text-black font-medium">S'inscrire</a>
        </p>
      </div>

      {/* Popup de confirmation */}
      {message && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
}
