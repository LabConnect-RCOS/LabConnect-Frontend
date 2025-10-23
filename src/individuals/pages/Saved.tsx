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

    const [saved, setSaved] = useState<null | Opportunity[]>(null);

    const csrfToken = getCookie('csrf_access_token');

    const fetchSaved = async () => {
        try {
            const response = await fetch(
<<<<<<< HEAD
<<<<<<< HEAD
                `${import.meta.env.VITE_BACKEND_SERVER}/savedOpportunities`, {
=======
                `${process.env.REACT_APP_BACKEND_SERVER}/savedOpportunities`, {
>>>>>>> 608bbc4 (Create page to show saved opportunities (#165))
=======
                `${import.meta.env.VITE_BACKEND_SERVER}/savedOpportunities`, {
>>>>>>> 40a1bab (Fix ENV vars (#166))
                credentials: "include",
            }
            );

            if (!response.ok) {
                throw new Error("Saved not found");
            }

            const data = await response.json();
            setSaved(data);
            console.log(data);
        } catch {
            console.log("Error fetching saved");
        }
    }

    useEffect(() => {
        fetchSaved();
    }, []);

    return (
        <section className="center container-xl">
            <h1 className="text-center my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Saved Opportunities
            </h1>
            {!saved && "Loading..."}
            {saved && (
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Recommended Experience</th>
                        <th>Pay</th>
                        <th>Credits</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Application Due</th>
                        <th>Location</th>
                        <th>Unsave</th>
                    </tr>
                    {saved.map((opportunity) => (
                        <tr key={opportunity.id}>
                            <td>{opportunity.name}</td>
                            <td>{opportunity.description}</td>
                            <td>{opportunity.recommended_experience}</td>
                            <td>{opportunity.pay}</td>
                            <td>{opportunity.credits}</td>
                            <td>{opportunity.semester}</td>
                            <td>{opportunity.year}</td>
                            <td style={{
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
                            <td>{opportunity.location}</td>
                            <td>
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
<<<<<<< HEAD
<<<<<<< HEAD
                                                `${import.meta.env.VITE_BACKEND_SERVER}/unsaveOpportunity/${opportunity.id}`, {
=======
                                                `${process.env.REACT_APP_BACKEND_SERVER}/unsaveOpportunity/${opportunity.id}`, {
>>>>>>> 608bbc4 (Create page to show saved opportunities (#165))
=======
                                                `${import.meta.env.VITE_BACKEND_SERVER}/unsaveOpportunity/${opportunity.id}`, {
>>>>>>> 40a1bab (Fix ENV vars (#166))
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
                    ))}
                </table>
            )}
        </section>
    );
};
