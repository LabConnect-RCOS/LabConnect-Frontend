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
    <section className="min-h-[calc(100vh-8rem)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SEO
        title={edit ? "Edit Research Opportunity" : "Create Research Opportunity"}
        description={edit ? "Edit Research Opportunity Page" : "Create Research Opportunity Page"}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-center mb-8 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {edit ? "Edit Research Opportunity" : "Create Research Opportunity"}
        </h1>

        {/* Single clear card, same style as other pages */}
        <div
          className="
            rounded-2xl
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            shadow-lg
            px-6 py-8 md:px-10 md:py-10
          "
        >
          <CreationForms edit={edit} />
        </div>
      </div>
    </section>
  );
}
