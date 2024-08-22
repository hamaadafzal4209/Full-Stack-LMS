"use client";
import {
  ArrowBackIos,
  ArrowForwardIos,
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
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useSelector } from "react-redux";
import avatarDefault from "../../../../public/assets/Profile.png";

type Props = {};

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: React.FC<itemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className={`${
        selected === title ? "bg-[#1E2A53] dark:bg-[#4A5A88]" : "bg-transparent"
      } hover:bg-[#162B59] dark:hover:bg-[#3C4A74] rounded-md my-1.5 mr-3`}
    >
      <Typography className="!font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: theme === "dark" ? "#134E4A" : "#ffffff !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#ffffff !important",
        },
        "& .pro-inner-item.active": {
          color: "#ffffff !important",
        },
        "& .pro-inner-item": {
          padding: "5px 0px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className={theme === "dark" ? "dark:bg-cyan-950" : "bg-white"}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : " 16%",
        }}
      >
        <Menu iconShape="square">
          {/* Logo */}
          <MenuItem
            className="text-black dark:text-white hover:text-black"
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIos /> : undefined}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Link href="/">
                  <Typography
                    variant="h5"
                    className="!text-6 font-Poppins uppercase dark:text-white text-black"
                  >
                    ELearning
                  </Typography>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIos className="text-black dark:text-[#ffffff]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Admin Info */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="Profile Photo"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid cyan",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  className="text-black !text-2xl !pt-4 dark:text-white"
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="h6"
                  className=" text-black !text-sm dark:text-white capitalize"
                >
                  ~ {user.role}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            marginLeft={isCollapsed ? "0px" : undefined}
          >
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className=" !text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>

            <Item
              title="Users"
              to="/admin/users"
              icon={<Group />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className=" !text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Content"}
            </Typography>

            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCall />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className=" !text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Customization"}
            </Typography>

            <Item
              title="Hero"
              to="/admin/hero"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<Quiz />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Categories"
              to="/admin/categories"
              icon={<Wysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className=" !text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Controllers"}
            </Typography>

            <Item
              title="Manage Teams"
              to="/admin/team"
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className=" !text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Analytics"}
            </Typography>

            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className=" !text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!isCollapsed && "Extras"}
            </Typography>

            <Item
              title="Settings"
              to="/admin/settings"
              icon={<Settings />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Logout"
              to="/"
              icon={<ExitToApp />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;