import { type BeautifulMentionsMenuProps } from 'lexical-beautiful-mentions';

export function MenuContainer({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading: _,
  children,
  ...props
}: BeautifulMentionsMenuProps) {
  return (
    <div
      className="w-fit max-w-75 min-w-50 rounded-lg border border-transparent bg-white p-1"
      style={{
        boxShadow:
          '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 3px 6px -4px rgba(0,0,0,0.12), 0px 6px 16px 0px rgba(0,0,0,0.08)',
      }}
      {...props}
    >
      <div className="text-45 px-3 text-sm/5.5 select-none">Parameters</div>
      <div className="h-one my-1 bg-black/6" />
      <ul>{children}</ul>
    </div>
  );
}
