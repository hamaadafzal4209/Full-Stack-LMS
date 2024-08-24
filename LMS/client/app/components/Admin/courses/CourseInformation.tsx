import { styles } from "@/app/styles/style";
import Image from "next/image";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  courseInfo: {
    name: string;
    description: string;
    price: string;
    estimatedPrice?: string;
    tags: string;
    level: string;
    demoUrl?: string;
    thumbnail?: string;
  };
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if thumbnail is provided
    if (!courseInfo.thumbnail) {
      toast.error("Please upload a thumbnail image.");
      return;
    }
    setActive(active + 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          setCourseInfo({
            ...courseInfo,
            thumbnail: e.target?.result as string,
          });
        }
      };
      reader.onerror = () => toast.error("Error reading file.");
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setCourseInfo({ ...courseInfo, thumbnail: e.target?.result as string });
      };
      reader.onerror = () => toast.error("Error reading file.");
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
            type="text"
            name="name"
            required
            value={courseInfo.name}
            onChange={(e) =>
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
            name="description"
            required
            value={courseInfo.description}
            onChange={(e) =>
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
              name="price"
              required
              value={courseInfo.price}
              onChange={(e) =>
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
              name="estimatedPrice"
              value={courseInfo.estimatedPrice || ""}
              onChange={(e) =>
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
              name="tags"
              required
              value={courseInfo.tags}
              onChange={(e) =>
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
              name="level"
              required
              value={courseInfo.level}
              onChange={(e) =>
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
              name="demoUrl"
              value={courseInfo.demoUrl || ""}
              onChange={(e) =>
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
              <Image
                src={courseInfo.thumbnail}
                alt="thumbnail"
                className="max-h-full w-full object-cover"
                width={100}
                height={100}
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
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
