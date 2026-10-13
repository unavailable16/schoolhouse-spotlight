import type { ActivityPhoto as Photo } from "@/lib/activities";
export function ActivityPhoto({
  photo,
  className = "",
  loading = "lazy",
}: {
  photo: Photo;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  if (!photo.crop)
    return (
      <img
        src={photo.src}
        alt={photo.alt}
        loading={loading}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  const { x, y, width, height, ratio } = photo.crop;
  return (
    <div
      role="img"
      aria-label={photo.alt}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={photo.src}
        alt=""
        loading={loading}
        className="absolute max-w-none"
        style={{
          width: `${100 / width}%`,
          height: `${100 / height}%`,
          left: `${(-x / width) * 100}%`,
          top: `${(-y / height) * 100}%`,
        }}
      />
    </div>
  );
}
