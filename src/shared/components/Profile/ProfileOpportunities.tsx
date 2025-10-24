import React from "react";
import LargeTextCard from "../UIElements/LargeTextCard.tsx";
import { useState, useEffect } from "react";

export default function ProfileOpportunities({ id, staff }: { id: string, staff: boolean }) {
  const [opportunities, setOpportunities] = useState<Array<{ id: string; title: string; due: string; pay: string; credits: string }> | null | "no response">(null);

  useEffect(() => {
    async function setData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/${staff ? "staff" : "profile"}/opportunities/${id}`, {
        credentials: "include",
      }
      );

      if (response.ok) {
        const data = await response.json();
        setOpportunities(data);
      } else {
        setOpportunities("no response");
      }
    }

    setData();
  }, [id, staff]);

  const opportunityList = (
    <div className="flex gap-2 flex-wrap">
      {id &&
        Array.isArray(opportunities) &&
        opportunities.map((opportunity) => (
          <LargeTextCard
            to={`/post/${opportunity.id}`}
            title={opportunity.title}
            due={opportunity.due}
            pay={opportunity.pay}
            credits={opportunity.credits}
            key={opportunity.id}
          />
        ))}
    </div>
  );

return (
  <div className="bg-white shadow-md rounded-2xl p-6 mt-4">
    <h1 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">
      {staff ? "Posted Opportunities" : "Your Opportunities"}
    </h1>

    {opportunities === null && (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    )}

    {Array.isArray(opportunities) && opportunities.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {opportunities.map((opportunity) => (
          <LargeTextCard
            to={`/post/${opportunity.id}`}
            title={opportunity.title}
            due={opportunity.due}
            pay={opportunity.pay}
            credits={opportunity.credits}
            key={opportunity.id}
          />
        ))}
      </div>
    )}

    {opportunities === "no response" && (
      <div className="text-gray-500 text-center py-6">
        No Opportunities Found
      </div>
    )}
  </div>
);
};
