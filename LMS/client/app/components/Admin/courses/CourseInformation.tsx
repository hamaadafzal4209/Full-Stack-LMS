/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <label className={`${styles.label}`} htmlFor="name">
            Course Name
          </label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN Stack LMS Platform"
            className={styles.input}
          />
        </div>
        <br />
        <div>
          <label htmlFor="description" className={styles.label}>
            Course Description
          </label>
          <textarea
            name=""
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="description"
            placeholder="Write something amazing"
            className={`${styles.input} !py-2 !h-min`}
            cols={30}
            rows={8}
          />
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="w-full">
            <label htmlFor="price" className={styles.label}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="Write course Actual Price"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-full">
            <label htmlFor="estimatedPrice" className={styles.label}>
              Estimated Price (Optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="Write course Estimated Price"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 gap-6">
          <div className="w-full">
            <label htmlFor="tags" className={styles.label}>
              Course Tags
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN,LMS,TypeScript,Javascript"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label htmlFor="level" className={styles.label}>
              Level
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner, Intermediate, Advance"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-full">
            <label htmlFor="demoUrl" className={styles.label}>
              Demo Url
            </label>
            <input
              type="text"
              name=""
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[20vh] text-center cursor-pointer dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to the browser
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end mb-5">
          <button
            type="submit"
            className="w-full md:w-[180px] h-[40px] bg-cyan-400 text-center text-white rounded mt-8 cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
