import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import Header from "./components/home/Header";
import Services from "./components/home/Services";
import FAQ from "./components/home/FAQ";
import Testimonials from "./components/home/Testimonials";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <div>
    
      <Navbar />
      <Hero />
      <Services />
      <FAQ />
      
      <Footer />
    </div>
  );
}
