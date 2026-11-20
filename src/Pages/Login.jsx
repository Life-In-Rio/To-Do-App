
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { saveUser } from "../Utils/Storage";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    saveUser(trimmedName);
    onLogin(trimmedName);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111412] px-4 py-10 text-[#F4F5F1] sm:px-6">
      <div className="w-full max-w-[440px]">

        {/* Brand */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            TASK<span className="text-[#B7F34A]">FLOW</span>
          </h1>

          <p className="mt-2 text-sm text-[#929A93]">
            Plan your day. Get things done.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-[#2B322D] bg-[#1C211E] p-6 shadow-2xl shadow-black/10 sm:p-8">

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B7F34A]/10">
            <CheckCircle2
              className="text-[#B7F34A]"
              size={25}
            />
          </div>

          {/* Heading */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#929A93] sm:text-xs">
              YOUR PRODUCTIVITY SPACE
            </p>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome back.
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#929A93] sm:text-base">
              Enter your name and let's make today productive.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-7 space-y-5 sm:mt-8">

            {/* Name Input */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-bold text-[#F4F5F1]"
              >
                Your name
              </label>

              <input
                id="username"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                required
                className="h-12 w-full rounded-xl border border-[#2B322D] bg-[#111412] px-4 text-sm text-[#F4F5F1] outline-none transition-all placeholder:text-[#626A63] focus:border-[#B7F34A] focus:ring-2 focus:ring-[#B7F34A]/10"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!name.trim()}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#B7F34A] px-5 text-sm font-extrabold text-[#111412] transition-all duration-200 hover:bg-[#C8FF60] hover:shadow-lg hover:shadow-[#B7F34A]/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Get Started

              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-[10px] font-semibold tracking-[0.12em] text-[#626A63] sm:mt-8 sm:text-xs">
          YOUR DAY. YOUR TASKS. YOUR PROGRESS.
        </p>

      </div>
    </main>
  );
}

export default Login;
