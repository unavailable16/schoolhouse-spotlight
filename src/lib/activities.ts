import { useQuery } from "@tanstack/react-query";
import { request } from "./news-api";
export type ActivityPhoto = {
  src: string;
  alt: string;
  crop?: { x: number; y: number; width: number; height: number; ratio: number };
};
export type SchoolSchedule = { id: string; time: string; title: string; description: string };
export type LearningActivity = {
  id: string;
  title: string;
  description: string;
  photo: ActivityPhoto;
};
export type SchoolClub = {
  id: string;
  name: string;
  category: string;
  description: string;
  activities: string[];
  day: string;
  time: string;
  location: string;
  supervisor: string;
  cover: ActivityPhoto;
  photos: ActivityPhoto[];
};
export type ActivitiesData = {
  poster: ActivityPhoto;
  schedule: SchoolSchedule[];
  learning: LearningActivity[];
  clubs: SchoolClub[];
};
export function useActivities() {
  return useQuery({
    queryKey: ["school-activities"],
    queryFn: () => request<ActivitiesData>("/api/activities"),
  });
}
