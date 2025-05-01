import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar.tsx";

interface JobHeaderProps {
  title: string;
  img: string;
  author: string;
  department: string;
}

const JobHeader = ({ title, img, author, department }: JobHeaderProps) => {
  return (
    <section className="job-header-header">
      <h2 className="job-header-title">{title}</h2>
      <Avatar img={img} name={author} role={department} />
    </section>
  );
};

export default JobHeader;
