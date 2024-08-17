"use client";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../../utils/NavItems";
import { ThemeSwitcher } from "../../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";

type Props = {
  open: Boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({ activeItem }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        active
          ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
          : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
      }`}
    >
      <div className="flex items-center justify-between h-full w-full gap-4 px-[5%]">
        <div>
          <Link
            href="/"
            className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
          >
            ELearning
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <NavItems activeItem={activeItem} isMobile={false} />
          <ThemeSwitcher />
          <HiOutlineMenuAlt3
            size={25}
            className="block text-black dark:text-white md:hidden cursor-pointer"
            onClick={() => setOpenSidebar(!openSidebar)}
          />
          <FaRegUserCircle
            size={25}
            className="text-black dark:text-white cursor-pointer"
          />
        </div>
      </div>
      {openSidebar && (
        <NavItems
          activeItem={activeItem}
          isMobile={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      )}
    </div>
  );
};

export default Header;
