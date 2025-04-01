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
  const [activeOpportunity, setActiveOpportunity] = useState(null);

  const fetchOpportunity = async (id: number) => {
    const url = `${process.env.REACT_APP_BACKEND_SERVER}/getOpportunity/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Error fetching opportunity");
      setActiveOpportunity(null);
    } else {
      let data = await response.json();
      data = data.data;
      setActiveOpportunity(data);
    }
  };

  useEffect(() => {
    fetchOpportunity(Number(activeId));
  }, [activeId]);

  interface jobType {
    id?: string;
  }

  return (
    <div className="postsfield-header">
      <div className="col-span-2">
        {opportunities &&
          opportunities.map((job: jobType) => {
            return (
              <JobPost
                active={job.id == activeId}
                onClick={setActive}
                key={job.id}
                {...job}
              />
            );
          })}
      </div>
      {activeId != "" && activeOpportunity && (
        <JobDetails {...activeOpportunity} />
      )}
      {(activeId === "" || !activeOpportunity) && "Opportunity not found."}
    </div>
  );
};

export default PostsField;
