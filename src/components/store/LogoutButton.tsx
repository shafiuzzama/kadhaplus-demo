"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useStore } from "./StoreProvider";

export default function LogoutButton() {
  const router = useRouter();
  const { setUser } = useStore();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }
  return (
    <button onClick={logout} className="btn-outline">
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
