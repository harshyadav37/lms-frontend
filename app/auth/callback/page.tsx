
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const response = await api.get("/auth/me");

        if (cancelled) return;

        const role = response.data.user.role;

        if (role === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/student/dashboard");
        }
      } catch {
        if (!cancelled) {
          setError(
            "Google login verify nahi ho saka. Dobara login karein."
          );
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="text-center">
        {error ? (
          <>
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => router.replace("/login")}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2"
            >
              Back to login
            </button>
          </>
        ) : (
          <p className="text-lg">Verifying your account...</p>
        )}
      </div>
    </main>
  );
}
