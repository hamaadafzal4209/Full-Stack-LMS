"use client"
import React, { FC } from "react";
import Heading from "../utils/Headings";
import { useSelector } from "react-redux";
import AdminProtected from "../hooks/adminProtected";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminDashboardHero from "../components/Admin/AdminDashboardHero";

type Props = {};

const Admin: FC<Props> = (Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <AdminProtected>
      <Heading
        title={`Admin DashBoard- ${user.name}`}
        description="Best learning platform to learn programming"
        keywords="MERN, MEAN, REDUX"
      />
        <div className="flex min-h-screen">
          <div className="max-w-[280px]">
            <AdminSidebar />
          </div>
          <div className="w-full">
            <AdminDashboardHero isDashboard={true} />
          </div>
        </div>
    </AdminProtected>
  );
};

export default Admin;
