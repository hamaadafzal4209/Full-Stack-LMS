import { styles } from "@/app/styles/style";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {};

const ChangePassword = (props: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h1 className={`${styles.title} text-center`}>Change Password</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col relative">
          <label
            className="block text-black dark:text-white mb-1"
            htmlFor="name"
          >
            Old Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            placeholder="password@#!&"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        <div className="flex flex-col relative">
          <label
            className="block text-black dark:text-white mb-1"
            htmlFor="name"
          >
            New Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            placeholder="password@#!&"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        <div className="flex flex-col relative">
          <label
            className="block text-black dark:text-white mb-1"
            htmlFor="name"
          >
            Confirm Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            placeholder="password@#!&"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
