import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { links } from "@/lib/projects";

const items = [
  { href: links.github, label: "GitHub", Icon: Github },
  { href: links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${links.email}`, label: "Email", Icon: Mail },
  { href: links.resume, label: "Résumé", Icon: FileText },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-strong)]/60">
      <div className="container-portfolio flex flex-col items-start justify-between gap-5 py-12 sm:flex-row sm:items-center">
        <p className="text-[15px] text-[var(--color-muted-foreground)]">
          &copy; {new Date().getFullYear()} Raphael Okeke. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {items.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
            >
              <Icon size={19} strokeWidth={1.6} aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
