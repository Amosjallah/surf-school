import Image from "next/image";
import { cx } from "@/lib/cx";

const aspectClass = {
  hero: "absolute inset-0",
  landscape: "relative aspect-[3/2]",
  portrait: "relative aspect-[4/5]",
  tile: "relative aspect-[4/3]",
} as const;

export function MediaFrame({
  alt,
  label,
  aspect,
  src = null,
  priority = false,
  labelAt = "end",
}: {
  alt: string;
  label: string;
  aspect: keyof typeof aspectClass;
  src?: string | null;
  priority?: boolean;
  labelAt?: "start" | "end";
}) {
  return (
    <div className={cx("overflow-hidden bg-deep text-deep-text", aspectClass[aspect])}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={aspect === "hero" ? "100vw" : "(min-width: 1024px) 40vw, 100vw"}
          className="object-cover"
        />
      ) : (
        <div role="img" aria-label={alt} className="photo-needed absolute inset-0">
          <div
            className={cx(
              "absolute inset-x-0 flex flex-col gap-1 p-4",
              labelAt === "start" ? "top-0" : "bottom-0",
            )}
          >
            <p className="text-sm text-deep-soft">Photo needed</p>
            <p className="max-w-[36ch] text-sm leading-snug">{label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
