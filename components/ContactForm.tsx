"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { links } from "@/lib/projects";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-[14px] border bg-white px-5 py-4 text-[16px] text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[#8a8a8a] focus:border-[var(--color-foreground)]";

/**
 * There's no email service behind this site, so sending opens the visitor's
 * own mail app with their message filled in, addressed to Raphael.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please add your name.";
    if (!email) next.email = "Please add your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email address doesn't look right.";
    if (!message) next.message = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`contact-${k}-error`} className="mt-2 text-[13px] text-[var(--color-destructive)]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" className="scroll-mt-24 pb-24 pt-28 md:pt-36">
      <div className="container-portfolio">
        <Reveal>
          <h2 className="text-[clamp(2.4rem,5vw,3.25rem)] text-[var(--color-foreground)]">Get in touch</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-[52ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.6] text-[var(--color-muted-foreground)]">
            I&apos;m open to full-stack roles, freelance builds and collaborations. Send a message below or email me
            directly at{" "}
            <a href={`mailto:${links.email}`} className="text-[var(--color-foreground)] underline underline-offset-4">
              {links.email}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="mt-10 max-w-[720px] space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Full name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Full Name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={`${field} ${errors.name ? "border-[var(--color-destructive)]" : "border-[var(--color-border)]"}`}
                />
                {err("name")}
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={`${field} ${errors.email ? "border-[var(--color-destructive)]" : "border-[var(--color-border)]"}`}
                />
                {err("email")}
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Write your Message"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${field} resize-y ${errors.message ? "border-[var(--color-destructive)]" : "border-[var(--color-border)]"}`}
              />
              {err("message")}
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-[14px] bg-[var(--color-primary)] px-6 py-4 text-[16px] font-medium text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              Send Message
            </button>
            <p aria-live="polite" className="text-[13px] text-[var(--color-muted-foreground)]">
              {sent
                ? "Your email app should have opened with the message ready to send. If it didn't, email me directly at the address above."
                : "Sending opens your email app with the message filled in."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
