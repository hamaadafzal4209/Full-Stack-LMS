import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import React, { FC, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const [rating, setRating] = useState<number>(2.5);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] mx-auto mb-5 text-black dark:text-white">
      <div className="w-full relative bg-white dark:bg-[#121212] p-6 rounded-lg shadow-lg">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center mt-5">
          <h1 className="text-[30px] font-semibold">
            {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}
          </h1>
          {courseData?.estimatedPrice > courseData?.price && (
            <>
              <h5 className="pl-3 text-[20px] line-through opacity-80">
                ${courseData?.estimatedPrice}
              </h5>
              <h4 className="pl-5 text-[22px] text-green-500">
                {discountPercentagePrice}% Off
              </h4>
            </>
          )}
        </div>

        <div className="flex items-center mt-4">
          <button
            className={`${styles.button} !w-[180px] !bg-red-600 cursor-not-allowed`}
            disabled
          >
            Buy Now {courseData?.price}$
          </button>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Discount code..."
            className={`${styles.input} w-[50%] ml-3`}
          />
          <button
            className={`${styles.button} !w-[120px] ml-4`}
          >
            Apply
          </button>
        </div>

        <ul className="mt-4 space-y-2 text-lg">
          <li>• Source code included</li>
          <li>• Full lifetime access</li>
          <li>• Certificate of completion</li>
          <li>• Premium Support</li>
        </ul>
      </div>

      <div className="w-full mt-10">
        <h1 className="text-[25px] font-bold">{courseData?.name}</h1>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center">
            <Ratings value={rating} onChange={handleRatingChange} />
            <h5 className="ml-3">0 Reviews</h5>
          </div>
          <h5>0 Students</h5>
        </div>

        <div className="mt-10">
          <h1 className="text-[25px] font-bold">What you will learn from this course?</h1>
          {courseData?.benefits?.map((item: any, index: number) => (
            <div className="flex items-center py-2" key={index}>
              <IoCheckmarkDoneOutline className="text-green-500 mr-2" size={20} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h1 className="text-[25px] font-bold">What are the prerequisites for starting this course?</h1>
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div className="flex items-center py-2" key={index}>
              <IoCheckmarkDoneOutline className="text-green-500 mr-2" size={20} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h1 className="text-[25px] font-bold">Course Details</h1>
          <p className="text-[18px] mt-4 whitespace-pre-line">{courseData?.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10">
        <button
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-white rounded hover:bg-[#2d8c7f]"
          onClick={prevButton}
        >
          Prev
        </button>
        <button
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-white rounded hover:bg-[#2d8c7f]"
          onClick={createCourse}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
