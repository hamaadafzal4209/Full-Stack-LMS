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

  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedBenefits = [...prerequisites];
    updatedBenefits[index].title = value;
    setPrerequisites(updatedBenefits);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1].title !== "" &&
      prerequisites[prerequisites.length - 1].title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div>
      {/* benefits */}
      <div>
        <label htmlFor="benefit" className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course?
        </label>
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
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
      {/* prerequisites */}
      <div>
        <label htmlFor="benefit" className={`${styles.label} text-[20px]`}>
          What are the prerequisites for this course?
        </label>
        {prerequisites.map((prerequisites, index) => (
          <input
            type="text"
            key={index}
            className={`${styles.input} my-2`}
            placeholder="You need basic knowledge of MERN stck"
            required
            name="prerequisites"
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
          className="text-black dark:text-white"
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-10 bg-cyan-500 text-white text-center mt-8 rounded cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-10 bg-cyan-500 text-white text-center mt-8 rounded cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
