import React from "react";
import Logo from "./Logo";
import { headerLinks } from "@/constants";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-row w-full border-t border-gray-800 mt-16 bg-black">
      <div className="wrapper flex flex-row justify-between items-center">
        <Logo />

        <ul className="md:flex-between flex flex-col items-start gap-3 md:flex-row">
          {headerLinks.map((link) => {
            return (
              <li
                key={link.route}
                className="flex items-center justify-center whitespace-nowrap py-1.5 px-5 rounded-md"
              >
                <Link href={link.route}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
