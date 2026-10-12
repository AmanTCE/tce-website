/** ↗ and → glyphs drawn as SVG so they align optically with mono labels. */
export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg className={`btn-arrow ${className}`} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={`btn-arrow is-right ${className}`} width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M0 6h14M9.5 1.5L14 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
