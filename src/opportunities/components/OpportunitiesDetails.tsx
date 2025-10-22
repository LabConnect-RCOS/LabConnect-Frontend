import React from "react";
import { Link } from "react-router-dom";
import { OpportunityList } from "../../types/opportunities.ts";

interface OpportunitiesListProps {
  opportunities: OpportunityList[];
}

export default function OpportunitiesList({ opportunities }: OpportunitiesListProps) {
  return (
    <div className="p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="top-0 z-10">
            <tr className="bg-gray-100 dark:bg-gray-800/80 backdrop-blur">
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Position</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Description</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Location</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Pay</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Credits</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Lab Managers</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Term</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">View</th>
              <th className="p-3 text-left border border-gray-300 dark:border-gray-600">Save</th>
            </tr>
          </thead>

          <tbody className="[&_tr:nth-child(even)]:bg-transparent dark:[&_tr:nth-child(even)]:bg-gray-800/30">
            {opportunities.length > 0 ? (
              opportunities.map((opportunity) => (
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
                    {opportunity.location}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    {opportunity.pay ? `$${opportunity.pay}/hr` : ""}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    {opportunity.credits}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    {opportunity.lab_managers}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    {opportunity.semester} {opportunity.year}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    <button
                      className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-1 rounded
                                 hover:bg-blue-700 dark:hover:bg-blue-800
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    <button
                      className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-1 rounded
                                 hover:bg-blue-700 dark:hover:bg-blue-800
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {opportunity.saved ? "Unsave" : "Save"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="p-3 border border-gray-300 dark:border-gray-600 text-center text-gray-500 dark:text-gray-400"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
