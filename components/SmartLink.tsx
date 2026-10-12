import Link from "next/link";
import type { ComponentProps } from "react";
import { isPreview, pageHref } from "@/lib/paths";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/** Internal link: next/link in the real site, a plain relative link in the static preview. */
export default function SmartLink({ href, children, ...rest }: Props) {
  if (isPreview || href.startsWith("#")) {
    return (
      <a href={pageHref(href)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
