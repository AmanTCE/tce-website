type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  size?: "xl" | "lg" | "md";
  className?: string;
  /** Animate on load (hero) instead of on scroll. */
  onLoad?: boolean;
  delay?: number;
};

/** Oversized editorial headline, one line per entry, revealed line by line. */
export default function Headline({ lines, as: Tag = "h2", size = "lg", className = "", onLoad = false, delay = 0 }: Props) {
  return (
    <Tag className={`display display-${size} ${className}`}>
      {lines.map((line, i) =>
        onLoad ? (
          <span key={i} className="line-mask">
            <span style={{ "--d": `${delay + i * 110}ms` } as React.CSSProperties}>{line}</span>
          </span>
        ) : (
          <span key={i} className="block reveal" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
            {line}
          </span>
        ),
      )}
    </Tag>
  );
}
