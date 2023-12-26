import Search from "@/components/shared/Search";
import { getOrdersByMeet } from "@/lib/actions/order.actions";
import { IOrderItem } from "@/lib/database/models/order.model";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";

async function Orders({ searchParams }: SearchParamProps) {
  const meetId = (searchParams?.meetId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByMeet({ meetId, searchString: searchText });

  return (
    <>
      <section className="py-5 md:py-10 bg-slate-900 pattern-isometric pattern-gray-700 pattern-size-16 relative">
        <h3 className="wrapper font-bold text-2xl text-white text-center sm:text-left">
          RSVP's
        </h3>

        <div className="bg-gradient-to-b from-transparent to-black w-full h-6 absolute left-0 bottom-0" />
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="wrapper overflow-x-auto bg-slate-900 rounded-md mb-24">
        <div className="px-4">
          <table className="w-full border-collapse border-t border-slate-500">
            <thead>
              <tr className="border-b text-gray-300 border-slate-500">
                <th className="min-w-[250px] py-3 text-left">Order ID</th>
                <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                  Meet Title
                </th>
                <th className="min-w-[150px] py-3 text-left">Buyer</th>
                <th className="min-w-[100px] py-3 text-left">Created</th>
                <th className="min-w-[100px] py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length === 0 ? (
                <tr className="border-b border-slate-500">
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                <>
                  {orders &&
                    orders.map((row: IOrderItem) => (
                      <tr
                        key={row._id}
                        className="border-b "
                        style={{ boxSizing: "border-box" }}
                      >
                        <td className="min-w-[250px] py-4 text-red-500">
                          {row._id}
                        </td>
                        <td className="min-w-[200px] flex-1 py-4 pr-4">
                          {row.meetTitle}
                        </td>
                        <td className="min-w-[150px] py-4">{row.buyer}</td>
                        <td className="min-w-[100px] py-4">
                          {formatDateTime(row.createdAt).dateTime}
                        </td>
                        <td className="min-w-[100px] py-4 text-right">
                          {formatPrice(row.totalAmount)}
                        </td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Orders;
