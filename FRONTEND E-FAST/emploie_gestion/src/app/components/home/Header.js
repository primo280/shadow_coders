// components/HeaderIFRI.tsx
import Image from "next/image";

export default function HeaderIFRI() {
  return (
    <header className="w-full">
      {/* Barre verte */}
      <div className="bg-green-600 text-white text-center py-2 text-sm">
        Cet espace est destiné aux étudiants de l’IFRI.
      </div>

      {/* Contenu principal */}
      <div className="bg-white py-4 px-6 md:px-20 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left">
        {/* IFRI Section */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/ifri-logo.png" alt="Logo IFRI" width={100} height={50} />
          <h2 className="text-sm font-semibold mt-2">INSTITUT DE FORMATION ET DE RECHERCHE EN INFORMATIQUE</h2>
          <p className="italic text-xs mt-1">Nous bâtissons l’excellence</p>
          <p className="text-xs mt-1">
            BP: 526 COTONOU - TÉL: (+229) 55028070 - Courriel: contact@ifri-uac.bj
          </p>
        </div>

        {/* Université Section */}
        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
          <h2 className="text-sm font-semibold">UNIVERSITÉ D’ABOMEY-CALAVI</h2>
          <p className="text-xs mt-1">MINISTÈRE DE L’ENSEIGNEMENT SUPÉRIEUR ET DE LA RECHERCHE SCIENTIFIQUE</p>
          <Image src="/uac-logo.png" alt="Logo UAC" width={100} height={50} className="mt-2" />
        </div>
      </div>
    </header>
  );
}
