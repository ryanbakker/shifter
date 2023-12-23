import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import React from "react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import NavItems from "./NavItems";

function Header() {
  return (
    <header className="flex flex-row justify-between wrapper items-center z-50">
      <Logo />

      <nav className="flex items-center">
        <SignedIn>
          <NavItems />
          <div className="border border-red-500 rounded-full p-1">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        <SignedOut>
          <Button
            asChild
            className="bg-white hover:bg-slate-300 text-slate-900 px-5"
            size="sm"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}

export default Header;
