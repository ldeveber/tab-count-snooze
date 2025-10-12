export function Divider({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex-grow border-border border-t" />
      <div className="text-nowrap font-medium text-base text-muted-foreground tracking-wide">
        {children}
      </div>
      <div className="flex-grow border-border border-t" />
    </div>
  );
}
