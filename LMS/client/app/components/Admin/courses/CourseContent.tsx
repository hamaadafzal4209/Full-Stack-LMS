import React, { FC, useState } from "react";

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
  handleSubmit:handleCourseSubmit,
}) => {

  const [isCollapsed,setIsCollapsed] = useState(
    Array(courseContentData.lenth).fill(false)
  )

  const [activeSection,setActiveSetion] = useState(1);

  const handleSubmit = (e:any) => {
    e.preventDefault();
  }
  
  return <div></div>;
};

export default CourseContent;
