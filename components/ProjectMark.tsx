import Image from "next/image";
import type { Project } from "@/lib/projects";

/** The project's real logo, or a lettered tile in its brand colour. */
export default function ProjectMark({ project, size = 56 }: { project: Project; size?: number }) {
  if (project.logo) {
    return (
      <span className="relative block overflow-hidden rounded-[12px]" style={{ width: size, height: size }}>
        <Image src={project.logo} alt={`${project.name} logo`} fill sizes={`${size}px`} className="object-contain" />
      </span>
    );
  }
  const tile = project.tile ?? { text: project.name.slice(0, 2), bg: "#111111", fg: "#ffffff" };
  return (
    <span
      aria-label={`${project.name} logo`}
      role="img"
      className="flex items-center justify-center rounded-[12px] font-semibold tracking-tight"
      style={{ width: size, height: size, background: tile.bg, color: tile.fg, fontSize: size * 0.38 }}
    >
      {tile.text}
    </span>
  );
}
