import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education, roles, volunteering } from "@/lib/experience";

type Row = { title: string; org: string; summary: string; period: string; logo?: string };

// One line per role, newest first.
const rows: Row[] = [
  ...volunteering
    .slice()
    .reverse()
    .map((v) => ({
      title: v.role.replace(/, UNIZIK$/, ""),
      org: v.org,
      summary:
        v.org === "Cowrywise"
          ? "Represent Cowrywise on campus and help students start saving and investing."
          : "Lead the content team for the Google Developer Student Club at UNIZIK.",
      period: v.period.split(" · ")[0],
      logo: v.logo,
    })),
  {
    title: roles[0].title,
    org: "Apex Technology Hub",
    summary: "Built authenticated REST APIs in Node.js and Express, with JWT auth and indexed SQL schemas.",
    period: roles[0].period,
    logo: roles[0].logo,
  },
  {
    title: roles[1].title,
    org: roles[1].org,
    summary: "Turned designs into responsive, cross-browser interfaces for client projects, down to 320px.",
    period: roles[1].period,
  },
  {
    title: education.degree,
    org: "Nnamdi Azikiwe University",
    summary: "CGPA 4.65 / 5.0, on track for First Class Honours.",
    period: education.period,
    logo: education.logo,
  },
];

function Mark({ row }: { row: Row }) {
  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-white ring-1 ring-black/5">
      {row.logo ? (
        <Image src={row.logo} alt="" width={32} height={32} className="h-full w-full object-cover" />
      ) : (
        <span className="text-[11px] font-semibold text-[var(--color-foreground)]">
          {row.org
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </span>
      )}
    </span>
  );
}

export default function WorkExperience() {
  return (
    <section id="work" className="scroll-mt-24 pt-28 md:pt-36">
      <div className="container-portfolio">
        <SectionHeading kicker="Professional Journey" title="Work Experience" />
        <ul className="mt-10">
          {rows.map((r, i) => (
            <Reveal as="li" key={r.title + r.org} delay={0.03 * i} className="border-b border-[var(--color-border-strong)]/60 last:border-b-0">
              <div className="flex gap-4 py-5">
                <Mark row={r} />
                <div className="grid min-w-0 flex-1 grid-cols-1 gap-1 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div className="min-w-0">
                    <p className="text-[17px] leading-snug">
                      <span className="font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">{r.title}</span>
                      <span className="text-[var(--color-muted-foreground)]"> - {r.org}</span>
                    </p>
                    <p className="mt-1 text-[14px] text-[var(--color-muted-foreground)]">{r.summary}</p>
                  </div>
                  <p className="order-first text-[13px] text-[var(--color-muted-foreground)] sm:order-none sm:pt-0.5 sm:text-right sm:text-[14px]">
                    {r.period}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
