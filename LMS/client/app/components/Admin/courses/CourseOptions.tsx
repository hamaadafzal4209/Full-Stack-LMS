import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="sticky top-20">
      {options.map((option: any, index: number) => (
        <div className={`w-full flex items-center py-5`} key={index}>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              active + 1 > index
                ? "bg-blue-500"
                : "bg-gray-300 dark:bg-[#384766]"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px] text-white" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[40px] w-1 ${
                  active + 1 > index
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-[#384766]"
                } bottom-[-110%]`}
              />
            )}
          </div>
          <h5
            className={`px-2 ${
              active === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            }`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
