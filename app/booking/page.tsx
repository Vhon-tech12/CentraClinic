"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BookPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/login"); // redirect if not logged in
    }
  }, [session, status, router]);

  if (status === "loading") return <p className="text-white p-4">Checking login...</p>;
  if (!session) return null; // render nothing if not logged in

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Book an Appointment</h1>
      <p>Your booking UI goes here...</p>
    </div>
  );
}
