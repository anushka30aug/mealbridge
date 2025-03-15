export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col ">
      <div className="h-dvh">{children}</div>
    </div>
  );
}
