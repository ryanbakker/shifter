import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getMeetsByUser } from "@/lib/actions/meet.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

async function Profile({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const meetsPage = Number(searchParams?.meetsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedMeets = orders?.data.map((order: IOrder) => order.meet) || [];

  const organizedMeets = await getMeetsByUser({ userId, page: meetsPage });

  return (
    <>
      {/* My Tickets */}
      <section className="py-5 md:py-10 bg-slate-900 pattern-isometric pattern-gray-700 pattern-size-16 relative">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="font-bold text-2xl text-white text-center sm:text-left">
            My RSVP's
          </h3>
          <Button
            asChild
            size="lg"
            className="hidden sm:flex bg-white text-slate-950 hover:bg-red-500 hover:text-white"
          >
            <Link href="/#meets">Find More Meets</Link>
          </Button>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black w-full h-6 absolute left-0 bottom-0" />
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedMeets}
          emptyTitle="You haven't RSVP'd to any meets"
          emptyStateSubtext="No worries, plenty of meets to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Meets Organized */}
      <section className="py-5 md:py-10 bg-slate-900 pattern-isometric pattern-gray-700 pattern-size-16 relative">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="font-bold text-2xl text-white text-center sm:text-left">
            Meets Organized
          </h3>
          <Button
            asChild
            size="lg"
            className="hidden sm:flex bg-white text-slate-950 hover:bg-red-500 hover:text-white"
          >
            <Link href="/meets/create">Create New Meet</Link>
          </Button>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black w-full h-6 absolute left-0 bottom-0" />
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedMeets?.data}
          emptyTitle="No Meets have been Created Yet"
          emptyStateSubtext="Go create some now!"
          collectionType="Meets_Organized"
          limit={3}
          page={meetsPage}
          urlParamName="meetsPage"
          totalPages={organizedMeets?.totalPages}
        />
      </section>
    </>
  );
}

export default Profile;
