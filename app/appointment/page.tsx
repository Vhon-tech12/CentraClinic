import { Suspense } from "react";
import AppointmentClient from "@/components/AppointmentClient";

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading appointment...</div>}>
      <AppointmentClient />
    </Suspense>
  );
}
