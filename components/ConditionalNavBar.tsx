"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function ConditionalNavBar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isSecretary = pathname.startsWith("/secretary");

  if (isAdmin || isSecretary) {
    return null;
  }

  return <NavBar />;
}
