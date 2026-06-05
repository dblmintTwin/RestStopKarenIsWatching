import Image from "next/image";
import Head from "next/head";

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

export default function Home() {
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
          {/* Sunset → dusk sky gradient (game's actual sky stages) */}
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

          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-12 text-center">
            {/* REST STOP sign (matches the game's title screen) */}
            <div className="inline-block rotate-[-1.5deg] rounded-2xl border-4 border-[#11151d] bg-[#3f8fd6] px-10 py-6 shadow-2xl sm:px-14 sm:py-8">
              <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-md sm:text-7xl">
                REST STOP
              </h1>
              <p className="mt-2 text-xl font-bold tracking-wide text-[#ffb3c7] sm:text-2xl">
                Karen&apos;s Watching
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-lg font-semibold text-[#11151d] sm:text-xl">
              Walk the dogs. Plan your route. Don&apos;t get caught before the daylight runs out.
            </p>

            <a
              href="#"
              className="mt-10 inline-block rounded-full bg-[#11151d] px-12 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-[#3b6be2] sm:text-xl"
            >
              ▶ Play Now
            </a>
          </div>

          {/* Character lineup */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10">
            <div className="grid grid-cols-5 gap-1 sm:gap-3">
              {cast.map((c) => (
                <div key={c.name} className="flex flex-col items-center">
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={c.width}
                    height={322}
                    className="h-auto w-full drop-shadow-2xl"
                    priority
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
                <div className="mb-6 flex h-56 items-end justify-center rounded-xl bg-[#f7f0d8] py-4">
                  <Image
                    src="/game-art/planner.png"
                    alt="The Planner"
                    width={240}
                    height={322}
                    className="h-full w-auto"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">Plan Your Route</h3>
                <p className="mt-3 text-[#cfd6df]/80">
                  You&apos;re The Planner. Three dogs, one rest stop, a ticking daylight clock. Map your moves before the sun drops.
                </p>
              </div>

              {/* Feature 2: Walk */}
              <div className="rounded-2xl border border-[#21364a] bg-[#1b2530] p-8 text-center shadow-xl">
                <div className="mb-6 grid h-56 grid-cols-3 items-end gap-1 rounded-xl bg-[#f7f0d8] px-2 py-4">
                  {dogs.map((d) => (
                    <Image
                      key={d.name}
                      src={d.src}
                      alt={d.name}
                      width={240}
                      height={322}
                      className="h-full w-full object-contain"
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
                <div className="mb-6 flex h-56 items-end justify-center rounded-xl bg-[#f7f0d8] py-4">
                  <Image
                    src="/game-art/karen.png"
                    alt="Karen"
                    width={260}
                    height={322}
                    className="h-full w-auto"
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

        {/* ===================== CTA ===================== */}
        <section className="relative overflow-hidden bg-[#0e1118] px-6 py-24">
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

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              Karen&apos;s watching.
            </h2>
            <p className="mt-3 text-2xl text-[#cfd6df]/80">Are you ready?</p>
            <a
              href="#"
              className="mt-10 inline-block rounded-full bg-[#3b6be2] px-14 py-5 text-lg font-bold text-white shadow-2xl transition hover:bg-[#3d9be9] sm:text-xl"
            >
              ▶ Play the Game
            </a>
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
