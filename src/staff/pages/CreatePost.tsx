import React from "react";
import CreationForms from "../components/CreationForms.tsx";
import SEO from "../../shared/components/SEO.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

interface CreatePostProps {
  edit: boolean;
}

export default function CreatePost({ edit }: CreatePostProps) {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    window.location.href = "/login";
  }

  return (
    <div className="w-9/12 mx-auto">
      <SEO title={edit === true ? "Edit Research Opportunity" : "Create Research Opportunity"} description={edit === true ? "Edit Research Opportunity Page" : "Create Research Opportunity Page"} />
      <h1 className="text-center my-8 text-3xl font-bold">{edit === true ? "Edit Research Opportunity" : "Create Research Opportunity"}</h1>
      <CreationForms edit={edit} />
    </div>
  );
};
