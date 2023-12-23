"use client";

import { IMeet } from "@/lib/database/models/meet.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import Checkout from "./Checkout";
import { useRouter } from "next/navigation";

function MeetButtons({ meet }: { meet: IMeet }) {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const router = useRouter();

  const hasMeetFinished = new Date(meet.endDateTime) < new Date();

  function goBack() {
    router.back();
    return;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <Button
        className="py-5 px-8 bg-slate-800 hover:bg-slate-700 rounded-md"
        onClick={() => goBack()}
      >
        Back
      </Button>
      {hasMeetFinished ? (
        <p className="p-2 text-red-500">Sorry, this event has finished</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-md">
              <Link
                href="/sign-in"
                className="rounded-md sm:w-fit py-5 px-6 bg-white text-red-500 flex flex-row gap-1.5 hover:bg-red-500 hover:text-white transition-all"
              >
                <Heart size={18} /> RSVP
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout meet={meet} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
}

export default MeetButtons;
