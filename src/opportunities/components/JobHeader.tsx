import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar.tsx";

const JobHeader = ({ title, img, author}: { title: string, img: string, author: string }) => {
  return (
    <section className="job-header-header">
      <h2 className="job-header-title">{title}</h2>
      <Avatar img={img} name={author} />
    </section>
  );
};

export default JobHeader;
