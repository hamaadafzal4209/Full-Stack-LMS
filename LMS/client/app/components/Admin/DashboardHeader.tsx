import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import React, { FC } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  return (
    <div className="w-full h-20 sticky top-0 px-6">
      <div className="flex items-center justify-between h-full w-full gap-4">
        <div></div>
        <div className="flex justify-end items-center">
          <ThemeSwitcher />
          <div
            className="relative cursor-pointer m-2"
            onClick={() => setOpen(!open)}
          >
            <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
            <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-5 h-5 text-[12px] flex items-center justify-center text-white">
              0
            </span>
          </div>
          {open && (
            <div className="w-[300px] h-[350px] no-scrollbar overflow-auto dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
              <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
                Notifications
              </h5>

              <div className="dark:bg-[#2d3a4ea1] bg-[#f7f7f7] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] shadow-sm rounded-lg">
                <div className="w-full flex items-center justify-between p-4">
                  <p className="text-black dark:text-white font-medium">
                    New Question Received
                  </p>
                  <p className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
                    Mark as read
                  </p>
                </div>
                <p className="px-4 text-black dark:text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum deleniti illo nemo voluptas numquam sit iure repellat
                  consequuntur!
                </p>
                <p className="p-4 text-gray-500 dark:text-gray-400 text-[14px]">
                  5 days ago
                </p>
              </div>
              <div className="dark:bg-[#2d3a4ea1] bg-[#f7f7f7] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] shadow-sm rounded-lg">
                <div className="w-full flex items-center justify-between p-4">
                  <p className="text-black dark:text-white font-medium">
                    New Question Received
                  </p>
                  <p className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
                    Mark as read
                  </p>
                </div>
                <p className="px-4 text-black dark:text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum deleniti illo nemo voluptas numquam sit iure repellat
                  consequuntur!
                </p>
                <p className="p-4 text-gray-500 dark:text-gray-400 text-[14px]">
                  5 days ago
                </p>
              </div>
              <div className="dark:bg-[#2d3a4ea1] bg-[#f7f7f7] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] shadow-sm rounded-lg">
                <div className="w-full flex items-center justify-between p-4">
                  <p className="text-black dark:text-white font-medium">
                    New Question Received
                  </p>
                  <p className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
                    Mark as read
                  </p>
                </div>
                <p className="px-4 text-black dark:text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum deleniti illo nemo voluptas numquam sit iure repellat
                  consequuntur!
                </p>
                <p className="p-4 text-gray-500 dark:text-gray-400 text-[14px]">
                  5 days ago
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
