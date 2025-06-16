"use client";
import { useRef } from "react";
import AuthSection from "./AuthSection";
import IntroSection from "./IntroSection";
import StatsSection from "./StatsSection";
import DonationTypes from "./DonationTypes";

export default function SignInComponent() {
  const authRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    console.log("scroll function called");
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <IntroSection handleScroll={handleScroll} />
      <StatsSection />
      <DonationTypes />
      <div ref={authRef}>
        <AuthSection />
      </div>
    </>
  );
}
