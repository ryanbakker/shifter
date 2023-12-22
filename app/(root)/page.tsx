import HeroSection from "@/components/HeroSection";
import Collection from "@/components/shared/Collection";

function Home() {
  return (
    <>
      <HeroSection />

      <section
        id="meets"
        className="bg-slate-900 mt-10 my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="wrapper">
          <h2>Welcome to the scene</h2>

          <div className="flex w-full flex-col gap-5 md:flex-row">
            {/* Search */}

            {/* Meet filter */}
          </div>

          <Collection />
        </div>
      </section>
    </>
  );
}

export default Home;
