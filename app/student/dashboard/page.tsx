
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Navbar from "../../../components/Navbar";
import HeroSection from "../HeroSection";
import Courses from "../Courses";
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
      <HeroSection />
     <Courses />
    </>
  );
}
