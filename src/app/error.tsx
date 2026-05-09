"use client";

import { useEffect } from "react";
import { sendMonitorAlert } from "@/lib/monitor";
import { GlowButton } from "@/components/ui/GlowButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the monitoring bot
    sendMonitorAlert("ERROR", error.message, {
      name: error.name,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b14] px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          We&apos;ve been notified and are looking into the issue. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <GlowButton variant="solid" onClick={() => reset()}>
            Try again
          </GlowButton>
          <GlowButton
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
