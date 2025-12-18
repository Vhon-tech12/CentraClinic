import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import About from "@/components/About";
import Sentiments from "@/components/Sentiments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Service />
      <About />
      <Sentiments />
      <Footer />
    </div>
  );
}
  