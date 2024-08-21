"use client";
import React, { FC, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);

  const logoutHandler = async () => {
    //
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[90%] mx-auto flex gap-6">
      <div
        className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-[#f5f5f5] bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000012] rounded-[5px] shadow-md dark:shadow-sm my-6 sticky ${
          scroll ? "top-[120px]" : "top-8"
        } left-8`}
      >
        <ProfileSidebar
          user={user}
          active={active}
          setActive={setActive}
          logoutHandler={logoutHandler}
          avatar={avatar}
        />
      </div>
    </div>
  );
};

export default Profile;
