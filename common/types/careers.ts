export type LocalizedStrings = { en: string[]; id: string[] };

export interface CareerProps {
  position: string;
  company: string;
  logo: string | null;
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
