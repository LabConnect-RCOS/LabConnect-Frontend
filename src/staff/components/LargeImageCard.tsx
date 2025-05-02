import React from "react";
import { Link } from "react-router-dom";

interface LargeImageCardProps {
  to: string;
  image: string;
  title: string;
}

const LargeImageCard = ({ to, image, title }: LargeImageCardProps) => {
  return (
    <Link to={to} className="no-underline">
      <div className="w-96 bg-base-100 transition card card-compact hover:shadow-lg duration-175">
        <figure>
          <img src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default LargeImageCard;
