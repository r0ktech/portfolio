import { links } from "@/lib/projects";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-portfolio flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-[var(--color-muted-foreground)]">
          © {new Date().getFullYear()} Raphael Okeke.
        </p>
        <div className="flex gap-6 text-sm text-[var(--color-muted-foreground)]">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer pb-0.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-foreground)] after:transition-transform after:duration-200 hover:text-[var(--color-foreground)] hover:after:scale-x-100"
          >
            GitHub
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer pb-0.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-foreground)] after:transition-transform after:duration-200 hover:text-[var(--color-foreground)] hover:after:scale-x-100"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${links.email}`}
            className="relative cursor-pointer pb-0.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-foreground)] after:transition-transform after:duration-200 hover:text-[var(--color-foreground)] hover:after:scale-x-100"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
