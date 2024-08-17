import Link from "next/link";
import React, { FC } from "react";
import { IoClose } from "react-icons/io5";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  setOpenSidebar?: (open: boolean) => void;
};

const NavItems: FC<Props> = ({ activeItem, isMobile, setOpenSidebar }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="items-center gap-8 hidden md:flex">
        {navItemsData.map((item, index) => (
          <Link
            href={item.url}
            className={`${
              activeItem === index
                ? "dark:text-[#37a39a] text-[crimson]"
                : "dark:text-white text-black"
            } font-Poppins font-medium`}
            key={index}
          >
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation (Sidebar) */}
      {isMobile && (
        <div className="block md:hidden fixed inset-0 w-full h-screen bg-slate-700/50 z-[70]">
          <div
            className={`w-72 bg-white dark:bg-gray-900 h-screen absolute right-0 p-6 flex flex-col pt-20 shadow-lg transform ${
              isMobile ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <IoClose
              size={25}
              className="text-black dark:text-white cursor-pointer absolute top-3 right-3"
              onClick={() => setOpenSidebar?.(false)}
            />
            {navItemsData.map((item, index) => (
              <Link
                href={item.url}
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } font-Poppins font-medium pb-4`}
                key={index}
                onClick={() => setOpenSidebar?.(false)}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
