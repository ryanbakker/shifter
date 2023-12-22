import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import NavItems from "./NavItems";
import Logo from "./Logo";

function Header() {
  return (
    <header className="flex flex-row justify-between wrapper items-center bg-gradient-to-b from-black via-black to-transparent">
      <Logo />

      <nav className="flex items-center">
        <NavItems />

        <SignedIn>
          <div className="border border-red-500 rounded-full p-1 ml-3">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
}

export default Header;
