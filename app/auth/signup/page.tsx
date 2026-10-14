
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/axios";

type Role = "student" | "admin";
type Mode = "login" | "signup";
type AuthPageProps = {
  initialMode?: Mode;
};

export default function AuthPage({
  initialMode = "signup",
}: AuthPageProps) {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get("error") ===
      "google_auth_failed"
    ) {
      setError("Google sign-in failed. Check your account access and try again.");
    }
  }, []);

  const continueToDashboard = (userRole: string) => {
    if (userRole === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/student/dashboard");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        await api.post("/auth/signup", {
          name,
          email,
          password,
        });
        router.replace("/auth/login");
        return;
      }

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      continueToDashboard(response.data.user.role);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Authentication failed"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError("Backend API URL is missing");
      return;
    }

    window.location.href =
      `${apiUrl}/auth/google?role=${role}`;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
        <h1 className="text-3xl font-bold">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Sign in to your LMS account
        </p>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-950 p-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          {(["student", "admin"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={`rounded-lg border p-3 capitalize ${
                role === item
                  ? "border-blue-500 bg-blue-600/20"
                  : "border-slate-700 hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
            />
          )}

          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
          />

          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-sm text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-slate-700 p-3 font-medium hover:bg-slate-800"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              const nextMode = mode === "login" ? "signup" : "login";
              setMode(nextMode);
              setError("");
              router.push(nextMode === "login" ? "/auth/login" : "/auth/signup");
            }}
            className="font-semibold text-blue-400 hover:underline"
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </main>
  );
}
