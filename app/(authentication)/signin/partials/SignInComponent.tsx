"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
const SignInComponent = () => {
  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3001/authentication/google?state=collector`;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <div className="flex items-center justify-center bg-[#005e38]  md:bg-white  md:text-black p-2 rounded-sm cursor-pointer">
        <FcGoogle size={28} />
        <Button
          onClick={handleGoogleLogin}
          variant={"primary"}
          className="cursor-pointer md:bg-white md:text-black"
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default SignInComponent;
