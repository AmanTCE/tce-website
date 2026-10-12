"use client";

import { useEffect, useState } from "react";

/** Current year; rendered at build time, refreshed in the browser so it never goes stale. */
export default function Year() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
