import { IMeet } from "@/lib/database/models/meet.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { ArrowUpRight, FileEdit } from "lucide-react";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  meet: IMeet;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

function Card({ meet, hasOrderLink, hidePrice }: CardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isMeetCreator = userId === meet.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-slate-900 shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/meets/${meet._id}`}
        style={{ backgroundImage: `url(${meet.imageUrl})` }}
        className="flex items-center justify-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />

      {isMeetCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/meets/${meet._id}/update`}>
            <FileEdit size={20} color="black" />
          </Link>

          <DeleteConfirmation meetId={meet._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col justify-between gap-3 p-5 md:gap-4">
        <div className="flex flex-col gap-3">
          {!hidePrice && (
            <div className="flex gap-2">
              {meet.isFree ? (
                ""
              ) : (
                <span className="w-min rounded-md bg-green-500/30 px-4 py-1 text-green-300 text-sm">
                  ${meet.price}
                </span>
              )}

              <p className="max-w-[265px] rounded-md bg-gray-500/30 px-4 py-1 text-gray-300 line-clamp-1 text-sm">
                {meet.category.name}
              </p>
            </div>
          )}
          <p className="text-slate-400 text-sm">
            {formatDateTime(meet.startDateTime).dateTime}
          </p>

          <Link href={`/meets/${meet._id}`}>
            <p className="line-clamp-2 flex-1 text-slate-100 text-[1.1rem]">
              {meet.title}
            </p>
          </Link>
        </div>

        <div>
          <p className="rounded-md w-fit bg-gray-500/30 px-4 py-1 text-gray-300 line-clamp-1">
            @{meet.organizer.username}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?meetId=${meet._id}`} className="flex gap-2">
              <p className="text-red-500">Order Details</p>
              <ArrowUpRight size={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
