import Features from "@/components/features-4";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";

import Image from "next/image";

export default function Home() {
  return (
   <div>
    <HeroSection/>
    <Features/>
    <FooterSection/>
   </div>
  );
}
