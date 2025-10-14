import React from "react";
import { Link } from "react-router-dom";
import { OpportunityList } from "../../types/opportunities.ts";

interface OpportunitiesListProps {
  opportunities: OpportunityList[];
}

export default function OpportunitiesList({ opportunities }: OpportunitiesListProps) {
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
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
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