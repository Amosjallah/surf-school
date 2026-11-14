/**
 * PAYMENT INTEGRATION POINT
 *
 * Nothing in this file charges a card, a Paystack reference, Stripe, or mobile money.
 * A booking is stored as paymentStatus "unpaid" and the spot is held.
 *
 * When you connect a provider:
 * 1. Create the charge here and return a checkoutUrl.
 * 2. Mark the booking paid only from a verified webhook, in a separate server route.
 * 3. Never trust a success URL on its own.
 *
 * Set PAYMENT_PROVIDER in the environment as a note to yourself
 * (paystack, stripe, or mobile-money). It does not turn charging on.
 */

export const paymentNotice =
  "Sending a request holds your spots. This page does not take payment. We’ll arrange it on WhatsApp or when you arrive at the beach.";

export type PaymentStart = {
  provider: "unconfigured" | "paystack" | "stripe" | "mobile-money";
  status: "unpaid";
  checkoutUrl?: string;
};

export async function beginPayment(booking: {
  reference: string;
  totalCents: number;
  currency: string;
  email: string;
}): Promise<PaymentStart> {
  console.info(
    `[payment] ${booking.reference} for ${booking.email} stays unpaid (${booking.currency} ${booking.totalCents}). No provider is connected.`,
  );
  return { provider: "unconfigured", status: "unpaid" };
}
