import React from "react";
import Logo from "./Logo";
import { headerLinks } from "@/constants";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-row w-full border-t border-gray-800 mt-16 bg-black">
      <div className="wrapper flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1 items-start">
          <Logo />
          <p className="text-slate-400 font-light text-xs">
            2023. All rights reserved.
          </p>
        </div>

        <Link
          href="https://github.com/ryanbakker/shifter"
          target="_blank"
          className="text-slate-200 hover:text-red-500 transition-all ease-in-out"
        >
          GitHub Repo
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
