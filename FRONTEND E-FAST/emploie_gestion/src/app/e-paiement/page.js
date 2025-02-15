"use client";

import { useState } from "react";
import { CheckCircle, FileText, AlertCircle } from "lucide-react";

const documents = [
  { id: "inscription", label: "Attestation d'inscription ou certificat de scolarité", icon: <FileText size={18} /> },
  { id: "notes", label: "Relevé de notes", icon: <FileText size={18} /> },
  { id: "succes", label: "Attestation de succès", icon: <CheckCircle size={18} /> },
  { id: "admissibilite", label: "Attestation d'admissibilité", icon: <CheckCircle size={18} /> },
  { id: "diplome", label: "Attestation de diplôme et Diplôme", icon: <FileText size={18} /> },
  { id: "supplement", label: "Supplément au diplôme", icon: <FileText size={18} /> },
  { id: "certification", label: "Certification de relevé de notes, attestation de diplôme et diplôme", icon: <FileText size={18} /> },
  { id: "duplicata", label: "Duplicata de diplôme", icon: <FileText size={18} /> },
  { id: "reclamation", label: "Réclamation", icon: <AlertCircle size={18} /> },
  { id: "main-levee", label: "Attestation de main-levée", icon: <FileText size={18} /> },
];

export default function DocumentRequestForm() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quel document souhaitez-vous demander ?</h2>

      <div className="space-y-3">
        {documents.map((doc) => (
          <label key={doc.id} className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition">
            <input
              type="radio"
              name="document"
              value={doc.id}
              checked={selected === doc.id}
              onChange={() => setSelected(doc.id)}
              className="hidden"
            />
            <div className={`p-2 rounded-full ${selected === doc.id ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}`}>
              {doc.icon}
            </div>
            <span className="text-gray-800">{doc.label}</span>
          </label>
        ))}
      </div>

      <button
        className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition ${
          selected ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!selected}
      >
        OBTENIR ➤
      </button>
    </div>
  );
}
