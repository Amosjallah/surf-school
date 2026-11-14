import { gallery } from "@/lib/content";
import { MediaFrame } from "@/components/media-frame";
import { SectionTitle, Wrap } from "@/components/section";

const frame = {
  wide: "landscape",
  tall: "portrait",
  tile: "tile",
} as const;

export function Gallery() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="beach-heading">
      <Wrap>
        <SectionTitle id="beach-heading">The beach</SectionTitle>
        <p className="measure mt-4 text-soft">
          These frames are waiting for photographs from the school. The captions say what should go there.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-6">
          {gallery.map((item) => (
            <li
              key={item.label}
              className={
                item.frame === "wide" ? "md:col-span-4" : item.frame === "tall" ? "md:col-span-2" : "md:col-span-2"
              }
            >
              <MediaFrame aspect={frame[item.frame]} alt={item.alt} label={item.label} />
              <p className="mt-2 text-sm text-soft">{item.label}</p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
