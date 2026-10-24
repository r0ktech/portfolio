import Reveal from "./Reveal";
import ScrollText from "./ScrollText";
import SkillsMarquee from "./SkillsMarquee";

export default function About() {
  return (
    <section id="about" className="chapter border-t border-[var(--color-border)]">
      <div className="container-portfolio">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
          <Reveal>
            <p className="eyebrow">01 — The problem</p>
          </Reveal>

          <div>
            <ScrollText
              className="max-w-5xl text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--color-foreground)]"
              text="Most products don't fail because of a bad idea. They fail in the *gap* between design, backend, and data. I work across the full stack to *close* those gaps myself, instead of handing them off at every seam."
            />
          </div>
        </div>

        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
      </div>
    </section>
  );
}
