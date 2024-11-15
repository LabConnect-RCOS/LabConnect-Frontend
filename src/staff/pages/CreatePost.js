import React from "react";
import CreationForms from "../components/CreationForms";
import useGlobalContext from "../../context/global/useGlobalContext";

const CreatePost = ({edit}) => {
  const state = useGlobalContext();
  const { loggedIn } = state;
  const createPost = (
    <div className="createpost">
      <div className="w-3/5">
        <h1 className="text-center text-2xl font-bold">{edit===true ? "Edit Research Opportunity" : "Create Research Opportunity"}</h1>
        <br />
        <CreationForms />
      </div>
    </div>
  );

  return (
    
    <section>
      {!loggedIn ? (
          "Please log in to change research opportunities"
        ) : (
          createPost
        )}
    </section>
  );
};

export default CreatePost;