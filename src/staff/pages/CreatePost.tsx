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

    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <SEO
        title={edit ? "Edit Research Opportunity" : "Create Research Opportunity"}
        description={edit ? "Edit Research Opportunity Page" : "Create Research Opportunity Page"}
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-10">
          {edit ? "Edit Research Opportunity" : "Create Research Opportunity"}
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 transition-all">
          <CreationForms edit={edit} />
        </div>

      </div>
      
    </div>

  );

}

