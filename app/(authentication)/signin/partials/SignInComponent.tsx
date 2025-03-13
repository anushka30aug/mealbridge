"use client";
import { useRouter } from "next/navigation";
import { Google } from '../../../../public/icon';
const SignInComponent = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3001/mealbridge/authentication/google?state=receiver`;
  };

  return (
    <div className="mx-auto md:min-h-screen md:flex md:flex-col md:items-center md:justify-center ">
      <h1 className="text-2xl text-white font-bold mb-4">Sign - in</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-[#005e38] text-white md:text-black md:bg-white text-xl font-bold px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center gap-2"
      >
        <Google />
        Continue with Google
      </button>
    </div>


  );
};

export default SignInComponent;
