import { Fragment } from "react";
import SmartLink from "./SmartLink";

/** Renders blog text with [links](/path) and **bold**. Internal links use SmartLink; external ones open in a new tab. */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const cls = "underline decoration-blue underline-offset-4 transition-colors hover:text-blue";
          return href.startsWith("/") ? (
            <SmartLink key={i} href={href} className={cls}>{label}</SmartLink>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold text-ink">{bold[1]}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
