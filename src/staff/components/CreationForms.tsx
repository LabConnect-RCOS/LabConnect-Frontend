import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CheckBox from "./Checkbox.tsx";
import Input from "./Input";
import { useParams } from "react-router";
import { Locations } from "../../shared/data/locations.ts";


interface CreationFormsProps {
  edit: boolean;
}

export default function CreationForms({ edit }: CreationFormsProps) {
  const { postID } = useParams();
  const [loading, setLoading] = useState<string | boolean>(false);
  const [compensationType, setCompensationType] = useState("Any"); // Manage the state for "For Pay" or "For Credit"
  const [years, setYears] = useState<string[]>([]);

  async function fetchYears() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/years`);

    if (response.ok) {
      const data = await response.json();
      setYears(data);
    } else {
      console.log("No response for years");
      setLoading("no response");
    }
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
      application_due: "",
      type: "Any",
      hourlyPay: 0,
      credits: [],
      description: "",
      recommended_experience: "",
      location: "Select a Department",
      years: [""],
    },
  });

  interface FormData {
    id: string;
    title: string;
    application_due: string;
    type: string;
    hourlyPay: number;
    credits: string[];
    description: string;
    recommended_experience: string;
    location: string;
    years: string[];
  }

  function submitHandler(data: FormData) {
    console.log({ ...data });
    if (edit) {
      fetch(`${process.env.REACT_APP_BACKEND_SERVER}/editOpportunity/${postID}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ ...data }),
      }).then((response) => {
        if (response.ok) {
          alert("Successfully updated");
          window.location.href = `/opportunity/${postID}`;
        } else {
          alert("Failed to update");
        }
      });
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_SERVER}/createOpportunity`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ ...data }),
      }).then((response) => {
        if (response.ok) {
          alert("Successfully created");
          response.json().then((data_response) => {
            window.location.href = `/opportunity/${data_response["id"]}`;
          });
        } else {
          alert("Failed to create");
          console.log(response);
        }
      });
    }
  };

  useEffect(() => {
    async function fetchEditData() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/editOpportunity/${postID}`, {
        credentials: "include",
      }
      );
      if (response.ok) {
        const { id, title, application_due, type, hourlyPay, credits, description, recommended_experience, location, years } = await response.json();
        await Promise.all([fetchYears()]);
        reset({
          id,
          title,
          application_due,
          type,
          hourlyPay,
          credits,
          description,
          recommended_experience,
          location,
          years,
        });
        setLoading(false);
      } else {
        console.log("No response");
        setLoading("no response");
      }
    }

    fetchYears();
    if (edit) {
      fetchEditData();
    } else {
      setLoading(false);
    }
  }, [edit, postID, reset]);

  return loading === false && years != null ? (
    <form
      onSubmit={handleSubmit((data) => {
        submitHandler(data);
      })}
      className="form-container" // Form container for vertical layout
    >
      {/* Group 1: Horizontal layout for Title, Location, Deadline */}
      <section className="flex flex-row">
        <div className="w-1/3 pl-3">
          <Input
            label="Title (min. 5 characters)"
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
            type="text"
            options={[]}
            placeHolder="Enter title"
          />
        </div>

        <div className="w-1/3 pr-3 pl-3">
          <Input
            errors={errors}
            label="Location"
            name={"location"}
            type="select"
            options={Locations}
            errorMessage={"Location is required"}
            formHook={{
              ...register("location", {
                required: true,
              }),
            }}
            placeHolder="Select Location"
          />
        </div>

        <div className="w-1/3 pr-3">
          <Input
            errors={errors}
            label="Deadline"
            name={"application_due"}
            errorMessage={"Deadline is required"}
            formHook={{ ...register("application_due", { required: true }) }}
            type="date"
            placeHolder={"Select Deadline"}
            options={[]}
          />
        </div>
      </section>


      {/* Compensation Type Section with Rectangular Box */}
      <section className="flex flex-row">
        <div className="w-1/3 pl-3">
          <label className="label-text font-medium">Compensation Type</label>
          <div className="flex items-center pt-5 pb-1">
            <input
              type="radio"
              value="For Pay"
              {...register("type", { required: true })}
              checked={compensationType === "For Pay"}
              onChange={() => setCompensationType("For Pay")}
            />
            <label className="pl-2 label-text">For Pay</label>
          </div>
          <div className="flex items-center pb-1">
            <input
              type="radio"
              value="For Credit"
              {...register("type", { required: true })}
              checked={compensationType === "For Credit"}
              onChange={() => setCompensationType("For Credit")}
            />
            <label className="pl-2 label-text">For Credit</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="Any"
              {...register("type", { required: true })}
              checked={compensationType === "Any"}
              onChange={() => setCompensationType("Any")}
            />
            <label className="pl-2 label-text">Any</label>
          </div>
        </div>

        {/* Conditionally Render Pay Input or Credit Checkboxes */}
        {compensationType === "For Pay" || compensationType === "Any" ? (
          <div className="w-1/3 pr-3 pl-3">
            <div className="w-4/5">
              <Input
                errors={errors}
                label="Hourly Pay (min. 0)"
                name={"hourlyPay"}
                errorMessage={"Hourly pay must be at least 0"}
                formHook={{
                  ...register("hourlyPay", {
                    required: compensationType === "For Pay", // Hourly pay required only if "For Pay"
                    min: 0,
                  }),
                }}
                type="number"
                options={[]}
                placeHolder="Enter hourly pay"
              />
            </div>
          </div>
        ) : null}

        {compensationType === "For Credit" || compensationType === "Any" ? (
          <div className="w-1/3 pl-3">
            <CheckBox
              label="Credits"
              options={["1", "2", "3", "4"]} // Checkboxes for credit options
              errors={errors}
              errorMessage={"You must select at least one credit option"}
              name={"credits"}
              type="checkbox"
              formHook={{
                ...register("credits", {
                  required: compensationType === "For Credit", // Credits required only if "For Credit"
                }),
              }}
            />
          </div>
        ) : null}
      </section>

      {/* Class Year and Description aligned horizontally */}
      <div className="horizontal-form">
        <CheckBox
          label="Eligible Class Years"
          options={years.map(String)}
          errors={errors}
          errorMessage={"At least one year must be selected"}
          name={"years"}
          formHook={{ ...register("years", { required: true }) }}
          type="checkbox"
        />

        <Input
          errors={errors}
          label="Description (min. 10 characters)"
          name={"description"}
          errorMessage="Description must be at least 10 characters"
          formHook={{
            ...register("description", {
              required: true,
              minLength: 10,
            }),
          }}
          type="textarea"
          options={[]}
          placeHolder="Enter description"
        />

        <Input
          errors={errors}
          label="Recommended Experience"
          name={"recommended_experience"}
          errorMessage=""
          formHook={{
            ...register("recommended_experience", {
            }),
          }}
          type="textarea"
          options={[]}
          placeHolder="Enter recommended experience"
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
    <h1>Loading...</h1>
  );
};