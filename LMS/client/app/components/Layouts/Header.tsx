import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../../utils/NavItems";
import { ThemeSwitcher } from "../../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import CustomModal from "@/app/utils/CustomModal";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import Verification from "../Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../../public/assets/Profile.png";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/app/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, route, open, setOpen, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [isClient, setIsClient] = useState(false);

  const { data } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
      if (isSuccess) {
        toast.success("Login successful");
      }
      if (error && "data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data?.message || "An error occurred");
      }
    }
  }, [data, socialAuth, user, error, isSuccess]);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUserIconClick = () => {
    setOpen(true);
    setRoute("Login"); // Default to "Login", adjust as necessary
  };

  return (
    <>
      {/* Top header --- Navbar */}
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="flex items-center justify-between h-full w-full gap-4 px-[5%]">
          <div>
            <Link
              href="/"
              className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              ELearning
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <NavItems activeItem={activeItem} isMobile={false} />
            <ThemeSwitcher />
            <HiOutlineMenuAlt3
              size={25}
              className="block text-black dark:text-white md:hidden cursor-pointer"
              onClick={() => setOpenSidebar(!openSidebar)}
            />
            {isClient && user ? (
              <Link href="/profile">
                <Image
                  src={user.avatar || avatar.src}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </Link>
            ) : (
              <FaRegUserCircle
                size={25}
                className="text-black dark:text-white cursor-pointer"
                onClick={handleUserIconClick}
              />
            )}
          </div>
        </div>
        {openSidebar && (
          <NavItems
            activeItem={activeItem}
            isMobile={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        )}
      </div>

      {/* Form popup */}
      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}
      {route === "Verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </>
  );
};

export default Header;
