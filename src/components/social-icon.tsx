import { Instagram, Youtube } from "lucide-react";
export function SocialIcon({
  name,
  className = "size-5",
}: {
  name: "whatsapp" | "instagram" | "youtube" | "tiktok";
  className?: string;
}) {
  if (name === "instagram") return <Instagram className={className} aria-hidden="true" />;
  if (name === "youtube") return <Youtube className={className} aria-hidden="true" />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {name === "whatsapp" ? (
        <>
          <path
            fillRule="evenodd"
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 0 1 12 3.8Z"
          />
          <path d="M8 7.5c-.4-.1-.8.1-1 .4-.6.8-.7 1.6-.3 2.7.7 2 3.1 4.5 5.6 5.5 1.3.5 2.6.5 3.4-.5.3-.4.5-1.2.3-1.4l-2.3-1.1c-.3-.1-.5.1-.8.5l-.5.6c-.2.2-.4.2-.7.1-1.4-.6-2.5-1.7-3.1-2.8-.2-.3-.1-.4.1-.6l.6-.8c.2-.3.2-.4.1-.7l-1-2.1c-.1-.2-.2-.3-.4-.3Z" />
        </>
      ) : (
        <path d="M15 2h3c.3 2.3 1.5 3.8 4 4.3v3.2a8.3 8.3 0 0 1-4-1.4v7.1A6.5 6.5 0 1 1 12 8.7v3.4a3.1 3.1 0 1 0 3 3.1V2Z" />
      )}
    </svg>
  );
}
