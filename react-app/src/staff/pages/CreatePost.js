import React from "react";
import CreationForms from "../components/CreationForms";
import './CreatePost.css';

const CreatePost = ({edit}) => {
  return (
    <div className="createpost">
      <div>
        <h1>{edit===true ? "Edit Research Opportunity" : "Create Research Opportunity"}</h1>
        <CreationForms />
      </div>
    </div>
  );
};

export default CreatePost;
