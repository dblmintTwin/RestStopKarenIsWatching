import Image from "next/image";
import Head from "next/head";
import { FormEvent, useState } from "react";

type Cast = { name: string; tag: string; src: string; width: number };

const dogs: Cast[] = [
  { name: "Labrador", tag: "the Puller", src: "/game-art/labrador.png", width: 240 },
  { name: "Staffie", tag: "the Lightning Rod", src: "/game-art/staffie.png", width: 240 },
  { name: "Chihuahua", tag: "the Runner", src: "/game-art/chihuahua.png", width: 240 },
];

const cast: Cast[] = [
  { name: "The Planner", tag: "you", src: "/game-art/planner.png", width: 240 },
  ...dogs,
  { name: "Karen", tag: "antagonist", src: "/game-art/karen.png", width: 260 },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Honeypot check: real users don't fill the "website" field (it's hidden).
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) {
      // Silently "succeed" so bots don't learn anything from the response.
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Try again?");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Try again?",
      );
    }
  }

  return (
    <>
      <Head>
        <title>Rest Stop: Karen&apos;s Watching</title>
        <meta
          name="description"
          content="Walk the dogs. Plan your route. Don't get caught before the daylight runs out."
        />
      </Head>

      <div className="min-h-screen bg-[#0e1118] font-sans text-[#cfd6df]">
        {/* ===================== HERO ===================== */}
        <section className="relative overflow-hidden">
          {/* Sunset → dusk gradient sky (game's sky-stage palette) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3e] via-[#d96f3d] to-[#f4b556]" />

          {/* Sun */}
          <div
            aria-hidden
            className="absolute left-1/2 top-28 h-32 w-32 -translate-x-1/2 rounded-full bg-[#fff3b0] shadow-[0_0_80px_40px_rgba(255,200,80,0.55)]"
          />

          {/* Grass strip along the bottom */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-[#6fa23c] to-[#4f8a2b]"
          />

          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-12 text-center">
            {/* Highway-style REST STOP sign */}
            <div className="inline-flex flex-col items-center">
              {/* Sign body: deep blue panel with inset white border */}
              <div className="rounded-md bg-[#003D87] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.35)] ring-2 ring-[#002a5f]">
                <div className="rounded-sm border-[3px] border-white px-10 py-6 sm:px-16 sm:py-8">
                  <h1 className="text-5xl font-black uppercase tracking-tight text-white drop-shadow-sm sm:text-7xl">
                    Rest Stop
                  </h1>
                  <p className="mt-2 text-base font-bold uppercase tracking-[0.25em] text-[#ffe066] sm:text-lg">
                    Karen&apos;s Watching
                  </p>
                </div>
              </div>
              {/* Sign poles */}
              <div aria-hidden className="-mt-0.5 flex w-3/5 justify-between">
                <div className="h-16 w-2 rounded-b-sm bg-gradient-to-b from-[#c4c8cc] to-[#7a8088] shadow-md" />
                <div className="h-16 w-2 rounded-b-sm bg-gradient-to-b from-[#c4c8cc] to-[#7a8088] shadow-md" />
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-lg font-semibold text-[#11151d] drop-shadow-sm sm:text-xl">
              Walk the dogs. Plan your route. Don&apos;t get caught before the daylight runs out.
            </p>

            <a
              href="#notify"
              className="mt-10 inline-block rounded-full bg-[#11151d] px-12 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-[#3b6be2] sm:text-xl"
            >
              ▶ Play Now
            </a>
          </div>

          {/* Character lineup — sits on grass, transparent backgrounds */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 pb-6">
            <div className="grid grid-cols-5 items-end gap-1 sm:gap-3">
              {cast.map((c) => (
                <div key={c.name} className="flex flex-col items-center">
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={c.width}
                    height={322}
                    className="h-auto w-full drop-shadow-[0_8px_8px_rgba(0,0,0,0.35)]"
                    priority
                    unoptimized
                  />
                  <p className="mt-1 text-[10px] font-bold text-[#11151d] sm:text-sm">
                    {c.name}
                  </p>
                  <p className="text-[10px] italic text-[#11151d]/70 sm:text-xs">
                    {c.tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FEATURES ===================== */}
        <section className="bg-[#0e1118] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-extrabold text-white sm:text-5xl">
              One rest stop. Three dogs. One Karen.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-[#6b7686] sm:text-lg">
              The sun is setting. Every move counts.
            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Feature 1: Plan */}
              <div className="rounded-2xl border border-[#21364a] bg-[#1b2530] p-8 text-center shadow-xl">
                <div className="mb-6 flex h-56 items-end justify-center">
                  <Image
                    src="/game-art/planner.png"
                    alt="The Planner"
                    width={240}
                    height={322}
                    className="h-full w-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                    unoptimized
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">Plan Your Route</h3>
                <p className="mt-3 text-[#cfd6df]/80">
                  You&apos;re The Planner. Three dogs, one rest stop, a ticking daylight clock. Map your moves before the sun drops.
                </p>
              </div>

              {/* Feature 2: Walk */}
              <div className="rounded-2xl border border-[#21364a] bg-[#1b2530] p-8 text-center shadow-xl">
                <div className="mb-6 grid h-56 grid-cols-3 items-end gap-1">
                  {dogs.map((d) => (
                    <Image
                      key={d.name}
                      src={d.src}
                      alt={d.name}
                      width={240}
                      height={322}
                      className="h-full w-full object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]"
                      unoptimized
                    />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white">Walk the Pack</h3>
                <p className="mt-3 text-[#cfd6df]/80">
                  Labrador the Puller. Staffie the Lightning Rod. Chihuahua the Runner. Each one has its own ideas.
                </p>
              </div>

              {/* Feature 3: Dodge */}
              <div className="rounded-2xl border border-[#21364a] bg-[#1b2530] p-8 text-center shadow-xl">
                <div className="mb-6 flex h-56 items-end justify-center">
                  <Image
                    src="/game-art/karen.png"
                    alt="Karen"
                    width={260}
                    height={322}
                    className="h-full w-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                    unoptimized
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">Dodge Karen</h3>
                <p className="mt-3 text-[#cfd6df]/80">
                  She&apos;s watching. She&apos;s filming. One slip and your daylight runs out twice as fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== NOTIFY-ME CTA ===================== */}
        <section
          id="notify"
          className="relative overflow-hidden bg-[#0e1118] px-6 py-24"
        >
          {/* Star dots — dusk sky */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-white" />
            <div className="absolute left-[28%] top-[12%] h-1 w-1 rounded-full bg-white" />
            <div className="absolute left-[44%] top-[28%] h-1.5 w-1.5 rounded-full bg-white" />
            <div className="absolute left-[62%] top-[16%] h-1 w-1 rounded-full bg-white" />
            <div className="absolute left-[78%] top-[24%] h-1 w-1 rounded-full bg-white" />
            <div className="absolute left-[88%] top-[10%] h-1.5 w-1.5 rounded-full bg-white" />
            <div className="absolute left-[18%] top-[60%] h-1 w-1 rounded-full bg-white" />
            <div className="absolute left-[72%] top-[68%] h-1 w-1 rounded-full bg-white" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              Karen&apos;s watching.
            </h2>
            <p className="mt-3 text-xl text-[#cfd6df]/80 sm:text-2xl">
              Get notified when the game launches.
            </p>

            {status === "success" ? (
              <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#3b6be2]/60 bg-[#1b2530] p-8 shadow-xl">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#3b6be2] text-2xl font-bold text-white">
                  ✓
                </div>
                <p className="mt-4 text-xl font-bold text-white">
                  You&apos;re on the list.
                </p>
                <p className="mt-2 text-sm text-[#cfd6df]/70">
                  We&apos;ll email you at launch and for major news. No spam, ever.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 max-w-md text-left"
                noValidate
              >
                {/* Honeypot: real users never see/fill this. Bots often do. */}
                <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </label>

                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={status === "loading"}
                    autoComplete="email"
                    className="flex-1 rounded-full bg-white px-6 py-4 text-base text-[#11151d] placeholder-gray-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-[#3b6be2]/50 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full bg-[#3b6be2] px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#3d9be9] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Notify Me"}
                  </button>
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-3 text-center text-sm text-[#ff9a9a]"
                  >
                    {errorMsg}
                  </p>
                )}

                <p className="mt-3 text-center text-xs text-[#cfd6df]/50">
                  Launch news only. No spam.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="border-t border-[#21364a] bg-[#0e1118] px-6 py-8 text-center text-sm text-[#6b7686]">
          Rest Stop: Karen&apos;s Watching — every pixel drawn in code.
        </footer>
      </div>
    </>
  );
}
