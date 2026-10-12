/**
 * Client reviews shown in the review boxes on the home page.
 * Add only real reviews that the client has agreed to publish, ideally the same
 * words they left on TCE's Google Business Profile. The section stays hidden
 * on the live site until at least one review is added.
 */
export type Review = {
  quote: string;
  name: string;
  /** e.g. "Marketing Manager" */
  role?: string;
  company?: string;
  /** Star rating the client gave, 1 to 5, if it came from Google. */
  rating?: number;
};

export const reviews: Review[] = [];

/** Link to leave a Google review (from Google Business Profile → "Ask for reviews"). */
export const googleReviewUrl: string | null = null;
