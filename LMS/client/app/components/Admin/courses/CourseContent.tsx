import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
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
                        {item + 1}. {item.title}
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
                    fontSize="large"
                    className="text-black dark:text-white"
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
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default CourseContent;
