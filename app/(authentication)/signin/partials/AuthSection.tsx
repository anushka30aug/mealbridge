import { Button, Card, CardContent, CardHeader } from "@ui";
import { Utensils } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function AuthSection() {
  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3001/authentication/google?state=collector`;
  };

  return (
    <>
      <div className="bg-green-50 p-3 sm:p-20 ">
        <Card className="shadow-md max-w-[500px] mx-auto shadow-xl border-none px-2 pb-5">
          <CardHeader className="flex items-center flex-col gap-4">
            <Utensils className="bg-[#005e38] h-15 w-15 text-white p-2 rounded-lg" />
            <h1 className="font-medium text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#278049] to-green-600 ">
              Start Your Food Donation Journey
            </h1>
          </CardHeader>
          <CardContent>
            <p className="p-2 text-gray-600 text-center">
              Login to your MealBridge account or create one to begin sharing
              your surplus food with those in need.
            </p>
            <div className="flex items-center justify-center bg-white/40 p-2 rounded-lg cursor-pointer shadow-md border-1 border-gray-200 sm:m-3 mb-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <FcGoogle size={28} />

              <Button
                onClick={handleGoogleLogin}
                variant={"primary"}
                className="cursor-pointer bg-transparent text-gray-600 text-md sm:text-xl"
              >
                Continue with Google
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500 my-2">
              <p>
                By signing in, you agree to our{" "}
                <span className="text-green-700 hover:text-green-800 font-medium">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-green-700 hover:text-green-800 font-medium">
                  Privacy Policy
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
