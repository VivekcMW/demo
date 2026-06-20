"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Play, Clock, Users, Monitor } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const CHAPTERS = [
  { label: "OPD in 60 seconds", time: "0:00", icon: Monitor },
  { label: "Specialty workflow demo", time: "1:02", icon: Users },
  { label: "Discharge & billing", time: "2:15", icon: Clock },
];

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="marketing-section bg-linear-to-b from-slate-900 to-slate-800 overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Product tour"
          title="See AarogyaEHR in 3 minutes."
          subtitle="Watch a real OPD consultation flow — not a marketing animation."
          className="text-white [&_p]:text-slate-300 [&_.eyebrow]:text-teal-400"
        />

        <ScrollReveal>
          <div className="mt-10 sm:mt-14 max-w-4xl mx-auto">
            {/* Video thumbnail / player */}
            <button
              type="button"
              className="relative w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl cursor-pointer group"
              onClick={() => setPlaying(true)}
              aria-label="Play AarogyaEHR demo video"
            >
              {/* Thumbnail gradient placeholder */}
              <div className="aspect-video bg-linear-to-br from-slate-800 via-teal-900/40 to-slate-900 flex items-center justify-center">
                {playing ? (
                  /* When playing: embed YouTube or Vimeo here */
                  <div className="absolute inset-0">
                    <iframe
                      className="w-full h-full absolute inset-0"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      allow="autoplay; fullscreen"
                      title="AarogyaEHR Product Demo"
                    />
                  </div>
                ) : (
                  <>
                    {/* Mock screen behind play button */}
                    <div className="absolute inset-0 p-6 opacity-30">
                      <div className="h-full rounded-xl border border-slate-600 bg-slate-800 p-4">
                        <div className="flex gap-2 mb-4">
                          <div className="h-8 w-32 bg-teal-800 rounded-lg" />
                          <div className="h-8 w-24 bg-slate-700 rounded-lg" />
                          <div className="h-8 w-28 bg-slate-700 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 h-full pb-8">
                          <div className="col-span-1 space-y-2">
                            {[70, 90, 60, 80, 75].map((w) => (
                              <div key={w} className="h-8 rounded bg-slate-700" style={{ width: `${w}%` }} />
                            ))}
                          </div>
                          <div className="col-span-2 bg-slate-700 rounded-xl p-3 space-y-2">
                            <div className="h-4 bg-slate-600 rounded w-1/2" />
                            <div className="grid grid-cols-2 gap-2">
                              {["a", "b", "c", "d"].map((k) => (
                                <div key={k} className="h-12 bg-slate-600 rounded-lg" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Play icon */}
                    <span className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </span>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
                      3:42 min
                    </div>

                    {/* Pulsing ring */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-24 h-24 rounded-full border-2 border-white/20 animate-ping opacity-30" />
                    </div>
                  </>
                )}
              </div>
            </button>

            {/* Chapter markers */}
            <div className="mt-4 flex flex-wrap gap-3">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-medium hover:bg-white/20 transition-colors border border-white/10"
                >
                  <ch.icon className="w-3.5 h-3.5" />
                  <span>{ch.label}</span>
                  <span className="text-teal-400">{ch.time}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
