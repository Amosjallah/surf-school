import {
  blockDate,
  cancelBooking,
  logout,
  setSlotClosed,
  unblockDate,
  updateCapacity,
} from "@/app/admin/actions";
import { buttonClasses } from "@/components/button";
import { Wrap } from "@/components/section";
import type { DeskData } from "@/lib/desk";
import { formatMoney } from "@/lib/format";

export function AdminDesk({
  data,
  notice,
  error,
}: {
  data: DeskData;
  notice?: string;
  error?: string;
}) {
  return (
    <Wrap className="py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-[clamp(2.4rem,5vw,3.5rem)]">Desk</h1>
        <form action={logout}>
          <button type="submit" className={buttonClasses("quiet")}>
            Lock the desk
          </button>
        </form>
      </div>
      <p className="measure mt-3 text-soft">
        Bookings for the next two weeks. Closing a time stops new requests. It does not cancel people who are already booked.
      </p>
      {notice ? (
        <p role="status" className="mt-6 border border-line bg-raised px-3 py-3">
          {notice}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-6 border border-danger px-3 py-3 text-danger">
          {error}
        </p>
      ) : null}

      <form action={blockDate} className="mt-10 grid gap-3 border-t border-line pt-6 md:grid-cols-[12rem_1fr_auto] md:items-end">
        <div className="field">
          <label htmlFor="block-date">Block a date</label>
          <input id="block-date" name="date" type="date" required />
        </div>
        <div className="field">
          <label htmlFor="block-reason">Reason students will see</label>
          <input id="block-reason" name="reason" required maxLength={120} />
        </div>
        <button type="submit" className={buttonClasses("desk")}>
          Block this date
        </button>
      </form>

      {data.blocked.length > 0 ? (
        <ul className="mt-4">
          {data.blocked.map((row) => (
            <li key={row.date} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
              <p>
                <span className="font-medium">{row.date}</span>
                <span className="text-soft"> — {row.reason}</span>
              </p>
              <form action={unblockDate}>
                <input type="hidden" name="date" value={row.date} />
                <button type="submit" className={buttonClasses("quiet")}>
                  Open this date
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10 space-y-12">
        {data.days.map((day) => (
          <section key={day.date} aria-labelledby={`day-${day.date}`}>
            <h2 id={`day-${day.date}`} className="text-3xl">
              {day.label}
            </h2>
            {day.blockedReason ? <p className="mt-2 text-soft">Paused: {day.blockedReason}</p> : null}
            {day.slots.length === 0 ? <p className="mt-3 text-soft">No times set.</p> : null}
            <div className="mt-4">
              {day.slots.map((slot) => (
                <article key={slot.id} className="border-t border-line py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-2xl">{slot.startTime}</h3>
                    <p className="text-soft">
                      {slot.bookedCount} of {slot.capacity} spots held
                      {slot.blocked ? " · closed" : ""}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-end gap-3">
                    <form action={updateCapacity} className="flex flex-wrap items-end gap-3">
                      <input type="hidden" name="slotId" value={slot.id} />
                      <div className="field">
                        <label htmlFor={`cap-${slot.id}`}>Capacity</label>
                        <input
                          id={`cap-${slot.id}`}
                          name="capacity"
                          type="number"
                          min={slot.bookedCount}
                          max={30}
                          defaultValue={slot.capacity}
                          className="w-28"
                        />
                      </div>
                      <button type="submit" className={buttonClasses("desk")}>
                        Update capacity
                      </button>
                    </form>
                    <form action={setSlotClosed}>
                      <input type="hidden" name="slotId" value={slot.id} />
                      <input type="hidden" name="closed" value={slot.blocked ? "false" : "true"} />
                      <button type="submit" className={buttonClasses("quiet")}>
                        {slot.blocked ? "Open this time" : "Close this time"}
                      </button>
                    </form>
                  </div>
                  <ul className="mt-4">
                    {slot.bookings.length === 0 ? <li className="text-soft">No bookings held.</li> : null}
                    {slot.bookings.map((booking) => (
                      <li key={booking.id} className="border-t border-line py-4">
                        <p className="font-display text-2xl">{booking.reference}</p>
                        <p className="mt-1">
                          {booking.name} · {booking.lessonName} · {booking.groupSize}{" "}
                          {booking.groupSize === 1 ? "person" : "people"} ·{" "}
                          {formatMoney(booking.totalCents, booking.currency)} · {booking.paymentStatus}
                        </p>
                        <p className="mt-1 break-words text-soft">
                          {booking.phone} · {booking.email}
                        </p>
                        <p className="mt-1 text-soft">
                          {booking.skill} · {booking.swimming}
                        </p>
                        {booking.medicalNotes ? <p className="mt-1">Notes: {booking.medicalNotes}</p> : null}
                        <p className="mt-1 text-sm text-soft">{booking.status}</p>
                        {booking.status === "confirmed" ? (
                          <form action={cancelBooking} className="mt-3">
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <label className="flex min-h-11 items-center gap-2">
                              <input type="checkbox" name="confirm" />
                              Cancel {booking.reference}
                            </label>
                            <button type="submit" className={buttonClasses("desk")}>
                              Cancel booking
                            </button>
                          </form>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Wrap>
  );
}
