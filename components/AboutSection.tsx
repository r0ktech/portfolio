import Image from "next/image";
import Reveal from "./Reveal";

const paragraphs = [
  "I'm Raphael Okeke, a full-stack developer who builds products end to end: the interface people use, the API behind it and the database that keeps it honest.",
  "Most recently I built Veyro, a tech store on web and mobile where checkout runs as a single database transaction, and Trusta, a marketplace for finding trusted artisans in Nigeria.",
  "Before that I spent two years building client interfaces at Elegant Computers, then interned as a backend developer at Apex Technology Hub, shipping authenticated Node.js APIs.",
  "I'm studying Computer Science at Nnamdi Azikiwe University, on track for First Class Honours, and I volunteer as a Cowrywise Campus Ambassador and GDSC content lead.",
  "My core stack is TypeScript, React, Next.js, Node.js, Express and PostgreSQL.",
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pt-28 md:pt-36">
      <div className="container-portfolio">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.35rem)] text-[var(--color-foreground)]">About</h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.03 * i}>
                <p className="max-w-[62ch] text-[17px] leading-[1.6] text-[var(--color-muted-foreground)]">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="flex justify-center">
            <figure className="group w-[min(260px,70vw)] rotate-[6deg] bg-white p-3 pb-12 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] ring-1 ring-black/5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 hover:scale-[1.03]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#eee]">
                <Image
                  src="/raphael-okeke.png"
                  alt="Raphael Okeke"
                  fill
                  sizes="260px"
                  className="object-cover object-[50%_30%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-4 rotate-[-2deg] text-center font-mono text-[12px] font-semibold text-[#222]">@r0ktech</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
