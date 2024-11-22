import React from "react";
import LargeTextCard from "../UIElements/LargeTextCard.tsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext.tsx";

export default function ProfileOpportunities({ id, staff }: { id: string, staff: boolean }) {
  const { auth } = useAuth();
  const [opportunities, setOpportunities] = useState<Array<{ id: string; title: string; due: string; pay: string; credits: string }> | null | "no response">(null);

  useEffect(() => {
    async function setData() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/${staff ? "staff" : "profile"}/opportunities/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
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
  }, [auth.token, id, staff]);

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
