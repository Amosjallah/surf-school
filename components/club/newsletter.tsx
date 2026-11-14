"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <div className="flex max-w-sm">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setDone(false);
          }}
          className="h-11 min-w-0 flex-1 border border-white/30 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/50"
        />
        <button
          type="submit"
          className="h-11 shrink-0 bg-white px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0c3d48]"
        >
          Subscribe
        </button>
      </div>
      {done ? (
        <p role="status" className="mt-3 text-sm text-white/80">
          Thanks. You’re on the list.
        </p>
      ) : null}
    </form>
  );
}
