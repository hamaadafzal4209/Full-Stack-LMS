import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollaped = [...isCollapsed];
    updatedCollaped[index] = !updatedCollaped[index];
    setIsCollapsed(updatedCollaped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.splice(index, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  const newContentHandler = () => {
    const lastItem = courseContentData[courseContentData.length - 1];

    if (
      lastItem.title === "" ||
      lastItem.description === "" ||
      lastItem.videoUrl === "" ||
      lastItem.links[0].title === "" ||
      lastItem.links[0].url === ""
    ) {
      toast.error("Please fill all the fields before adding new content");
    } else {
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: lastItem.videoSection || "Untitled Section",
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all fields");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}
            >
              {showSectionInput && (
                <>
                  <div className="flex items-center w-full mb-2">
                    <input
                      type="text"
                      className={`text-lg ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                      value={item.videoSection}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].videoSection = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                    <BsPencil className="cursor-pointer text-black dark:text-white" />
                  </div>
                </>
              )}
              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] ? (
                  <>
                    {item.title ? (
                      <p className="font-Poppins text-black dark:text-white">
                        {index + 1}. {item.title}
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {/* arrow button to collapse video content */}

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-lg mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                    onClick={() => {
                      if (index > 0) {
                        const updateData = [...courseContentData];
                        updateData.splice(index, 1);
                        setCourseContentData(updateData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    size={20}
                    className="text-black dark:text-white cursor-pointer"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label htmlFor="" className={`${styles.label}`}>
                      Vedio Title
                    </label>
                    <input
                      type="text"
                      placeholder="Project Plan... "
                      className={`${styles.input}`}
                      value={item.title}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].title = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="" className={`${styles.label}`}>
                      Vedio Url
                    </label>
                    <input
                      type="text"
                      placeholder="hdjhsdjks "
                      className={`${styles.input}`}
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].videoUrl = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="" className={`${styles.label}`}>
                      Vedio Description
                    </label>
                    <textarea
                      rows={8}
                      cols={30}
                      placeholder="hdjhsdjks "
                      className={`${styles.input} !h-min py-2`}
                      value={item.description}
                      onChange={(e) => {
                        const updateData = [...courseContentData];
                        updateData[index].description = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    ></textarea>
                    <br />
                    <div>
                      {item?.links.map((link: any, linkIndex: number) => (
                        <div className="mb-3 block" key={linkIndex}>
                          <div className="w-full flex items-center justify-between mt-4">
                            <label htmlFor="" className={`${styles.label}`}>
                              Link {linkIndex + 1}
                            </label>
                            <AiOutlineDelete
                              className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"} text-black dark:text-white text-[20px]`}
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex)
                              }
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Source Code... (Link Title)"
                            className={`${styles.input}`}
                            value={link.title}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].title =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Source Code Url... (Link Url)"
                            className={`${styles.input} mt-4`}
                            value={link.url}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updateData);
                            }}
                          />
                        </div>
                      ))}
                      {/* add link button */}
                      <div className="inline-block mb-4 bg-indigo-800 px-4 py-2 rounded-md">
                        <p
                          className="flex items-center text-white cursor-pointer"
                          onClick={() => handleAddLink(index)}
                        >
                          <BsLink45Deg className="mr-1" size={20} />
                          <span className="text-lg">Add Link</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* add new content */}
              {index === courseContentData.length - 1 && (
                <div className="inline-block mt-4 bg-indigo-950 px-4 py-2 rounded-md cursor-pointer">
                  <p
                    className="flex items-center text-white cursor-pointer"
                    onClick={() => newContentHandler()}
                  >
                    <AiOutlinePlusCircle className="mr-1" size={20} />
                    <span className="text-lg">Add New Content</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div className="inline-block mt-4 bg-indigo-950 px-4 py-2 rounded-md cursor-pointer">
          <p
            className="flex items-center text-white cursor-pointer"
            onClick={() => addNewSection()}
          >
            <AiOutlinePlusCircle className="mr-1" size={20} />
            <span className="text-lg">Add New Section</span>
          </p>
        </div>
      </form>
      <div className="flex w-full items-center justify-between mt-4 gap-4">
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

export default CourseContent;
