/**
 * DRAFT wording. It has not been approved by the school or a lawyer.
 * Edit these sentences, then re-read the about page, the booking waiver,
 * the confirmation screen, and the confirmation email — they all use this file.
 */

export const minimumAge = 8;

export const agePolicy = `We teach children from ${minimumAge} years old, as long as they can swim a short distance with a coach beside them.`;

export const weatherPolicy =
  "If the wind, the swell, or a beach closure makes the lesson unsafe, we cancel it and move you to another day. We do not charge for a lesson we cancel.";

export const cancellationPolicy =
  "If you need to cancel, message us on WhatsApp at least 24 hours before the lesson and we will free the spots. Inside 24 hours we may keep the booking, because those spots were held for you.";

export const waiverLabel =
  "I have read the safety notes and I understand that the sea, the beach, and surfing involve real risks. I want to book anyway.";

export const detailsUse =
  "We keep your name, phone, email, swimming ability, and any medical note so the coach can teach you safely and reach you if the beach closes. We don’t sell the list.";

export const certificationNote =
  "Ask to see your coach’s surf-instructor card and first-aid certificate when you arrive. We keep the current cards at the desk.";

export const safetyBriefing = [
  "We meet on the sand and check the wind, the tide, and the Shark Spotters flag before anyone gets changed.",
  "You learn how to fall, how to hold the board, and the signals we use: come in, paddle, stop.",
  "Leashes stay on in the water. You do not dive head-first off the board.",
  "Your coach stays with the group. If you are tired, you come in. That is part of the lesson.",
  "If the flag says the beach is closed, we do not go in.",
] as const;
