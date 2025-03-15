import SignInComponent from "./partials/SignInComponent";

export default function SignIn() {
  return (
    <div className="w-full h-full md:flex">
      <div className="h-[80%] md:h-full md:w-1/2">
        <video
          autoPlay
          muted
          className="w-full h-full object-contain aspect-video"
          src="/assets/signin.mp4"
        />
      </div>
      <div className="h-[20%] md:h-full md:w-1/2 flex flex-col items-center text-center bg-transparent md:bg-[#005e38]">
        <SignInComponent />
      </div>
    </div>
  );
}
