"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
const SignInComponent = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3001/mealbridge/authentication/google?state=receiver`;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
     <div className="flex items-center justify-center bg-[#005e38]  md:bg-white  md:text-black p-2 rounded-sm cursor-pointer">
          <FcGoogle size={28}/>
         <Button 
         onClick={handleGoogleLogin}
         variant={"primary"}
         className="cursor-pointer md:bg-white md:text-black"
         >
            Continue with Google
          </Button>
     </div>
    </div>
    // <div className="mx-auto md:min-h-screen md:flex md:flex-col md:items-center md:justify-center ">
    //   <button
    //     onClick={handleGoogleLogin}
    //     className="bg-[#005e38] text-white md:text-black md:bg-white text-xl font-bold px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer flex items-center gap-2"
    //   >
    //     <Google />
    //     Continue with Google
    //   </button>
    // </div>
      // className="bg-[#005e38] text-white rounded-md font-semibold 
        //      hover:bg-[#00432a] md:bg-white md:text-black md:hover:bg-gray-200 
        //      cursor-pointer flex justify-center items-center"
  );
};

export default SignInComponent;
