import { NextResponse } from "next/server";
import { GITHUB_USER, type ContributionDay, type GitHubActivity } from "@/lib/github";

// Always run on request, but the upstream fetches below are cached for 6 hours,
// so GitHub (and the slow contributions API) is hit at most a few times a day.
// A failed fetch throws and is never cached, so the next request retries.
export const dynamic = "force-dynamic";

const SIX_HOURS = 60 * 60 * 6;

export async function GET() {
  try {
    const [contribRes, userRes] = await Promise.all([
      // Public scrape of the profile contribution calendar; no token needed.
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, {
        next: { revalidate: SIX_HOURS },
        signal: AbortSignal.timeout(45_000),
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: SIX_HOURS },
        signal: AbortSignal.timeout(15_000),
      }).catch(() => null),
    ]);

    if (!contribRes.ok) throw new Error(`contributions ${contribRes.status}`);
    const contrib = (await contribRes.json()) as {
      total: { lastYear: number };
      contributions: ContributionDay[];
    };

    const user = userRes?.ok ? ((await userRes.json()) as { public_repos?: number; followers?: number }) : null;

    const body: GitHubActivity = {
      total: contrib.total.lastYear,
      days: contrib.contributions,
      publicRepos: user?.public_repos ?? null,
      followers: user?.followers ?? null,
    };

    return NextResponse.json(body, {
      headers: { "Cache-Control": `public, s-maxage=${SIX_HOURS}, stale-while-revalidate=${SIX_HOURS}` },
    });
  } catch {
    return NextResponse.json({ error: "GitHub activity is unavailable right now." }, { status: 502 });
  }
}
