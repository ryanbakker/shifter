"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItems() {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex flex-col items-start gap-3 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "bg-red-500 text-white"
            } flex items-center justify-center whitespace-nowrap py-1.5 px-5 rounded-md text-white`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavItems;
