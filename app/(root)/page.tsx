import HeroSection from "@/components/HeroSection";
import Collection from "@/components/shared/Collection";
import { getAllMeets } from "@/lib/actions/meet.actions";
import { SearchParamProps } from "@/types";

async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const meets = await getAllMeets({
    query: searchText,
    category,
    page: page,
    limit: 6,
  });

  return (
    <>
      <HeroSection />

      <section
        id="meets"
        className="bg-black mt-10 my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="wrapper">
          <h2 className="text-red-500 text-3xl underline underline-offset-[6px] pb-10 text-center">
            Welcome to the scene
          </h2>

          <div className="flex w-full flex-col gap-5 md:flex-row">
            {/* Search */}

            {/* Meet filter */}
          </div>

          <Collection
            data={meets?.data}
            emptyTitle="No Meets Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Meets"
            limit={6}
            page={page}
            totalPages={meets?.totalPages}
          />
        </div>
      </section>
    </>
  );
}

export default Home;
