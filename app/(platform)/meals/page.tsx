"use client";
import { useRouter } from "next/navigation";

export default function MealsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/signin");
  };

  return;
  <div>
    <h1>🍽 Meals Page</h1>
    <p>Welcome! Your authentication middleware seems to be working.</p>
    <button onClick={handleLogout} style={buttonStyle}>
      Logout
    </button>
  </div>;
}

const buttonStyle: React.CSSProperties = {
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  backgroundColor: "#ff4d4d",
  color: "white",
  borderRadius: "5px",
};
