import Image from "next/image";
import React, { FC, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import defaultAvatar from "../../../public/assets/Profile.png";
import { styles } from "@/app/styles/style";
import { useSelector } from "react-redux";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex justify-center flex-col items-center py-6">
      <div className="relative">
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar
          }
          alt="Profile Photo"
          width={128}
          height={128}
          className="cursor-pointer border-2 border-[#30bbb2ca] rounded-full"
        />
        <input
          type="file"
          name=""
          id="avatar"
          className="hidden"
          accept="image/png,image/jpg,image/jpeg,image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-gray-200 dark:bg-slate-900 text-black dark:text-white rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="z-1" />
          </div>
        </label>
      </div>

      <div className="w-full pl-6 md:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[50%] m-auto block">
            <div className="w-[100%]">
              <label
                className="block text-black pt-4 dark:text-white"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input}`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="w-[100%]">
              <label
                className="block text-black dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                readOnly
                id="email"
                className={`${styles.input}`}
                required
                value={user && user.email}
              />
            </div>
            <br />
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            >
              <span className="relative px-10 py-2 text-[17px] transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Update Profile
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
