import React, { useEffect } from "react";
import { useState } from "react";
import JobPost from "./JobPost";
import JobDetails from "./JobDetails";
import PropTypes from "prop-types";


const PostsField = ({ activeId, setActive, opportunities }) => {
  const [activeOpportunity, setActiveOpportunity] = useState(null);

  const fetchOpportunity = async (id) => {
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
    fetchOpportunity(activeId);
  }, [activeId]);

  return (
    <div className="postsfield-header">
      <div className="col-span-2">
        {opportunities &&
          opportunities.map((job) => {
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

PostsField.propTypes = {
  activeId: PropTypes.string,
  setActive: PropTypes.func.isRequired,
  opportunities: PropTypes.array,
}

export default PostsField;
