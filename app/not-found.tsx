import SmartLink from "@/components/SmartLink";
import { ArrowRight } from "@/components/Arrow";

export default function NotFound() {
  return (
    <main id="main" data-hero="light" data-page="404" className="wrap flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="label">Error 404</p>
      <h1 className="display display-xl mt-8">
        This page
        <br />
        isn’t here.
      </h1>
      <div className="mt-10">
        <SmartLink href="/" className="btn">
          Back to home <ArrowRight />
        </SmartLink>
      </div>
    </main>
  );
}
