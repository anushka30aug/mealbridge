"use client";
import { useRouter } from "next/navigation";

const SignInComponent = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3001/mealbridge/authentication/google?state=donor`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign - in</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Continue with Google
      </button>  
    </div>
  );
};

export default SignInComponent;
