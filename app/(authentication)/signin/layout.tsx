export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col ">
      <div className="h-dvh">{children}</div>
      <div className="h-40 bg-black text-white text-center flex justify-center items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
        🎉🎉 Happy Holi, Miss Anushka 🎉🎉
        </h1>
      </div>
    </div>
  );
}
