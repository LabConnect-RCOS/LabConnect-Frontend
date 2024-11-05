import React from "react";
import PropTypes from 'prop-types';
import CreationForms from "../components/CreationForms";
import './CreatePost.css';

const CreatePost = ({ edit }) => {
  return (
    <div className="createpost">
      <div>
        <h1>{edit === true ? "Edit Research Opportunity" : "Create Research Opportunity"}</h1>
        <CreationForms />
      </div>
    </div>
  );
};
CreatePost.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default CreatePost;