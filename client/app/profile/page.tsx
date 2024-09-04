"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Headings";
import Header from "../components/Layouts/Header";
import Protected from "../hooks/useProtected";
import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";

type Props = {};

const Page: FC<Props> = (Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("login");

  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      <Protected>
        <Heading
          title={`${user.name} - Profile`}
          description="Best learning platform to learn programming"
          keywords="MERN, MEAN, REDUX"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />
        <Profile user={user} />
      </Protected>
    </>
  );
};

export default Page;
