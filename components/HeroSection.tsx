import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="py-16 md:py-24 min-h-screen relative overflow-hidden -z-10 -top-[69px]">
      <Image
        src="/assets/images/heroBG.png"
        alt="hero background"
        height={1000}
        width={1000} // You can remove this line
        className="object-cover object-center w-full h-screen absolute top-0 left-0 -z-10 transform scale-x-[-1]"
      />
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-0 relative z-10">
        <div className="flex flex-col justify-center gap-5 mt-12">
          <h1 className="text-5xl font-extrabold max-w-[500px] text-slate-100">
            Grow your Connections, Engage with the Community
          </h1>

          <p className="text-lg text-slate-300">
            Join the car community by creating, sharing and attending car{" "}
            <br className="hidden lg:flex" /> meets and cruises. All available
            in one place – Shifter.
          </p>

          <div className="mt-12 flex space-x-4">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-fit bg-red-500 hover:bg-red-700"
            >
              <Link href="#meets" className=" scroll-smooth">
                Explore Now
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="w-full sm:w-fit"
            >
              <Link href="/meets/create">Create Meet</Link>
            </Button>
          </div>
        </div>

        <div />
      </div>
      <div className="absolute bg-gradient-to-b from-transparent to-black w-full h-20 bottom-0" />
    </section>
  );
}

export default HeroSection;
