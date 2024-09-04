import { useUpdatePasswordMutation } from "@/app/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa"; // Loading spinner icon

const schema = Yup.object().shape({
  oldPassword: Yup.string().required("Please enter your old password"),
  newPassword: Yup.string().required("Please enter your new password").min(6),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [updatePassword, { isLoading, isSuccess, error }] =
    useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await updatePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }).unwrap();
      } catch (err) {
        console.error("Failed to update password:", err);
        toast.error("Failed to update password");
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
    }
    if (error && "data" in error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data?.message || "An unexpected error occurred.");
    }
  }, [error, isSuccess]);

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h1 className={`${styles.title} text-center`}>Change Password</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col relative">
          <label className="block text-black dark:text-white mb-1">
            Old Password
          </label>
          <input
            type={showPassword.oldPassword ? "text" : "password"}
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            placeholder="Old password"
            className={`${formik.errors.oldPassword && formik.touched.oldPassword && "border-red-500"} ${styles.input}`}
          />
          {formik.errors.oldPassword && formik.touched.oldPassword && (
            <span className="text-red-500 pt-0.5 block">
              {formik.errors.oldPassword}
            </span>
          )}
          {showPassword.oldPassword ? (
            <AiOutlineEye
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() =>
                setShowPassword({ ...showPassword, oldPassword: false })
              }
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() =>
                setShowPassword({ ...showPassword, oldPassword: true })
              }
            />
          )}
        </div>
        <div className="flex flex-col relative">
          <label className="block text-black dark:text-white mb-1">
            New Password
          </label>
          <input
            type={showPassword.newPassword ? "text" : "password"}
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            placeholder="New password"
            className={`${formik.errors.newPassword && formik.touched.newPassword && "border-red-500"} ${styles.input}`}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <span className="text-red-500 pt-0.5 block">
              {formik.errors.newPassword}
            </span>
          )}
          {showPassword.newPassword ? (
            <AiOutlineEye
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() =>
                setShowPassword({ ...showPassword, newPassword: false })
              }
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() =>
                setShowPassword({ ...showPassword, newPassword: true })
              }
            />
          )}
        </div>
        <div className="flex flex-col relative">
          <label className="block text-black dark:text-white mb-1">
            Confirm Password
          </label>
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirm password"
            className={`${formik.errors.confirmPassword && formik.touched.confirmPassword && "border-red-500"} ${styles.input}`}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className="text-red-500 pt-0.5 block">
              {formik.errors.confirmPassword}
            </span>
          )}
          {showPassword.confirmPassword ? (
            <AiOutlineEye
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() =>
                setShowPassword({ ...showPassword, confirmPassword: false })
              }
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute top-10 right-2 z-1 cursor-pointer text-gray-800 dark:text-white"
              size={20}
              onClick={() =>
                setShowPassword({ ...showPassword, confirmPassword: true })
              }
            />
          )}
        </div>
        <button
          type="submit"
          className="relative mt-4 inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 disabled:bg-opacity-75"
          disabled={isLoading}
        >
          <span className="relative w-full px-10 py-2.5 text-[17px] transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {isLoading ? (
              <FaSpinner className="animate-spin text-center w-full" />
            ) : (
              "Update Password"
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
