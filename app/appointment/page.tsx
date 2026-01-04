import { Suspense } from "react";
import AppointmentClient from "./AppointmentClient.tsx";

/* ================= MAIN PAGE ================= */

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentClient />
    </Suspense>
  );
}
