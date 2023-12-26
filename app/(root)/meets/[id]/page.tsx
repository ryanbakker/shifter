import CheckoutButton from "@/components/shared/CheckoutButton";
import { DetailsDeleteBtn } from "@/components/shared/DetailsDeleteBtn";
import MeetButtons from "@/components/shared/MeetButtons";
import {
  getMeetById,
  getRelatedMeetsByCategory,
} from "@/lib/actions/meet.actions";
import { formatDateTime, formatTextToQuery } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import {
  CalendarDays,
  CarFront,
  CircleUser,
  FileEdit,
  Laptop,
  MapPin,
} from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function Meets({ params: { id }, searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const meet = await getMeetById(id);
  const isMeetCreator = userId === meet.organizer._id.toString();

  const relatedMeets = await getRelatedMeetsByCategory({
    categoryId: meet.category._id,
    meetId: meet._id,
    page: searchParams.page as string,
  });

  const contentIcons = 26;
  const contentIconColor = "#cbd5e1";

  const formattedCategory = formatTextToQuery(meet.category.name);
  const formattedLocation = formatTextToQuery(meet.location);

  const hasURL = meet.url != "";

  console.log("Meet Data => ", meet);

  return (
    <div className="bg-slate-950">
      {/* Meet Details */}
      <section className="text-white flex justify-center flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={meet.imageUrl}
            alt="Event"
            width={1000}
            height={1000}
            className="h-full w-full object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            {isMeetCreator && (
              <div className=" flex flex-row gap-4">
                <Link
                  href={`/meets/${meet._id}/update`}
                  className="text-black bg-white py-2 px-4 rounded-md flex flex-row gap-2 items-center hover:bg-white/80 transition-all"
                >
                  <FileEdit size={20} /> Edit
                </Link>

                <DetailsDeleteBtn meetId={meet._id} />
              </div>
            )}

            <div>
              <h2 className="text-3xl font-bold pb-1">{meet.title}</h2>
              {meet.isFree ? (
                ""
              ) : (
                <div className="flex flex-col gap-0.5 mt-4">
                  <h4 className="text-xs font-light text-gray-500">
                    This is a paid event
                  </h4>
                  <p className="mt-1 text-lg flex flex-row items-center gap-3 bg-slate-900 w-fit py-1 px-3 rounded-md justify-center">
                    ${meet.price}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="meet-detail-wrapper">
                <h5>Category</h5>
                <div className="meet-detail hover:bg-slate-800 transition-all">
                  <CarFront stroke={contentIconColor} size={contentIcons} />
                  <Link
                    href={`/search/q=${formattedCategory}`}
                    className="font-medium text-slate-300"
                  >
                    {meet.category.name}
                  </Link>
                </div>
              </div>

              <div className="meet-detail-wrapper">
                <h5>Created by</h5>
                <Link
                  href={`/profile/${meet.organizer._id}`}
                  className="meet-detail hover:bg-slate-800 transition-all"
                >
                  <CircleUser stroke={contentIconColor} size={contentIcons} />
                  <h6>@{meet.organizer.username}</h6>
                </Link>
              </div>

              <CheckoutButton meet={meet} />

              <div className="meet-detail-wrapper">
                <h5>Where to be</h5>
                <div className="meet-detail hover:bg-slate-800 transition-all">
                  <MapPin stroke={contentIconColor} size={contentIcons} />
                  <Link
                    href={`https://www.google.com/maps?q=${formattedLocation}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-300"
                  >
                    {meet.location}
                  </Link>
                </div>
              </div>

              <div className="meet-detail-wrapper">
                <h5>When to be there</h5>
                <div className="meet-detail">
                  <CalendarDays stroke={contentIconColor} size={contentIcons} />
                  <div className="flex flex-col gap-0.5 flex-wrap">
                    <h6>
                      {formatDateTime(meet.startDateTime).dateOnly} -{" "}
                      {formatDateTime(meet.startDateTime).timeOnly}
                    </h6>
                    <h6>
                      {formatDateTime(meet.endDateTime).dateOnly} -{" "}
                      {formatDateTime(meet.endDateTime).timeOnly}
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="meet-detail-wrapper mr-11">
              <h5>What to Expect</h5>
              <div className="meet-detail">
                <p className="font-light">{meet.description}</p>
              </div>
            </div>

            {hasURL && (
              <div className="meet-detail-wrapper">
                <h5>For more details</h5>
                <div className="meet-detail hover:bg-slate-800 transition-all">
                  <LinkIcon stroke={contentIconColor} size={contentIcons} />
                  <Link href={meet.url} className="font-medium text-slate-300">
                    {meet.url}
                  </Link>
                </div>
              </div>
            )}

            <MeetButtons meet={meet} />
          </div>
        </div>
      </section>

      {/* Similar Meets */}
      <section></section>
    </div>
  );
}

export default Meets;
