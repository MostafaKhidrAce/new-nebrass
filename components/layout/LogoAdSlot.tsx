type LogoAdSlotProps = {
  compact?: boolean;
  inverted?: boolean;
};

/** Placeholder ad that sits where a publication logo would normally go. */
export function LogoAdSlot({ compact = false, inverted = false }: LogoAdSlotProps) {
  const className = compact
    ? inverted
      ? "flex h-8 w-[7.5rem] items-center justify-center border border-white/40 bg-white/10 text-[11px] font-bold text-white"
      : "flex h-8 w-[7.5rem] items-center justify-center border border-white/40 bg-white text-[11px] font-bold text-navy"
    : inverted
      ? "flex h-[70px] w-[280px] max-w-full items-center justify-center border border-dashed border-white/30 bg-white/5 text-sm font-bold tracking-wide text-white"
      : "flex h-[70px] w-[280px] max-w-full items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 text-sm font-bold tracking-wide text-navy";

  return (
    <div role="note" aria-label="مساحة إعلانية" className={className}>
      اعلان
    </div>
  );
}
