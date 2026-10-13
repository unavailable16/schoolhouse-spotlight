import { useQuery } from "@tanstack/react-query";
import { request } from "./news-api";
import defaults from "./school-settings.defaults.json";
export type CarouselSettings = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};
export type ProfileSettings = {
  heading: string;
  description: string;
  motto: string;
  vision: string;
  missions: { id: string; title: string; text: string }[];
  accreditation: { grade: string; description: string; image: string };
  stats: { id: string; value: string; label: string }[];
  images: { id: string; title: string; image: string }[];
  carousel: CarouselSettings;
};
export type SpmbSettings = {
  academicYear: string;
  heading: string;
  description: string;
  backgroundImage: string;
  ornamentImage: string;
  heroImage: string;
  contactLabel: string;
  requirementsNote: string;
  requirements: { id: string; text: string }[];
  stages: { id: string; title: string; date: string; text: string }[];
  carousel: CarouselSettings;
};
export type CampusSettings = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  isIllustration: boolean;
}[];
export type SchoolSettings = {
  profile: ProfileSettings;
  spmb: SpmbSettings;
  campus: CampusSettings;
};
export const defaultSchoolSettings: SchoolSettings = defaults;
export function useSchoolSettings() {
  const query = useQuery({
    queryKey: ["school-settings"],
    queryFn: () => request<SchoolSettings>("/api/school-settings"),
  });
  return { ...query, settings: query.data ?? defaultSchoolSettings };
}
