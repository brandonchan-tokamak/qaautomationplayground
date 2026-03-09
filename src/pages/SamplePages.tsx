import React, { useState } from "react";
import { loginAdmin } from "../utils/tracking";

export default function SamplePages() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (email === "admin@gmail.com" && password === "rachellove1") {
      loginAdmin();
      setLoginStatus("admin_success");
      // Trigger a storage event so Layout can update
      window.dispatchEvent(new Event('storage'));
    } else if (email === "admin@example.com" && password === "admin123") {
      setLoginStatus("success");
    } else {
      setLoginStatus("error");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setRegisterStatus("error");
    } else {
      setRegisterStatus("success");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sample Pages</h1>
        <p className="text-slate-600 mt-2">
          Complete end-to-end flows like login and registration.
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            id="tab-login"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "login"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            Login
          </button>
          <button
            id="tab-register"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "register"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {/* Login Form */}
          {activeTab === "login" && (
            <form
              id="login-form"
              onSubmit={handleLogin}
              className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Welcome Back
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Use admin@example.com / admin123 to login
                </p>
              </div>

              {loginStatus === "error" && (
                <div
                  id="login-error"
                  className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm text-center"
                >
                  Invalid email or password.
                </div>
              )}
              {loginStatus === "success" && (
                <div
                  id="login-success"
                  className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm text-center"
                >
                  Login successful! Welcome back.
                </div>
              )}
              {loginStatus === "admin_success" && (
                <div
                  id="login-admin-success"
                  className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-sm text-center font-medium"
                >
                  Secret menu unlocked!
                </div>
              )}

              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <button
                id="login-button"
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors mt-4"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form
              id="register-form"
              onSubmit={handleRegister}
              className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Create Account
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Join us today! It's free and easy.
                </p>
              </div>

              {registerStatus === "error" && (
                <div
                  id="register-error"
                  className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm text-center"
                >
                  Passwords do not match.
                </div>
              )}
              {registerStatus === "success" && (
                <div
                  id="register-success"
                  className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm text-center"
                >
                  Registration successful! You can now login.
                </div>
              )}

              <div>
                <label
                  htmlFor="register-name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <button
                id="register-button"
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors mt-4"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
