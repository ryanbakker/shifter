"use client";

import { IMeet } from "@/lib/database/models/meet.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

function CheckoutButton({ meet }: { meet: IMeet }) {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasMeetFinished = new Date(meet.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasMeetFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
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

export default CheckoutButton;
