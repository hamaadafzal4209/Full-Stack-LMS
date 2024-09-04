"use client"
import CreateCourse from "@/app/components/Admin/courses/CreateCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Headings";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <AdminProtected>
      <Heading
        title={`Create Course - Admin`}
        description="Best learning platform to learn programming"
        keywords="MERN, MEAN, REDUX"
      />
      <div className="flex min-h-screen">
        <div className="max-w-[280px]">
          <AdminSidebar />
        </div>
        <div className="w-full">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
