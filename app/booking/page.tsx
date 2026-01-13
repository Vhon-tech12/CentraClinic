"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // waiting for auth check
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (!loggedIn) {
      router.push("/login"); // redirect if not logged in
    } else {
      setIsLoggedIn(true); // allow booking to render
    }

    setLoading(false);
  }, [router]);

  if (loading) return <p className="text-white p-4">Checking login...</p>;
  if (!isLoggedIn) return null; // render nothing if not logged in

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Book an Appointment</h1>
      <p>Your booking UI goes here...</p>
    </div>
  );
}
