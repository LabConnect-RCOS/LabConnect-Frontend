import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CheckBox from "./Checkbox";
import Input from "./Input";
import { useParams } from "react-router";
import useGlobalContext from "../../context/global/useGlobalContext";

const DUMMY_DATA = {
  "d1": {
    id: "d1",
    title: "Software Intern",
    department: "Computer Science",
    location: "Remote",
    date: "2024-02-08",
    type: "For Pay",  // New field for type
    hourlyPay: 0,
    credits: 0,
    description: "This is a software internship",
    years: ["Freshman", "Junior", "Senior"],
  },
};

const CreationForms = () => {
  const { postID } = useParams();
  const [loading, setLoading] = useState(false);
  const [compensationType, setCompensationType] = useState("For Pay"); // Manage the state for "For Pay" or "For Credit"
  const state = useGlobalContext();
  const { loggedIn } = state;
  const { id: authorId } = state;

  async function fetchDetails(key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(DUMMY_DATA[key]);
      }, 5000);
    });
  }

  async function fetchData(key) {
    const response = await fetchDetails(key);
    response && reset(response);
    response ? setLoading(false) : setLoading("no response");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: "",
      title: "",
      department: "",
      location: "",
      date: "",
      type: "For Pay", // Default to "For Pay"
      hourlyPay: 0,
      credits: [],
      description: "",
      years: [""],
    },
  });

  useEffect(() => {
    postID && setLoading(true);
    postID && fetchData(postID);
  }, []);

  const submitHandler = (data) => {
    if (authorId) {
      console.log({ ...data, authorId });
    }
  };

  return !loading ? (
    <form
      onSubmit={handleSubmit((data) => {
        submitHandler(data);
      })}
      className="form-container" // Form container for vertical layout
    >
      {/* Group 1: Horizontal layout for Title, Department, Location, Due Date */}
      <div className="horizontal-form">
        <Input
          label="Title"
          name={"title"}
          errors={errors}
          errorMessage={"Title must be at least 5 characters"}
          formHook={{
            ...register("title", {
              required: true,
              minLength: 5,
              maxLength: 100,
            }),
          }}
        />

        <Input
          errors={errors}
          label="Department"
          name={"department"}
          type="select"
          options={["Computer Science", "Biology", "Physics"]}
          errorMessage={"Department must be at least 3 characters"}
          formHook={{
            ...register("department", {
              required: true,
              minLength: 3,
              maxLength: 40,
            }),
          }}
        />

        <Input
          errors={errors}
          label="Location"
          name={"location"}
          errorMessage={"Location must be at least 5 characters"}
          formHook={{
            ...register("location", {
              required: true,
              minLength: 5,
              maxLength: 100,
            }),
          }}
        />

        <Input
          errors={errors}
          label="Due Date"
          name={"date"}
          errorMessage={"Due Date is required"}
          formHook={{ ...register("date", { required: true }) }}
          type="date"
        />
      </div>

      {/* Compensation Type Section with Rectangular Box */}
      <div className="compensation-box">
        <label>Compensation Type</label>
        <div className="flex items-center">
          <input
            type="radio"
            value="For Pay"
            {...register("type", { required: true })}
            checked={compensationType === "For Pay"}
            onChange={() => setCompensationType("For Pay")}
          />
          <label className="pl-2">For Pay</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            value="For Credit"
            {...register("type", { required: true })}
            checked={compensationType === "For Credit"}
            onChange={() => setCompensationType("For Credit")}
          />
          <label className="pl-2">For Credit</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            value="Any"
            {...register("type", { required: true })}
            checked={compensationType === "Any"}
            onChange={() => setCompensationType("Any")}
          />
          <label className="pl-2">Any</label>
        </div>
      </div>

      {/* Conditionally Render Pay Input or Credit Checkboxes */}
      <div className="horizontal-form">
        {compensationType === "For Pay" || compensationType === "Any" ? (
          <Input
            errors={errors}
            label="Hourly Pay"
            name={"hourlyPay"}
            errorMessage={"Hourly pay must be at least 0"}
            formHook={{
              ...register("hourlyPay", {
                required: compensationType === "For Pay", // Hourly pay required only if "For Pay"
                min: 0,
              }),
            }}
            type="number"
          />
        ) : null}

        {compensationType === "For Credit" || compensationType === "Any" ? (
          <CheckBox
            label="Credits"
            options={[1, 2, 3, 4]} // Checkboxes for credit options
            errors={errors}
            errorMessage={"You must select at least one credit option"}
            name={"credits"}
            formHook={{
              ...register("credits", {
                required: compensationType === "For Credit", // Credits required only if "For Credit"
              }),
            }}
          />
        ) : null}
      </div>

      {/* Class Year and Description aligned horizontally */}
      <div className="horizontal-form">
        <CheckBox
          label="Eligible Class Years"
          options={["Freshman", "Sophomore", "Junior", "Senior"]}
          errors={errors}
          errorMessage={"At least one year must be selected"}
          name={"years"}
          formHook={{ ...register("years", { required: true }) }}
        />

        <Input
          errors={errors}
          label="Description"
          name={"description"}
          errorMessage="Description must be at least 10 characters"
          formHook={{
            ...register("description", {
              required: true,
              minLength: 10,
              message: "Description must be at least 10 characters",
            }),
          }}
          type="textarea"
        />
      </div>

      {/* Submit button */}
      <section className="pt-3 pb-5">
        <input type="submit" className="btn btn-primary bg-blue-700 w-full" />
      </section>
    </form>
  ) : loading === "no response" ? (
    <h1>There was no response</h1>
  ) : (
    <span className="lc-loading" />
  );
};

export default CreationForms;