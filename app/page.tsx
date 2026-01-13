"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import About from "@/components/About";
import Sentiments from "@/components/Sentiments";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: session } = useSession();

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
