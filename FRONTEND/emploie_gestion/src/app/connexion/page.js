"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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
      setMessage("Login successful!");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome back <span className="text-yellow-500">👋</span>
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
            <label className="block text-gray-700">Password</label>
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
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300 flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Lien d'inscription */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account? <a href="#" className="text-black font-medium">Sign up</a>
        </p>
      </div>

      {/* Popup de confirmation */}
      {message && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}
