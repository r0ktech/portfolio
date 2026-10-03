"use client";

import { useEffect, useState } from "react";

/** Live clock in West Africa Time so visitors know when replies are likely. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular">
      {time ?? "--:--:--"} <span className="text-[var(--color-muted-foreground)]">WAT</span>
    </span>
  );
}
