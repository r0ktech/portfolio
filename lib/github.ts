import { links } from "./projects";

/** GitHub username, derived from the profile link so there's one source of truth. */
export const GITHUB_USER = new URL(links.github).pathname.replace(/\//g, "");

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubActivity = {
  total: number;
  days: ContributionDay[];
  publicRepos: number | null;
  followers: number | null;
};

/** Longest and current run of consecutive days with at least one contribution. */
export function streaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Current streak counts back from today; an empty "today" doesn't break it yet.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue;
    else break;
  }
  return { longest, current };
}
