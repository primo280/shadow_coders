"use client";

import { useState } from "react";
import { LayoutList, Clock, Archive, User, Eye, Sun, History, Bell, Monitor, Search, Star } from "lucide-react";

const menuItems = [
  { name: "Les Demandes", icon: <LayoutList size={18} />, key: "Les Demandes" },
  { name: "Historiques", icon: <Clock size={18} />, key: "Historiques" },
  { name: "Archives", icon: <Archive size={18} />, key: "Archives" },
];

const requests = [
  { name: "Jane Cooper", id: "11579423", request: "Attestation d'inscription", date: "11/02/25" },
  { name: "Floyd Miles", id: "45874598", request: "Relevé de notes", date: "15/01/25" },
  { name: "Ronald Richards", id: "47562157", request: "Attestation de succès", date: "10/02/25" },
  { name: "Marvin McKinney", id: "12521489", request: "Attestation d'admissibilité", date: "01/01/25" },
  { name: "Jerome Bell", id: "21215698", request: "Supplément au diplôme", date: "12/10/24" },
  { name: "Kathryn Murphy", id: "58541269", request: "Duplicata de diplôme", date: "15/10/25" },
  { name: "Jacob Jones", id: "56245862", request: "Duplicata de diplôme", date: "12/12/25" },
  { name: "Kristin Watson", id: "45842658", request: "Duplicata de diplôme", date: "10/05/25" },
];

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Les Demandes");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 40; // Simulation du nombre total de pages

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col">
        {/* Profile */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          <span className="font-medium text-gray-700">SG</span>
        </div>

        {/* Navigation */}
        <h3 className="text-gray-400 uppercase text-sm mb-2">Dashboards</h3>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveMenu(item.key)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
                  activeMenu === item.key ? "bg-gray-200 text-black font-medium" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Monitor size={18} />
            <Star size={18} />
            <span className="text-sm text-gray-500">Dashboards / </span>
            <span className="font-medium text-black">Default</span>
          </div>

          {/* Search bar */}
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none ml-2 text-sm w-40"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-gray-600">
            <Sun size={18} />
            <History size={18} />
            <Bell size={18} />
            <Monitor size={18} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-auto">
          {activeMenu === "Les Demandes" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Les Demandes</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-600">
                      <th className="p-3">Étudiant</th>
                      <th className="p-3">Matricule</th>
                      <th className="p-3">Demande</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{req.name}</td>
                        <td className="p-3">{req.id}</td>
                        <td className="p-3">{req.request}</td>
                        <td className="p-3">{req.date}</td>
                        <td className="p-3">
                          <button className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                            <Eye size={16} />
                            Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Affichage des données 1 à 8 sur 256K entrées</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </button>
                  <span className="px-3 py-1 border rounded-lg">{currentPage}</span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                    disabled={currentPage === totalPages}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "Historiques" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Historiques</h2>
              <p className="text-gray-600 mt-2">Aucun historique disponible pour le moment.</p>
            </div>
          )}

          {activeMenu === "Archives" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Archives</h2>
              <p className="text-gray-600 mt-2">Aucune archive disponible.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
