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
    return null;
  }

  return (
    <section className="min-h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SEO
        title={edit ? "Edit Research Opportunity" : "Create Research Opportunity"}
        description={edit ? "Edit Research Opportunity Page" : "Create Research Opportunity Page"}
      />

      <div className="w-11/12 md:w-9/12 mx-auto py-8">
        <h1 className="text-center my-8 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {edit ? "Edit Research Opportunity" : "Create Research Opportunity"}
        </h1>

        {/* subtle card so fields pop in dark mode */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <CreationForms edit={edit} />
        </div>
      </div>
    </section>
  );
}
