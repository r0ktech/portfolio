import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Raphael Okeke, Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview card (WhatsApp, LinkedIn, X, Slack…), rendered once at build time.
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/raphael-okeke.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0d0d0c",
          color: "#f2f1ea",
          padding: 64,
          gap: 56,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#9d9b91" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#c8f04b" }} />
            Full-stack developer · Awka, Nigeria
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1, marginTop: 28 }}>
            Raphael Okeke
          </div>
          <div style={{ fontSize: 40, lineHeight: 1.25, marginTop: 28, color: "#c8f04b" }}>
            I build the whole product: interface, API & the model.
          </div>
          <div style={{ fontSize: 24, marginTop: 36, color: "#9d9b91" }}>
            Next.js · Node.js · PostgreSQL · scikit-learn
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          width={420}
          height={500}
          alt=""
          style={{ objectFit: "cover", objectPosition: "50% 30%", borderRadius: 28, border: "2px solid #262622" }}
        />
      </div>
    ),
    size
  );
}
