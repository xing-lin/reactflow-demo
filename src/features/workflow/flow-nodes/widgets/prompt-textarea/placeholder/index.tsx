export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-25 pointer-events-none absolute top-1 left-[11px] text-sm/5.5">
      {children}
    </div>
  );
}
