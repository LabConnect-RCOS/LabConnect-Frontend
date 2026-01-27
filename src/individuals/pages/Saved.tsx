import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { Opportunity } from "../../types/opportunity.ts";
import { getCookie } from "../../utils.ts";

export default function SavedPage() {
    const { auth } = useAuth();

    if (!auth.isAuthenticated) {
        window.location.href = "/login";
    }

    const [saved, setSaved] = useState<Opportunity[] | null>(null);

    const csrfToken = getCookie('csrf_access_token');

    const fetchSaved = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_SERVER}/savedOpportunities`, {
                credentials: "include",
            }
            );

            if (!response.ok) {
                throw new Error("Saved not found");
            }

            const data = await response.json();
            setSaved(data);
        } catch {
            console.error("Error fetching saved opportunities");
            setSaved([]);
        }
        console.log(saved)
    }

    useEffect(() => {
        fetchSaved();
    }, []);
    return (
        <div className="p-4">
            <div className="overflow-x-auto">
            {(saved === null) ? "Loading..." : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left border">Name</th>
                            <th className="p-3 text-left border">Description</th>
                            <th className="p-3 text-left border">Recommended Experience</th>
                            <th className="p-3 text-left border">Pay</th>
                            <th className="p-3 text-left border">Credits</th>
                            <th className="p-3 text-left border">Semester</th>
                            <th className="p-3 text-left border">Year</th>
                            <th className="p-3 text-left border">Application Due</th>
                            <th className="p-3 text-left border">Location</th>
                            <th className="p-3 text-left border">Unsave</th>
                        </tr>
                    </thead>
                    <tbody>
                      {saved.length > 0 ? 
                        (saved.map((opportunity) => (
                          <tr key={opportunity.id}>
                              <td className="p-3 border font-medium">{opportunity.name}</td>
                              <td className="p-3 border">{opportunity.description}</td>
                              <td className="p-3 border">{opportunity.recommended_experience}</td>
                              <td className="p-3 border">{opportunity.pay}</td>
                              <td className="p-3 border">{opportunity.credits}</td>
                              <td className="p-3 border">{opportunity.semester}</td>
                              <td className="p-3 border">{opportunity.year}</td>
                              <td className="p-3 border border-black" style={{
                                  color: (() => {
                                      const today = new Date();
                                      const dueDate = new Date(opportunity.application_due);
                                      const oneWeek = 7 * 24 * 60 * 60 * 1000;

                                      if (dueDate < today) {
                                          return "red";
                                      } else if (dueDate.getTime() - today.getTime() <= oneWeek) {
                                          return "orange";
                                      } else {
                                          return "black";
                                      }
                                  })()
                              }}>
                                  {new Date(opportunity.application_due).toLocaleDateString("en-US")}
                              </td>
                              <td className="p-3 border">{opportunity.location}</td>
                              <td className="p-3 border">
                                  <button className="p-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      onClick={async () => {
                                          try {
                                              const headers: Record<string, string> = {
                                                  "Content-Type": "application/json", // Good practice for cross-origin requests
                                              };
                                              if (csrfToken) {
                                                  headers["X-CSRF-TOKEN"] = csrfToken;          // Include the token only when defined
                                              }

                                              const response = await fetch(
                                                  `${import.meta.env.VITE_BACKEND_SERVER}/unsaveOpportunity/${opportunity.id}`, {
                                                  method: "DELETE",
                                                  credentials: "include",
                                                  headers,
                                              });

                                              if (!response.ok) {
                                                  throw new Error("Failed to unsave");
                                              }

                                              setSaved(prev => prev ? prev.filter(o => o.id !== opportunity.id) : prev);
                                          } catch {
                                              console.log("Error unsaving opportunity");
                                          }
                                      }}
                                  >
                                      Unsave
                                  </button>
                              </td>
                          </tr>
                        ))) : (
                        <tr>
                          <td colSpan={10} className="p-3 border text-center">
                            No saved opportunities found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
};
