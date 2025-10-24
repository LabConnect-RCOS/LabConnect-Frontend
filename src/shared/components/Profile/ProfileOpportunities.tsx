import React from "react";
import LargeTextCard from "../UIElements/LargeTextCard.tsx";
import { useState, useEffect } from "react";

export default function ProfileOpportunities({
  id,
  staff,
}: {
  id: string;
  staff: boolean;
}) {
  const [opportunities, setOpportunities] = useState<
    Array<{ id: string; title: string; due: string; pay: string; credits: string }> | null | "no response"
  >(null);

  useEffect(() => {
    async function setData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/${staff ? "staff" : "profile"}/opportunities/${id}`,
        { credentials: "include" }
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
    <div
      className="flex gap-2 flex-wrap

                 /* help any link/text inside cards in dark */
                 dark:[&_a]:text-sky-300
                 dark:[&_a:hover]:text-sky-200
                 dark:[&_p]:text-gray-200
                 dark:[&_small]:text-gray-400

                 /* if LargeTextCard renders a container with .card or a plain div,
                    these will gently lift background in dark without touching the card code */
                 dark:[&_.card]:bg-[#283548]
                 dark:[&_.card]:border-gray-700
                 dark:[&_.card:hover]:bg-[#2d3a4f]"
    >
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
    <div className="text-gray-900 dark:text-gray-100 transition-colors">
      <h1 className="pt-10 pb-2 text-xl font-semibold dark:text-gray-100">
        Posted Opportunities:
      </h1>

      {/* Loaded list */}
      {opportunities !== null && opportunities !== "no response" && opportunityList}

      {/* Loading / empty states */}
      {opportunities === null && (
        <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>
      )}
      {opportunities === "no response" && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          No Opportunities Found
        </p>
      )}
    </div>
  );
}
