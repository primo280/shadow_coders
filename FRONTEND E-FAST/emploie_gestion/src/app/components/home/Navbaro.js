export default function Navbar() {
  return (
    <nav className="bg-[#0D3C66] py-3 px-6 flex items-center justify-between">
      {/* Logo & Nom */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <h1 className="text-white text-lg font-bold">
          Service-Public.bj
        </h1>
      </div>

      {/* Liens */}
      <div className="flex items-center space-x-6 text-white font-semibold">
        <a href="#" className="hover:underline">SERVICES</a>
        <a href="#" className="hover:underline">RECHERCHER UN DOCUMENT</a>
      </div>

      {/* Boutons */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center gap-2 bg-[#4477A6] text-white px-4 py-2 rounded-lg hover:bg-[#36608C]">
          <span className="material-icons text-sm">account_circle</span>
          SE CONNECTER
        </button>
        <button className="bg-[#F7B731] text-black px-4 py-2 rounded-lg hover:bg-[#E6A126]">
          CRÉER UN COMPTE
        </button>
        <span className="text-white font-semibold">EN</span>
      </div>
    </nav>
  );
}
