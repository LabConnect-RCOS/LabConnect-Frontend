import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OpportunityList } from "../../types/opportunities.ts";
import { getCookie } from "../../utils.ts";

interface OpportunitiesListProps {
  opportunities: OpportunityList[];
  dispatch: (action: {type: string, opportunities: OpportunityList[]}) => void;
}

export default function OpportunitiesList({ opportunities, dispatch }: OpportunitiesListProps) {

  const csrfToken = getCookie('csrf_access_token');

  function toggleSave(opportunity: OpportunityList) {
    console.log(opportunities)
    const updated = opportunities.map((item: OpportunityList) =>
      item.id === opportunity.id
        ? { ...item, saved: !item.saved }
        : item
    );
    console.log(updated)

    dispatch({
      type: "SET_OPPORTUNITIES",
      opportunities: updated,
    });
  }

  async function changeSavedOpportunity(opportunity: OpportunityList) {
    console.log("Current saved state:", opportunity.saved);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (csrfToken) headers["X-CSRF-TOKEN"] = csrfToken;

    const isSaving = !opportunity.saved;
    const endpoint = isSaving
      ? `${import.meta.env.VITE_BACKEND_SERVER}/saveOpportunity/${opportunity.id}`
      : `${import.meta.env.VITE_BACKEND_SERVER}/unsaveOpportunity/${opportunity.id}`;
    const method = isSaving ? "POST" : "DELETE";

    try {
      console.log(`Attempting to ${isSaving ? "save" : "unsave"} opportunity...`);

      const response = await fetch(endpoint, {
        method,
        credentials: "include",
        headers,
        body: JSON.stringify({}), // safe for POST, harmless for DELETE
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isSaving ? "save" : "unsave"} opportunity`);
      }

      console.log(`Successfully ${isSaving ? "saved" : "unsaved"} opportunity.`);
    } catch (error) {
      console.error(
        `Error ${isSaving ? "saving" : "unsaving"} opportunity:`,
        error
      );
    } finally {
      // Optimistically update local UI
      toggleSave(opportunity);
      console.log("Local save state toggled.");
    }
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* Column Headers */}
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Position</th>
              <th className="p-3 text-left border">Description</th>
              <th className="p-3 text-left border">Location</th>
              <th className="p-3 text-left border">Pay</th>
              <th className="p-3 text-left border">Credits</th>
              <th className="p-3 text-left border">Lab Managers</th>
              <th className="p-3 text-left border">Term</th>
              <th className="p-3 text-left border">View</th>
              <th className="p-3 text-left border">Save</th>
            </tr>
          </thead>
          <tbody>
            {/* Info about the opportunities */}
            {opportunities.length > 0 ? (
              opportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-50">
                  <td className="p-3 border font-medium">{opportunity.name}</td>
                  <td className="p-3 border">{opportunity.description}</td>
                  <td className="p-3 border">{opportunity.location}</td>
                  <td className="p-3 border">{opportunity.pay ? `$${opportunity.pay}/hr` : ""}</td>
                  <td className="p-3 border">{opportunity.credits}</td>
                  <td className="p-3 border">{opportunity.lab_managers}</td>
                  <td className="p-3 border">
                    {opportunity.semester} {opportunity.year}
                  </td>
                  <td className="p-3 border">
                    <Link to={`/post/${opportunity.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2">
                        View
                      </button>
                    </Link>
                  </td>
                  <td className="p-3 border">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => changeSavedOpportunity(opportunity)}>
                      {opportunity.saved ? "Unsave" : "Save"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-3 border text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};