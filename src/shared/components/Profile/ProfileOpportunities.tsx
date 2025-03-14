import React from "react";
import LargeTextCard from "../UIElements/LargeTextCard.tsx";
import { useState, useEffect } from "react";

export default function ProfileOpportunities({ id, staff }: { id: string, staff: boolean }) {
  const [opportunities, setOpportunities] = useState<Array<{ id: string; title: string; due: string; pay: string; credits: string }> | null | "no response">(null);

  useEffect(() => {
    async function setData() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/${staff ? "staff" : "profile"}/opportunities/${id}`, {
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
    <div>
      <h1>Posted Opportunties</h1>
      {opportunities !== null ? opportunityList : "Loading..."}
      {opportunities === "no response" && "No Opportunities Found"}
    </div>
  );
};
