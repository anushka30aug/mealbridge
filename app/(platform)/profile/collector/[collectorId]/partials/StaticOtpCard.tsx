"use client";
import { Button } from "@ui";
import { Copy, Shield } from "lucide-react";
import { useState } from "react";

export default function StaticOtpCard({ staticOtp }: { staticOtp: string }) {
  const [otpCopied, setOtpCopied] = useState(false);

  const handleCopyOtp = async () => {
    try {
      await navigator.clipboard.writeText(staticOtp);
      setOtpCopied(true);
      setTimeout(() => setOtpCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy OTP:", err);
    }
  };
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">
              Your Collection Code
            </h4>
            <p className="text-sm text-slate-600">
              Share this code with donors during collection
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white border border-blue-200 rounded-lg px-4 py-2">
            <span className="text-xl font-bold text-blue-700 tracking-wider">
              {staticOtp}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyOtp}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Copy className="w-4 h-4" />
            {otpCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
      <div className="mt-3 text-sm text-blue-600 bg-blue-100 rounded px-3 py-1 inline-block">
        💡 This code verifies your identity to food donors
      </div>
    </div>
  );
}
