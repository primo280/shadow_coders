export default function Hero() {
  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
      style={{ backgroundImage: "url('/hero.jpg')" }}>
      <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Platform</h1>
      <p className="mt-4 text-lg md:text-xl">We provide amazing services to help you succeed.</p>
      <a href="#" className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400">
        Get Started
      </a>
    </div>
  );
}
