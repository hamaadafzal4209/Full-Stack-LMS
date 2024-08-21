import Image from "next/image";
import React, { FC } from "react";
import defaultAvatar from "../../../public/assets/Profile.png";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { SiCoursera } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: any;
};

const ProfileSidebar: FC<Props> = ({
  user,
  setActive,
  active,
  avatar,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 gap-2 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar
          }
          alt="Profile Photo"
          width={20}
          height={20}
          className="w-6 h-6 md:w-8 md:h-8 cursor-pointer rounded-full"
        />
        <h5 className="md:block hidden font-Poppins dark:text-white text-black">
          {user?.name}
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 gap-2 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="md:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 gap-2 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="md:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 gap-2 cursor-pointer ${
            active === 5 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="dark:text-white text-black"
          />
          <h5 className="md:block hidden font-Poppins dark:text-white text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer gap-2 ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="md:block hidden font-Poppins dark:text-white text-black">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default ProfileSidebar;
