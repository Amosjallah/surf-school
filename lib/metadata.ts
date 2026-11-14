import type { Metadata } from "next";

export function pageMeta(title: string, description: string, absolute = false): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    openGraph: { title, description },
  };
}
