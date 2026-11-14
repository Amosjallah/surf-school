export function formatMoney(cents: number, currency = "ZAR") {
  const amount = cents / 100;
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours && rest) return `${hours} hr ${rest} min`;
  if (hours === 1) return "1 hour";
  if (hours) return `${hours} hours`;
  return `${rest} min`;
}

export function peopleLabel(count: number) {
  return count === 1 ? "1 person" : `${count} people`;
}

export const skillLabels = {
  never: "Never surfed",
  tried: "Tried once or twice",
  improver: "I can catch whitewater",
} as const;

export const swimLabels = {
  confident: "I can swim 25 metres unaided",
  short: "I can swim a short distance",
  "not-confident": "I’m not a confident swimmer",
} as const;

export type SkillLevel = keyof typeof skillLabels;
export type SwimLevel = keyof typeof swimLabels;
