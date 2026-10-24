import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Veyro case study · Raphael Okeke",
  description:
    "How Veyro, a full-stack tech store, keeps money and stock correct: transactional checkout in Postgres, row-level security, and a cart that syncs live between web and mobile.",
};

const LIVE = "https://veyro-kohl.vercel.app";
const REPO = "https://github.com/r0ktech/Veyro";

const facts = [
  ["Role", "Solo: design, frontend, backend, mobile"],
  ["Platforms", "Web + iOS / Android (Expo)"],
  ["Catalogue", "40 products · 10 categories"],
  ["Stack", "Next.js 16 · TypeScript · Supabase · Mailgun"],
];

const decisions = [
  {
    title: "Checkout is one database transaction",
    body: "A Postgres function turns the signed-in user's cart into an order. It reads prices from the products table, never from the browser, locks each product row, rejects the order if stock ran out, writes the order and its items, decrements stock and clears the cart, all or nothing. Two shoppers racing for the last laptop can't both win, and nobody can edit a price in DevTools.",
    code: `for r in
  select c.quantity, p.name, p.price_cents, p.stock
  from cart_items c
  join products p on p.id = c.product_id
  where c.user_id = v_user
  for update of p          -- lock the rows
loop
  if r.quantity > r.stock then
    raise exception 'Only % left in stock for %',
      r.stock, r.name;
  end if;
  v_subtotal := v_subtotal + r.price_cents * r.quantity;
end loop;`,
    file: "supabase/schema.sql · place_order()",
  },
  {
    title: "Row-level security on every table",
    body: "Products and categories are public to read. Carts, orders and profiles are only visible to their owner, enforced by Postgres itself rather than by app code that could be bypassed. Users can't update orders at all; the one write they need (recording that the confirmation email went out) goes through a narrow security-definer function.",
    code: `alter table cart_items enable row level security;
alter table orders     enable row level security;

create policy "own orders read" on orders
  for select using (auth.uid() = user_id);

-- place_order() is callable only by signed-in users
revoke all on function place_order(...) from public, anon;
grant execute on function place_order(...) to authenticated;`,
    file: "supabase/schema.sql · policies",
  },
  {
    title: "A cart that follows you",
    body: "Guests shop with a cart kept in the browser. On Google sign-in it is merged into their saved cart in Supabase, capped at available stock and taken out of storage first so it can't be merged twice. From then on the cart syncs live through Supabase Realtime, so adding an item on the phone app shows up on the website instantly.",
    code: `// Take the guest cart out of storage synchronously so a
// concurrent load can't merge it twice.
const guest = readLocal();
writeLocal([]);
...
if (rows.length) await supabase.from("cart_items").upsert(rows);

// Live sync: reload when this user's cart changes anywhere
// (another tab, the mobile app).
const channel = supabase
  .channel(\`cart:\${userId}\`)
  .on("postgres_changes",
      { event: "*", schema: "public", table: "cart_items",
        filter: \`user_id=eq.\${userId}\` }, reload)
  .subscribe();`,
    file: "src/components/CartProvider.tsx",
  },
  {
    title: "Money as whole numbers",
    body: "Every amount is stored in kobo as an integer, so there is no floating-point rounding anywhere between the cart, the order and the email. Shipping (free over ₦500,000) and 7.5% VAT are computed in the database from the same constants the UI uses.",
    code: `c_free_shipping_min constant bigint  := 50000000; -- ₦500,000 in kobo
c_shipping_fee      constant bigint  := 500000;   -- ₦5,000
c_tax_rate          constant numeric := 0.075;    -- 7.5% VAT`,
    file: "supabase/schema.sql · place_order()",
  },
];

const screens = [
  { src: "/screenshots/veyro/shop.png", label: "Catalogue with category filter, search and sort" },
  { src: "/screenshots/veyro/product.png", label: "Product page with live stock status" },
  { src: "/screenshots/veyro/cart.png", label: "Cart with server-matched totals and free-shipping nudge" },
];

function Frame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="ml-3 truncate font-mono text-[10px] text-[var(--color-muted-foreground)]">veyro-kohl.vercel.app</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

