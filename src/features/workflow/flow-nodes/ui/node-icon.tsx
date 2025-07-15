export interface NodeIconProps {
  color: string;
  src: string;
  alt: string;
}
export function NodeIcon({ color, src, alt }: NodeIconProps) {
  return (
    <div
      className="grid size-6 place-content-center rounded-md select-none"
      style={{ background: color }}
    >
      <img alt={alt} src={src} width={14} height={14} />
    </div>
  );
}
