import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar.tsx";

interface JobHeaderProps {
  title: string;
  img: string;
  author: string;
}

const JobHeader = ({ title, img, author}: JobHeaderProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-bold text-5xl">{title}</h2>
      <Avatar img={img} name={author} />
    </section>
  );
};

export default JobHeader;
