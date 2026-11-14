import { agePolicy, cancellationPolicy, weatherPolicy } from "@/lib/policies";

export const steps = [
  {
    title: "Meet at Surfers Corner",
    body: "Arrive 15 minutes early, on the beach side of Beach Road. We look at the wind and the tide with you before anyone gets wet.",
  },
  {
    title: "Briefing on the sand",
    body: "Wetsuit on, leash on, and a short safety talk: how to fall, how we paddle, and the hand signals we use in the water.",
  },
  {
    title: "Whitewater first",
    body: "Your coach stays within reach. You practise the pop-up on the sand, then catch already-broken waves until you are on your feet.",
  },
  {
    title: "Walk back up",
    body: "We come in together, rinse the board, and tell you one thing to work on next time. That is the lesson.",
  },
] as const;

export const coaches = [
  {
    name: "Lindiwe M.",
    role: "Beginners",
    bio: "Lindiwe grew up surfing this beach. She teaches people who are nervous before the wetsuit is even on, and she keeps the group close to shore until someone is ready to go further.",
    photoAlt: "Placeholder portrait of Lindiwe, the beginner coach, standing on the sand",
  },
  {
    name: "Sam P.",
    role: "Improvers",
    bio: "Sam takes the second and third lesson: a cleaner pop-up, a longer ride, and where to sit so you stop missing the wave. The notes after the lesson are specific.",
    photoAlt: "Placeholder portrait of Sam, the improver coach, beside a longboard",
  },
  {
    name: "João C.",
    role: "Kids and families",
    bio: "João teaches children and the adults who came with them. Lessons stay in the shallows, with a plan for the child who wants to watch from the wet sand first. He speaks English and Portuguese.",
    photoAlt: "Placeholder portrait of João, the kids coach, kneeling next to a small board",
  },
] as const;

export const gallery = [
  {
    label: "Learners standing up in the whitewater",
    alt: "Placeholder photo of learners standing up in the whitewater at Muizenberg",
    frame: "wide" as const,
  },
  {
    label: "A coach walking a beginner through the shallows",
    alt: "Placeholder photo of a coach walking a beginner through shallow water",
    frame: "tall" as const,
  },
  {
    label: "Boards on the sand at Surfers Corner",
    alt: "Placeholder photo of surfboards lying on the sand at Surfers Corner",
    frame: "tile" as const,
  },
  {
    label: "The beach break on a small morning",
    alt: "Placeholder photo of a small beach break at Muizenberg in the morning",
    frame: "tile" as const,
  },
  {
    label: "Wetsuits on the rack after a lesson",
    alt: "Placeholder photo of wetsuits hanging on a rack after a lesson",
    frame: "tile" as const,
  },
] as const;

/**
 * Sample quotes so the page has a voice. Replace them with real students
 * before launch. Do not present these as reviews you collected.
 */
export const testimonials = [
  {
    quote:
      "I was sure I would just swallow water. I stood up on the third wave and shouted, which was embarrassing and great.",
    name: "Naledi",
    detail: "First Wave, a Tuesday morning",
  },
  {
    quote:
      "Both children got to their knees. One got to their feet. We watched from the sand and nobody was hauled out crying.",
    name: "A parent",
    detail: "Kids lesson",
  },
  {
    quote:
      "Same coach a week later, less panic, and the ride actually went somewhere.",
    name: "Chris",
    detail: "Improver, visiting from Sea Point",
  },
] as const;

export const faqs = [
  {
    q: "What should I bring?",
    a: "A swimsuit to wear under the wetsuit, a towel, water, and sunscreen for your face. We have boards, leashes, and wetsuits, including in summer. The Atlantic is colder than it looks.",
  },
  {
    q: "Do I need to be able to swim?",
    a: "You should be able to swim a short distance, or at least float and follow a coach. Tell us if you are not confident. We keep that lesson in the shallows and we may message you before the day.",
  },
  {
    q: "How old can a child be?",
    a: agePolicy,
  },
  {
    q: "What if I have never surfed?",
    a: "Book First Wave. We expect you to have never stood up. The first part of the lesson is on the sand, on purpose.",
  },
  {
    q: "What about sharks?",
    a: "Muizenberg has a Shark Spotters programme. We watch the flags with you. If the beach is closed, the lesson does not go ahead and we move it.",
  },
  {
    q: "What if the weather is bad?",
    a: weatherPolicy,
  },
  {
    q: "What if I need to cancel?",
    a: cancellationPolicy,
  },
  {
    q: "How many people are in the water?",
    a: "First Wave takes up to six students. Improver and Kids take up to four. A private lesson is you and one coach, and it holds that whole time so a group is not added beside you.",
  },
  {
    q: "Where do we meet, and can I take the train?",
    a: "We meet at Surfers Corner, on the beach side of Beach Road. There is parking along Beach Road and a larger lot by the pavilion. Muizenberg station is about a ten-minute walk.",
  },
] as const;
