import React from "react";
import PropTypes from 'prop-types';
import CreationForms from "../components/CreationForms.tsx";
import SEO from "../../shared/components/SEO.tsx";

const CreatePost = ({ edit, authenticated }) => {
  if (!authenticated[1]) {
    window.location.href = "/login";
  }

  return (
    <div className="w-9/12 mx-auto">
      <SEO title={edit === true ? "Edit Research Opportunity" : "Create Research Opportunity"} description={edit === true ? "Edit Research Opportunity Page" : "Create Research Opportunity Page"} />
      <h1 className="text-center my-8 text-3xl font-bold">{edit === true ? "Edit Research Opportunity" : "Create Research Opportunity"}</h1>
      <CreationForms edit={edit} token={authenticated[0]} />
    </div>
  );
};
CreatePost.propTypes = {
  edit: PropTypes.bool.isRequired,
  authenticated: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])).isRequired
};

export default CreatePost;