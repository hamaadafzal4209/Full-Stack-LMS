import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import defaultAvatar from "../../../../public/assets/Profile.png";
import {
  BarChartOutlined,
  ExitToApp,
  Group,
  HomeOutlined,
  ManageHistory,
  MapOutlined,
  OndemandVideo,
  PeopleOutlined,
  Quiz,
  ReceiptOutlined,
  Settings,
  VideoCall,
  Web,
  Wysiwyg,
} from "@mui/icons-material";
import Link from "next/link";

type Props = {};

const AdminSidebar = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active,setActive] = useState(0);

  return (
    <div className="w-full border-r-4 p-4 h-screen max-h-screen sticky top-0 overflow-y-auto">
      {/* name and collapse icon */}
      <div
        className={`flex items-center gap-4 justify-between ${isCollapsed ? "mb-2" : "mb-0"}`}
      >
        {!isCollapsed && <p className={`${styles.title}`}>Elearning</p>}
        <div className="mx-auto">
          {isCollapsed ? (
            <div className="cursor-pointer hover:bg-indigo-900 bg-indigo-800 p-2 rounded-full text-white flex items-center justify-center">
              <FaAngleRight
                size={24}
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </div>
          ) : (
            <div className="cursor-pointer hover:bg-indigo-900 bg-indigo-800 p-2 rounded-full text-white flex items-center justify-center">
              <FaAngleLeft
                size={24}
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </div>
          )}
        </div>
      </div>
      {/* admin profile image */}
      <div>
        {!isCollapsed && (
          <div className="flex items-center justify-center my-2">
            <Image
              width={96}
              height={96}
              src={user?.avatar ? user?.avatar.url : defaultAvatar}
              alt="Profile Image"
              className="rounded-full w-24 h-24 border-2 border-cyan-900 dark:border-cyan-600"
            />
          </div>
        )}
      </div>
      {/* admin name and role */}
      {!isCollapsed && (
        <div className="text-center text-black dark:text-white my-2">
          <h4 className="text-[22px]">{user.name}</h4>
          <h4 className="text-sm">~{user.role}</h4>
        </div>
      )}

      {/* main dashboard button */}

      <Link href="/admin">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 0 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <HomeOutlined />
          {!isCollapsed && <p className="whitespace-nowrap">DashBoard</p>}
        </div>
      </Link>

      {!isCollapsed && <p className="text-lg py-1 text-black dark:text-white font-semibold">Data</p>}

      <Link href="/admin/users">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 1 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <Group />
          {!isCollapsed && <p className="whitespace-nowrap">Users</p>}
        </div>
      </Link>

      <Link href="/admin/invoices">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 2 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <ReceiptOutlined />
          {!isCollapsed && <p className="whitespace-nowrap">Invoices</p>}
        </div>
      </Link>

      {!isCollapsed && <p className="text-lg py-1 text-black dark:text-white font-semibold">Content</p>}

      <Link href="/admin/create-course">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 3 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <VideoCall />
          {!isCollapsed && <p className="whitespace-nowrap">Create Course</p>}
        </div>
      </Link>

      <Link href="/admin/courses">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 4 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <OndemandVideo />
          {!isCollapsed && <p className="whitespace-nowrap">Live Courses</p>}
        </div>
      </Link>

      {!isCollapsed && <p className="text-lg py-1 text-black dark:text-white font-semibold">Customization</p>}

      <Link href="/admin/hero">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 5 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <Web />
          {!isCollapsed && <p className="whitespace-nowrap">Hero</p>}
        </div>
      </Link>

      <Link href="/admin/faq">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 6 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <Quiz />
          {!isCollapsed && <p className="whitespace-nowrap">FAQ</p>}
        </div>
      </Link>

      <Link href="/admin/categories">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 7 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <Wysiwyg />
          {!isCollapsed && <p className="whitespace-nowrap">Categories</p>}
        </div>
      </Link>

      {!isCollapsed && <p className="text-lg py-1 text-black dark:text-white font-semibold">Controllers</p>}

      <Link href="/admin/team">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 8 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <PeopleOutlined />
          {!isCollapsed && <p className="whitespace-nowrap">Manage Teams</p>}
        </div>
      </Link>

      {!isCollapsed && <p className="text-lg py-1 text-black dark:text-white font-semibold">Courses Analytics</p>}

      <Link href="/admin/courses-analytics">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 9 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <BarChartOutlined />
          {!isCollapsed && (
            <p className="whitespace-nowrap">Courses Analytics</p>
          )}
        </div>
      </Link>

      <Link href="/admin/orders-analytics">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 10 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <MapOutlined />
          {!isCollapsed && (
            <p className="whitespace-nowrap">Orders Analytics</p>
          )}
        </div>
      </Link>

      <Link href="/admin/users-analytics">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 11 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <ManageHistory />
          {!isCollapsed && <p className="whitespace-nowrap">Users Analytics</p>}
        </div>
      </Link>

      {!isCollapsed && <p className="text-lg py-1 text-black dark:text-white font-semibold">Extras</p>}

      <Link href="/admin/settings">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 12 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <Settings />
          {!isCollapsed && <p className="whitespace-nowrap">Settings</p>}
        </div>
      </Link>

      <Link href="/">
        <div className={`px-5 py-3 text-left rounded-md w-full  ${active === 13 ? " bg-indigo-900 text-white" : "bg-transparent text-black hover:text-white dark:text-white"} hover:bg-indigo-900 font-semibold flex items-center justify-start gap-2`}>
          <ExitToApp />
          {!isCollapsed && <p className="whitespace-nowrap">Logout</p>}
        </div>
      </Link>
    </div>
  );
};

export default AdminSidebar;
