import { ButtonLink } from "@/components/button";
import { Wrap } from "@/components/section";

export default function NotFound() {
  return (
    <main id="content" className="py-20">
      <Wrap>
        <h1 className="text-5xl">That page isn’t here</h1>
        <p className="measure mt-4 text-soft">The lesson times are on the booking page.</p>
        <div className="mt-8">
          <ButtonLink href="/book">Book a lesson</ButtonLink>
        </div>
      </Wrap>
    </main>
  );
}
