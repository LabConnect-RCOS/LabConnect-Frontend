import React from "react";
import { Link } from "react-router-dom";

interface LargeImageCardProps {
  to: string;
  image: string;
  title: string;
}

const LargeImageCard = ({ to, image, title }: LargeImageCardProps) => {
  return (
    <Link to={to} className="no-underline w-full h-full">
      <div className="h-full flex flex-col rounded-xl shadow-md overflow-hidden bg-white">

        {/* Fixed aspect ratio strictly for image */}
        <div className="w-full aspect-[16/9] overflow-hidden">
          <img
              src={image}
              alt={title}
              className="block w-full h-full object-cover object-top"
          />
        </div>

        {/* Fixed-height footer area for title */}
        <div className="p-4 text-center h-16 flex items-center justify-center">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

      </div>
    </Link>
  );
};

export default LargeImageCard;
