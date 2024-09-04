"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Headings";
import Header from "./components/Layouts/Header";
import Hero from "./components/Home/Hero";
import CustomModel from "./utils/CustomModal";
import Login from "./components/Auth/Login";

interface Props {}

const Home: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login");

  return (
    <div>
      <Heading
        title="E-Learning"
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
      <Hero />
    </div>
  );
};

export default Home;
