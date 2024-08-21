"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import defaultAvatar from "../../../public/assets/Profile.png";
import { styles } from "@/app/styles/style";
import {
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/app/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user?.name || "");
  const [updateAvatar, { isSuccess: avatarSuccess, error: avatarError }] =
    useUpdateAvatarMutation();
  const [updateUser, { isSuccess: userSuccess, error: userError }] =
    useUpdateUserMutation();
  const [loadUser, setLoadUser] = useState(false);

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
          updateAvatar(avatar as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (avatarSuccess || userSuccess) {
      setLoadUser(true);
      toast.success("Profile updated successfully!");
    }
    if (avatarError || userError) {
      toast.error("Failed to update profile.");
      console.log(avatarError || userError);
    }
  }, [avatarSuccess, avatarError, userSuccess, userError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() !== "") {
      await updateUser({ name });
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center py-6">
      <div className="relative">
        <Image
          src={user.avatar?.url || avatar || defaultAvatar}
          alt="Profile Photo"
          width={128}
          height={128}
          className="cursor-pointer object-cover w-32 h-32 border-2 border-[#30bbb2ca] rounded-full"
        />
        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpg,image/jpeg,image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-gray-200 dark:bg-slate-900 text-black dark:text-white rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} />
          </div>
        </label>
      </div>

      <div className="w-full px-4 md:px-10">
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col">
            <label
              className="block text-black dark:text-white mb-1"
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
          <div className="flex flex-col">
            <label
              className="block text-black dark:text-white mb-1 mt-4"
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
              value={user?.email || ""}
            />
          </div>
          <button
            type="submit"
            className="relative mt-4 inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-10 py-2.5 text-[17px] transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Update Profile
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
