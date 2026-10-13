import { useQuery } from "@tanstack/react-query";
import { request } from "./news-api";
export type SchoolMediaItem = { id: string; title: string; image: string };
export type SiteMedia = {
  spmb: SchoolMediaItem[];
  programs: SchoolMediaItem[];
  facilities: SchoolMediaItem[];
};
export function useSiteMedia() {
  return useQuery({
    queryKey: ["site-media"],
    queryFn: () => request<SiteMedia>("/api/site-media"),
  });
}
