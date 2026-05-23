export type LocalizedStrings = { en: string[]; id: string[] };

export interface CareerProps {
  position: string;
  company: string;
  logo: string | null;
  /** Set true for wide/non-square logos (e.g. text-based brand marks) to prevent stretching */
  wideLogo?: boolean;
  location: string;
  location_type: "Onsite" | "Remote" | "Hybrid";
  type: string;
  start_date: string;
  end_date: string | null;
  industry: string;
  link: string | null;
  responsibilities?: LocalizedStrings;
  lessons_learned?: LocalizedStrings;
  impact?: LocalizedStrings;
  indexCareer?: number;
  isShow?: boolean;
}
