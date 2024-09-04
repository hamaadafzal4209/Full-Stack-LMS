import { styles } from "@/app/styles/style";
import { AddCircle } from "@mui/icons-material";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handlePrev = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      benefits.every((benefit) => benefit.title.trim() !== "") &&
      prerequisites.every((prerequisite) => prerequisite.title.trim() !== "")
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div>
      {/* Benefits */}
      <div>
        <label htmlFor="benefit" className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course?
        </label>
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={`benefit-${index}`}
            name="benefits"
            className={`${styles.input} my-2`}
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
          className="text-black dark:text-white"
        />
      </div>

      {/* Prerequisites */}
      <div>
        <label
          htmlFor="prerequisites"
          className={`${styles.label} text-[20px]`}
        >
          What are the prerequisites for this course?
        </label>
        {prerequisites.map((prerequisite, index) => (
          <input
            type="text"
            key={`prerequisite-${index}`}
            className={`${styles.input} my-2`}
            placeholder="You need basic knowledge of MERN stack"
            required
            name="prerequisites"
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
          className="text-black dark:text-white"
        />
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-10 bg-cyan-500 text-white text-center mt-8 rounded cursor-pointer"
          onClick={handlePrev}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-10 bg-cyan-500 text-white text-center mt-8 rounded cursor-pointer"
          onClick={handleNext}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;