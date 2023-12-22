import { SignIn, SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import React from "react";
import NavItems from "./NavItems";
import Logo from "./Logo";
import { Button } from "../ui/button";
import Link from "next/link";

function Header() {
  const userId = auth().userId;

  console.log(userId);

  return (
    <header className="flex flex-row justify-between wrapper items-center bg-gradient-to-b from-black via-black to-transparent">
      <Logo />

      <nav className="flex items-center">
        <NavItems />

        <SignedIn>
          <Link className="text-white" href={`/profile/${userId}`}>
            Profile
          </Link>
          <div className="border border-red-500 rounded-full p-1 ml-3">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}

export default Header;
