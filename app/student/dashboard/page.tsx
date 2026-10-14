
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Navbar from "../../../components/Navbar";
export default function StudentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await api.post("/auth/logout");
      router.replace("/signup");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-white p-8 text-black">
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
      </main>
    </>
  );
}
