"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [name, setName] = useState("friend");
  const [salutation, setSalutation] = useState("Hello");

  useEffect(() => {
    const determineSalutation = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        return "Good morning";
      }
      if (hour < 18) {
        return "Good afternoon";
      }
      return "Good evening";
    };

    const timeoutId = window.setTimeout(() => {
      setSalutation(determineSalutation());
    }, 0);

    const intervalId = window.setInterval(() => {
      setSalutation(determineSalutation());
    }, 60_000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  const message = useMemo(() => {
    const trimmed = name.trim();
    if (!trimmed) {
      return `${salutation}, friend!`;
    }

    const capitalized = trimmed
      .split(/\s+/)
      .map((chunk) => chunk[0]?.toUpperCase() + chunk.slice(1).toLowerCase())
      .join(" ");

    return `${salutation}, ${capitalized}!`;
  }, [name, salutation]);

  const quickNames = ["world", "developer", "traveler", "dreamer", "explorer"];

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 via-white to-purple-100 px-4 py-10 text-zinc-900">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-indigo-200/60 via-transparent to-transparent blur-3xl" />
      <main className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/60 bg-white/80 p-10 shadow-2xl backdrop-blur">
        <section className="space-y-6 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            Say hello to someone special
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Craft a friendly greeting in seconds.
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600">
            Type a name or pick one of the suggestions below to generate a
            tailor-made hello message with a personal touch. Perfect for
            breaking the ice or brightening someone&apos;s day.
          </p>
        </section>

        <section className="mt-12 grid gap-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-start">
          <div className="space-y-6 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <label
              htmlFor="name-input"
              className="block text-sm font-medium text-indigo-600"
            >
              Who are you greeting?
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Type a name, e.g. Alex"
              className="w-full rounded-xl border border-indigo-200 bg-white/80 px-4 py-3 text-base font-medium text-zinc-900 shadow-inner outline-none transition hover:border-indigo-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
            />
            <div className="flex flex-wrap gap-3">
              {quickNames.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setName(suggestion)}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-500 via-indigo-400 to-purple-400 p-[1px] shadow-lg">
            <div className="h-full rounded-[22px] bg-white/95 p-6 sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
                Your message
              </h2>
              <p className="mt-6 text-3xl font-semibold text-zinc-900 sm:text-4xl">
                {message}
              </p>
              <p className="mt-6 text-base leading-relaxed text-zinc-500">
                Share it in a chat, start a meeting with it, or keep it as a
                reminder to reach out with warmth and curiosity.
              </p>
              <div className="mt-10 flex items-center gap-3 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/70 px-4 py-3 text-sm text-indigo-700">
                <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
                Tip: personalize the greeting further with a compliment or a
                question.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
