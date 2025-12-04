import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { Opportunity } from "../../types/opportunity.ts";
import { getCookie } from "../../utils.ts";

export default function SavedPage() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    window.location.href = "/login";
  }

  const [saved, setSaved] = useState<Opportunity[] | null>(null);

  const csrfToken = getCookie("csrf_access_token");

  const fetchSaved = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/savedOpportunities`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Saved not found");
      }

      const data = await response.json();
      setSaved(data);
    } catch {
      console.log("Error fetching saved");
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <section className="w-full px-4 py-8 md:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center my-4 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Saved Opportunities
        </h1>

        {saved === null && (
          <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        )}

        {saved !== null && (
          <div className="mt-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            {saved.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                You don’t have any saved opportunities yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm md:text-base">
                  <thead className="top-0 z-10">
                    <tr className="bg-gray-100 dark:bg-gray-800/80 backdrop-blur">
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Name
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Description
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Recommended Experience
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Pay
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Credits
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Semester
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Year
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Application Due
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Location
                      </th>
                      <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
                        Unsave
                      </th>
                    </tr>
                  </thead>

                  <tbody className="[&_tr:nth-child(even)]:bg-transparent dark:[&_tr:nth-child(even)]:bg-gray-800/30">
                    {saved.map((opportunity) => {
                      const today = new Date();
                      const dueDate = new Date(opportunity.application_due);
                      const oneWeek = 7 * 24 * 60 * 60 * 1000;

                      let dueClass =
                        "p-3 border border-gray-300 dark:border-gray-600";
                      if (dueDate < today) {
                        dueClass += " text-red-500 font-semibold";
                      } else if (
                        dueDate.getTime() - today.getTime() <= oneWeek
                      ) {
                        dueClass += " text-orange-400 font-semibold";
                      }

                      return (
                        <tr
                          key={opportunity.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                        >
                          <td className="p-3 border border-gray-300 dark:border-gray-600 font-medium">
                            {opportunity.name}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            {opportunity.description}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            {opportunity.recommended_experience}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            {opportunity.pay
                              ? `$${opportunity.pay}/hr`
                              : ""}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            {opportunity.credits}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            {opportunity.semester}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            {opportunity.year}
                          </td>
                          <td className={dueClass}>
                            {new Date(
                              opportunity.application_due
                            ).toLocaleDateString("en-US")}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            {opportunity.location}
                          </td>
                          <td className="p-3 border border-gray-300 dark:border-gray-600">
                            <button
                              className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              onClick={async () => {
                                try {
                                  const headers: Record<string, string> = {
                                    "Content-Type": "application/json",
                                  };
                                  if (csrfToken) {
                                    headers["X-CSRF-TOKEN"] = csrfToken;
                                  }

                                  const response = await fetch(
                                    `${import.meta.env
                                      .VITE_BACKEND_SERVER}/unsaveOpportunity/${
                                      opportunity.id
                                    }`,
                                    {
                                      method: "DELETE",
                                      credentials: "include",
                                      headers,
                                    }
                                  );

                                  if (!response.ok) {
                                    throw new Error("Failed to unsave");
                                  }

                                  setSaved((prev) =>
                                    prev
                                      ? prev.filter(
                                          (o) => o.id !== opportunity.id
                                        )
                                      : prev
                                  );
                                } catch {
                                  console.log(
                                    "Error unsaving opportunity"
                                  );
                                }
                              }}
                            >
                              Unsave
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