/** Architecture: two clients, one backend, two external services. */
function Architecture() {
  const box =
    "rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-center";
  const label = "font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted-foreground)]";
  return (
    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
      <div className="grid gap-3">
        <div className={box}>
          <p className={label}>Web</p>
          <p className="mt-1 font-semibold text-[var(--color-foreground)]">Next.js 16</p>
          <p className="text-[12px] text-[var(--color-muted-foreground)]">server actions · SSR</p>
        </div>
        <div className={box}>
          <p className={label}>Mobile</p>
          <p className="mt-1 font-semibold text-[var(--color-foreground)]">Expo / React Native</p>
          <p className="text-[12px] text-[var(--color-muted-foreground)]">iOS · Android</p>
        </div>
      </div>
      <span aria-hidden className="text-center font-mono text-[var(--color-muted-foreground)] md:rotate-0">⇄</span>
      <div className="rounded-[14px] border border-[var(--color-foreground)] p-4">
        <p className={`${label} text-center`}>Supabase</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[13px] text-[var(--color-foreground)]">
          <span className="rounded-[8px] bg-[var(--color-muted)] px-2 py-2">Postgres + RLS</span>
          <span className="rounded-[8px] bg-[var(--color-muted)] px-2 py-2">Auth</span>
          <span className="rounded-[8px] bg-[var(--color-muted)] px-2 py-2">Realtime</span>
          <span className="rounded-[8px] bg-[var(--color-muted)] px-2 py-2 font-mono text-[12px]">place_order()</span>
        </div>
      </div>
      <span aria-hidden className="text-center font-mono text-[var(--color-muted-foreground)]">⇄</span>
      <div className="grid gap-3">
        <div className={box}>
          <p className={label}>Sign-in</p>
          <p className="mt-1 font-semibold text-[var(--color-foreground)]">Google OAuth</p>
        </div>
        <div className={box}>
          <p className={label}>Email</p>
          <p className="mt-1 font-semibold text-[var(--color-foreground)]">Mailgun</p>
          <p className="text-[12px] text-[var(--color-muted-foreground)]">order confirmations</p>
        </div>
      </div>
    </div>
  );
}

export default function VeyroCaseStudy() {
  return (
    <>
      <header className="sticky top-0 z-[var(--z-nav)] border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-background)_85%,transparent)] backdrop-blur-md">
        <div className="container-portfolio flex h-14 items-center justify-between">
          <Link href="/#projects" className="group flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]">
            <ArrowLeft size={15} aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to portfolio
          </Link>
          <span className="font-mono text-[11px] text-[var(--color-muted-foreground)]">Case study 01</span>
        </div>
      </header>

      <main id="main" className="pb-24">
        <section className="container-portfolio pt-16 md:pt-24">
          <Reveal>
            <p className="eyebrow">Case study — Veyro</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-5xl text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--color-foreground)]">
              A tech store that never gets <span className="serif-accent text-[var(--color-accent)]">money or stock</span> wrong.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-[var(--color-muted-foreground)]">
              Veyro sells laptops, phones and accessories on the web and in a companion mobile app. The interesting part
              isn&apos;t the storefront; it&apos;s making sure prices, stock and carts stay correct when real people use it at the
              same time.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-[var(--color-border)] py-6 md:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] text-[var(--color-muted-foreground)]">{k}</dt>
                  <dd className="mt-1 text-[15px] text-[var(--color-foreground)]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={LIVE} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
                Visit the live store
                <ArrowUpRight size={15} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-muted)]">
                <Github size={15} aria-hidden />
                Read the source
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-16">
            <Frame src="/screenshots/veyro.png" alt="Veyro home page" priority />
          </Reveal>
        </section>

        <section className="container-portfolio mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">The problem</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--color-foreground)]">
              A shop has to be right about three things the browser can&apos;t be trusted with: what something costs, whether
              it&apos;s still in stock, and whose cart is whose. Get any of them wrong and you either lose money or lose the
              customer.
            </p>
          </Reveal>
        </section>

        <section className="container-portfolio mt-28">
          <Reveal>
            <p className="eyebrow">Architecture</p>
            <p className="mt-4 max-w-[56ch] text-[var(--color-muted-foreground)]">
              Two clients share one backend. The website and the mobile app talk to the same Supabase project, sign in with the
              same Google accounts and check out through the same database function.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="mt-10">
            <Architecture />
          </Reveal>
        </section>

        <section className="container-portfolio mt-28">
          <Reveal>
            <p className="eyebrow">Key decisions</p>
          </Reveal>
          <ol className="mt-10 space-y-20">
            {decisions.map((d, i) => (
              <li key={d.title} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
                <Reveal>
                  <p className="font-mono text-xs text-[var(--color-muted-foreground)]">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.035em] text-[var(--color-foreground)]">
                    {d.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">{d.body}</p>
                </Reveal>
                <Reveal delay={0.05}>
                  <figure className="overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-[var(--color-card)]">
                    <figcaption className="border-b border-[var(--color-border)] px-4 py-2 font-mono text-[11px] text-[var(--color-muted-foreground)]">
                      {d.file}
                    </figcaption>
                    <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-[var(--color-foreground)]">
                      <code>{d.code}</code>
                    </pre>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="container-portfolio mt-28">
          <Reveal>
            <p className="eyebrow">The product</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {screens.map((s, i) => (
              <Reveal key={s.src} delay={0.05 * i}>
                <Frame src={s.src} alt={s.label} />
                <p className="mt-3 text-[13px] text-[var(--color-muted-foreground)]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container-portfolio mt-28">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 border-t border-[var(--color-border)] pt-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="eyebrow">Outcome</p>
                <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-[var(--color-foreground)]">
                  A working store on web and mobile from one backend: Google sign-in, carts that sync across devices, checkout
                  that prices and reserves stock on the server, and a confirmation email for every order.
                </p>
              </div>
              <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-foreground)]">
                <ArrowLeft size={15} aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                See all projects
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
