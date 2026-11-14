export function WaveEdge() {
  const path = "M0 36 Q150 66 300 36 T600 36 T900 36 T1200 36 L1200 80 L0 80 Z";
  return (
    <div className="wave-edge" aria-hidden="true">
      <div className="wave-track">
        {[0, 1].map((copy) => (
          <svg key={copy} viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path fill="currentColor" d={path} />
          </svg>
        ))}
      </div>
    </div>
  );
}
