import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { Opportunity } from "../../types/opportunity.ts";

export default function SavedPage() {
    const { auth } = useAuth();

    if (!auth.isAuthenticated) {
        window.location.href = "/login";
    }

    const [saved, setSaved] = useState<null | Opportunity[]>(null);

    const fetchSaved = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_SERVER}/savedOpportunities`, {
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
        setSaved([{
            id: "1",
            name: "Test Opportunity",
            description: "This is a test opportunity",
            recommended_experience: "None",
            pay: 0,
            credits: "0",
            semester: "Fall",
            year: 2021,
            application_due: "2025-03-14",
            active: true,
            location: "Remote",
        },
        {
            id: "2",
            name: "Test Opportunity2",
            description: "This is a test opportunity",
            recommended_experience: "None",
            pay: 0,
            credits: "0",
            semester: "Fall",
            year: 2021,
            application_due: "2025-03-31",
            active: true,
            location: "Remote",
        },
        {
            id: "3",
            name: "Test Opportunity3",
            description: "This is a test opportunity",
            recommended_experience: "None",
            pay: 0,
            credits: "0",
            semester: "Fall",
            year: 2021,
            application_due: "2025-02-14",
            active: true,
            location: "Remote",
        }]);
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
                                            const response = await fetch(
                                                `${process.env.REACT_APP_BACKEND_SERVER}/deleteSaveOpportunity/${opportunity.id}`, {
                                                method: "DELETE",
                                                credentials: "include",
                                            });

                                            if (!response.ok) {
                                                throw new Error("Failed to unsave");
                                            }

                                            fetchSaved();
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
