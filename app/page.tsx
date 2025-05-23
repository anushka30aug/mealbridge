"use client";
import { useSocket } from "@/providers/socketProvider";

export default function Home() {
  const { socket } = useSocket();
  const test = () => {
    if (!socket) return;
  };
  return (
    <div>
      <button onClick={test} className="bg-red-400 p-4 m-6 cursor-grab">
        NGO
      </button>
    </div>
  );
}
