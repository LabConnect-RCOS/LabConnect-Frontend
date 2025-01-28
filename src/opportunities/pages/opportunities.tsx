import React from "react";
import OpportunitiesList from "../components/opportunitiesDetails.tsx";
import SEO from "../../shared/components/SEO.tsx";
import { useAuth } from "../../context/AuthContext.tsx";


export default function Opportunities() {

  return (
    <div className="w-9/12 mx-auto">
        <OpportunitiesList></OpportunitiesList>
    </div>
  );
};
