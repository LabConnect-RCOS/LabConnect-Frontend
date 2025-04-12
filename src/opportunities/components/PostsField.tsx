import React, { useEffect } from "react";
import { useState } from "react";
import JobPost from "./JobPost";
import JobDetails from "./JobDetails";

interface PostsFieldProps {
  activeId: string;
  setActive: (val: string) => void;
  opportunities: object[];
}

const PostsField = ({ activeId, setActive, opportunities }: PostsFieldProps) => {
  const [opportunity, setOpportunity] = useState<string | getOpportunityData>("Searching");

  const fetchOpportunity = async (id: string) => {
    const url = `${process.env.REACT_APP_BACKEND_SERVER}/getOpportunity/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Error fetching opportunity");
      setOpportunity(null);
    } else {
      let data = await response.json();
      data = data.data;
      setOpportunity(data);
    }
  };

  useEffect(() => {
    fetchOpportunity(activeId);
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
      {activeId !== "" && opportunity  && (
        <JobDetails {...opportunity} />
      )}
      {(activeId === "" || !opportunity) && "Opportunity not found."}
    </div>
  );
};

export default PostsField;
