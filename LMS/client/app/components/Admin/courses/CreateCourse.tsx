"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/app/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const CreateCourse: React.FC<Props> = () => {
  const [createCourse, { isLoading, error, isSuccess }] =
    useCreateCourseMutation();
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestions: "",
    },
  ]);
  const [courseData, setCourseData] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
      router.push("/admin/courses");
    } else if (error && "data" in error) {
      const errorData = (error as any).data;
      toast.error(errorData?.message || "Something went wrong!");
    }
  }, [error, isSuccess, router]);

  const handleSubmit = async () => {
    // Validate required fields
    const missingFields = [];
    if (!courseInfo.name) missingFields.push("name");
    if (!courseInfo.description) missingFields.push("description");
    if (!courseInfo.categories) missingFields.push("categories");
    if (!courseInfo.price) missingFields.push("price");
    if (!courseInfo.tags) missingFields.push("tags");
    if (!courseInfo.level) missingFields.push("level");

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prereq) => ({
      title: prereq.title,
    }));

    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoLength: courseContent.videoLength,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestions: courseContent.suggestions,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideo: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
    setActive(active + 1); // Proceed to the next step only if all fields are valid
  };

  const handleCourseCreate = async () => {
    if (!isLoading) {
      try {
        await createCourse(courseData).unwrap();
        toast.success("Course created successfully!");
      } catch (error: any) {
        toast.error(error?.data?.message || "Course creation failed");
      }
    }
  };

  console.log(courseData);

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-full lg:w-[80%] px-6 xl:px-12 mb-20">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="lg:w-[20%] w-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
