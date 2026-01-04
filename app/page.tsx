"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
});

import Service from "@/components/Service";
import About from "@/components/About";
import Sentiments from "@/components/Sentiments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Service />
      <About />
      <Sentiments />
      <Footer />
    </div>
  );
}
