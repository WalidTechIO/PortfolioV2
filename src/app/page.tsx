import { LandingTyped } from "@/components/landing/landing-typed";
import { LandingLoader } from "@/components/loaders/landing-loader";
import dynamic from "next/dynamic";

const LandingCorpus = dynamic(async () => (await import("@/components/landing/landing-corpus")).LandingCorpus, {
    loading: () => <LandingLoader />
})

export default function Home() {

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto my-4 w-full">
      <LandingTyped />
      <LandingCorpus />
    </div>
  );
}