import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/lib/news-api";
export function useNews() {
  return useQuery({ queryKey: ["public-news"], queryFn: getNews, refetchOnWindowFocus: true });
}
