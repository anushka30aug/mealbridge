import SignInComponent from "./partials/SignInComponent";

export default function SignIn() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 mt-4 md:mt-0">
      {/* Left side - Video */}
      <div className="h-full flex justify-center">
        <video
          autoPlay
          loop
          muted
          className=" w-full h-full object-contain aspect-video"
          src="/assets/signin.mp4"
        />
      </div>


      {/* Right side - Login options */}
      <div className="flex flex-col items-center text-center bg-transparent md:bg-[#005e38]">
        <SignInComponent />
      </div>
    </div>

  );
}
