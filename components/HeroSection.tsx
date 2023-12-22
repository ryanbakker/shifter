import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="py-16 md:py-24 min-h-[600px]">
      <Image
        src="/assets/images/heroBG.png"
        alt="hero background"
        height={1000}
        width={1000}
        className=" object-cover object-center w-full absolute -top-20 -z-10 transform scale-x-[-1]"
      />
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-0">
        <div className="flex flex-col justify-center gap-5">
          <h1 className="text-5xl font-extrabold max-w-[500px] text-slate-100">
            Grow your Connections, Engage with the Community
          </h1>

          <p className="text-lg text-slate-300">
            Join the car community by creating, sharing and attending car <br />{" "}
            meets and cruises. All available in one place – Shifter.
          </p>

          <div className="mt-5 flex space-x-4">
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
    </section>
  );
}

export default HeroSection;
