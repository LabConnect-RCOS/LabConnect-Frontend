import React, { useEffect } from "react";
import { useState } from "react";
import JobPost from "./JobPost";
import JobDetails from "./JobDetails";
import fetchOpportunity from "../../fetches/fetchOpportunity.tsx";

interface PostsFieldProps {
  activeId: string;
  setActive: (val: string) => void;
  opportunities: object[];
}

const PostsField = ({ activeId, setActive, opportunities }: PostsFieldProps) => {
  const [opportunity, setOpportunity] = useState<string | opportunityData>("Searching");

  useEffect(() => {
    fetchOpportunity({setOpportunity, id: activeId});
  }, [activeId]);


  return (
    <div className="postsfield-header">
      <div className="col-span-2">
        {opportunities &&
          opportunities.map((job: Job) => {
            return (
              <JobPost
                active={job.id === activeId}
                onClick={setActive}
                key={job.id}
                {...job}
              />
            );
          })}
      </div>
      {opportunity === "Searching" ? (
        <span className="loading loading-spinner loading-lg" />
      ) : (opportunity === "Nothing found" || activeId == "") ? (
        <p>No post found</p>
      ) : (
        <JobDetails {...opportunity as opportunityData } />
      )}
    </div>
  );
};

export default PostsField;
