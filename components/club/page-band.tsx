export function PageBand({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="bg-[#0d4552] text-white">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[#f0c014] uppercase">{eyebrow}</p>
        <h1 className="page-title mt-3 max-w-[16ch] text-[clamp(2.5rem,5vw,4.1rem)]">{title}</h1>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white/80">{lede}</p>
      </div>
    </header>
  );
}
