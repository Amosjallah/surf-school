import type { Ref } from "react";
import { buttonClasses } from "@/components/button";
import { paymentNotice } from "@/lib/payments";
import type { BookingReceipt } from "@/lib/types";

function downloadIcs(filename: string, contents: string) {
  const file = new File([contents], filename, { type: "text/calendar" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function Confirmation({
  receipt,
  headingRef,
}: {
  receipt: BookingReceipt;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div className="mt-8">
      <h2 ref={headingRef} tabIndex={-1} className="text-[clamp(2rem,4vw,3rem)] outline-none">
        Request sent
      </h2>
      <p className="mt-6 text-sm text-soft">Booking reference</p>
      <p className="font-display text-5xl tracking-tight">{receipt.reference}</p>
      <dl className="mt-8 max-w-[62ch] border-t border-line">
        {[
          ["Lesson", receipt.lessonName],
          ["When", receipt.whenLabel],
          ["People", String(receipt.groupSize)],
          ["Total", receipt.totalLabel],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[8rem_1fr]">
            <dt className="text-soft">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="measure mt-6">{paymentNotice}</p>
      <p className="measure mt-3">
        {receipt.emailDelivered
          ? `We emailed ${receipt.email}.`
          : receipt.emailMode === "stub"
            ? "Email isn’t switched on yet, so nothing was sent. Your spots are still held. Save the reference, or send it on WhatsApp."
            : "We couldn’t send the email. Your spots are still held. Save the reference."}
      </p>
      {receipt.shallowWater ? (
        <p className="measure mt-3">You said you’re not a confident swimmer. The coach will keep you in the shallows.</p>
      ) : null}
      <div className="mt-8 flex flex-col items-start gap-3">
        {!receipt.emailDelivered ? (
          <a className={buttonClasses("primary")} href={receipt.whatsappUrl} target="_blank" rel="noreferrer">
            Send the details on WhatsApp
          </a>
        ) : (
          <a className={buttonClasses("quiet")} href={receipt.whatsappUrl} target="_blank" rel="noreferrer">
            Send the details on WhatsApp
          </a>
        )}
        <a className={buttonClasses("quiet")} href={receipt.calendarUrl} target="_blank" rel="noreferrer">
          Add to Google Calendar
        </a>
        <button
          type="button"
          className={buttonClasses("quiet")}
          onClick={() => downloadIcs(`${receipt.reference}.ics`, receipt.ics)}
        >
          Download a calendar file
        </button>
      </div>
    </div>
  );
}
