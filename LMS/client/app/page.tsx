"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Headings";
import Header from "./components/Layouts/Header";
import Hero from "./components/Home/Hero";

interface Props {}

const Home: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading
        title="E-Learning"
        description="Best learning platform to learn programming"
        keywords="MERN, MEAN, REDUX"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero/>
    </div>
  );
};

export default Home;
