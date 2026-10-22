import Reveal from "./Reveal";
import ScrollText from "./ScrollText";
import SkillsBento from "./SkillsBento";
import SkillsMarquee from "./SkillsMarquee";

export default function About() {
  return (
    <section id="about" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
          <Reveal>
            <p className="eyebrow">01 / The problem</p>
          </Reveal>

          <div>
            <ScrollText
              className="max-w-5xl text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--color-foreground)]"
              text="Most products don't fail because of a bad idea. They fail in the *gap* between design, backend, and data. I work across the full stack to *close* those gaps myself, instead of handing them off at every seam."
            />

            <Reveal delay={0.05}>
              <div className="mt-14 grid grid-cols-1 gap-8 border-t border-[var(--color-border)] pt-8 md:grid-cols-3">
                {[
                  ["A slow API", "undermines a good interface."],
                  ["An unvalidated input", "undermines a good database."],
                  ["A missing permission check", "undermines everything."],
                ].map(([lead, rest], i) => (
                  <p key={lead} className="text-base text-[var(--color-muted-foreground)]">
                    <span className="mb-2 block font-mono text-[11px] text-[var(--color-accent)]">0{i + 1}</span>
                    <span className="text-[var(--color-foreground)]">{lead}</span> {rest}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <SkillsBento />

        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
      </div>
    </section>
  );
}
