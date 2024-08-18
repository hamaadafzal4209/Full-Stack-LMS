"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "../../../app/styles/style";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

type Props = {
  setOpen: (open: boolean) => void;
  setRoute?: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const SignUp: FC<Props> = ({ setRoute = () => {}, setOpen }) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      // console.log(name, email, password);
      setRoute("Verification");
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full px-2 h-auto">
      <h1 className={`${styles.title}`}>Sign Up with Elearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="name">
            Enter your name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Your name"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>

        <div className="w-full mt-4 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your email address
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-4 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password@#!&"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute top-11 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute top-11 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>

        <br />
        <h5 className="text-center font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="grid grid-cols-2 my-3 gap-2">
          <div className="flex items-center justify-center cursor-pointer py-2 dark:bg-gray-100 rounded-md border-2 border-black dark:border-white">
            <FcGoogle size={30} className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-center cursor-pointer py-2 dark:bg-gray-100 rounded-md border-2 border-black dark:border-white">
            <AiFillGithub size={30} className="cursor-pointer" />
          </div>
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px] dark:text-white text-black">
          {"Already have an account?"}{" "}
          <span
            className="dark:text-[#2190ff] pl-1 cursor-pointer hover:underline text-blue-700"
            onClick={() => setRoute && setRoute("Login")}
          >
            Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
