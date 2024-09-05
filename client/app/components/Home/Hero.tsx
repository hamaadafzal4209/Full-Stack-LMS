import Image from "next/image";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

import heroBanner from "../../../public/assets/hero-banner-1.png";
import client1 from "../../../public/assets/client-1.jpg";
import client2 from "../../../public/assets/client-2.jpg";
import client3 from "../../../public/assets/client-3.jpg";
import Link from "next/link";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="min-h-screen w-full px-[5%] py-10 flex items-center justify-between gap-6 flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-11/12 lg:w-1/2 flex items-center justify-center">
        <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] aspect-square">
          <div className="absolute inset-0 rounded-full hero_animation"></div>
          <Image
            src={heroBanner}
            priority
            alt="Banner Image"
            className="w-11/12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover rounded-full"
          />
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-5xl leading-10 md:leading-[60px] font-semibold font-Josefin capitalize text-black dark:text-white">
          Improve your online learning experience better instantly
        </h1>
        <p className="text-base text-black dark:text-white font-Poppins leading-6 sm:text-balance">
          We have 20K+ online courses & 500K+ online registered students. Find
          your desired course from them.
        </p>
        <form className="2xl:w-[55%] xl:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <div className="relative w-full">
            <input
              type="search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white outline-none"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <BiSearch className="w-4 h-4" />
            </button>
          </div>
        </form>
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex -space-x-4 rtl:space-x-reverse">
            <Image
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={client1}
              alt="Client 1"
            />
            <Image
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={client2}
              alt="Client 2"
            />
            <Image
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={client3}
              alt="Client 3"
            />
          </div>
          <div className="flex items-center">
            <p className="text-black dark:text-white">
              {" "}
              500K+ People already trusted us.{" "}
              <Link
                href="/courses"
                className="dark:text-[#46e256] text-[crimson] pl-2"
              >
                View Courses
              </Link>{" "}
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
