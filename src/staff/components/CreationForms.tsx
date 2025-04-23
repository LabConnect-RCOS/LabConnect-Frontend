import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import CheckBox from "./Checkbox.tsx";
import Input from "./Input";
import { Locations } from "../../shared/data/locations.ts";

interface CreationFormsProps {
  edit: boolean;
}

export default function CreationForms({ edit }: CreationFormsProps) {
  const { postID } = useParams();
  const [loading, setLoading] = useState<string | boolean>(false);
  const [compensationType, setCompensationType] = useState("Any");
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
    const endpoint = edit
      ? `${process.env.REACT_APP_BACKEND_SERVER}/editOpportunity/${postID}`
      : `${process.env.REACT_APP_BACKEND_SERVER}/createOpportunity`;
    const method = edit ? "PUT" : "POST";

    fetch(endpoint, {
      method,
      credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert(`Successfully ${edit ? "updated" : "created"}`);
        response.json().then((data_response) => {
          window.location.href = `/opportunity/${edit ? postID : data_response["id"]}`;
        });
      } else {
        alert(`Failed to ${edit ? "update" : "create"}`);
        console.log(response);
      }
    });
  }

  useEffect(() => {
    async function fetchEditData() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/editOpportunity/${postID}`,
        { credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        await Promise.all([fetchYears()]);
        reset(data);
        setLoading(false);
      } else {
        console.log("No response");
        setLoading("no response");
      }
    }

    fetchYears();
    if (edit) fetchEditData();
    else setLoading(false);
  }, [edit, postID, reset]);

  return loading === false && years != null ? (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
      {/* Title, Location, Deadline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Title (min. 5 characters)"
          name="title"
          errors={errors}
          errorMessage="Title must be at least 5 characters"
          formHook={register("title", { required: true, minLength: 5, maxLength: 100 })}
          type="text"
          options={[]}
          placeHolder="Enter title"
        />
        <Input
          label="Location"
          name="location"
          errors={errors}
          errorMessage="Location is required"
          formHook={register("location", { required: true })}
          type="select"
          options={Locations}
          placeHolder="Select Location"
        />
        <Input
          label="Deadline"
          name="application_due"
          errors={errors}
          errorMessage="Deadline is required"
          formHook={register("application_due", { required: true })}
          type="date"
          options={[]}
          placeHolder="Select Deadline"
        />
      </div>

      {/* Compensation Type and related fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Compensation Type
          </label>
          {["For Pay", "For Credit", "Any"].map((type) => (
            <div className="flex items-center mb-2" key={type}>
              <input
                type="radio"
                value={type}
                {...register("type", { required: true })}
                checked={compensationType === type}
                onChange={() => setCompensationType(type)}
              />
              <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">{type}</label>
            </div>
          ))}
        </div>

        {(compensationType === "For Pay" || compensationType === "Any") && (
          <Input
            label="Hourly Pay (min. 0)"
            name="hourlyPay"
            errors={errors}
            errorMessage="Hourly pay must be at least 0"
            formHook={register("hourlyPay", {
              required: compensationType === "For Pay",
              min: 0,
            })}
            type="number"
            options={[]}
            placeHolder="Enter hourly pay"
          />
        )}

        {(compensationType === "For Credit" || compensationType === "Any") && (
          <CheckBox
            label="Credits"
            name="credits"
            errors={errors}
            errorMessage="Select at least one credit option"
            formHook={register("credits", {
              required: compensationType === "For Credit",
            })}
            type="checkbox"
            options={["1", "2", "3", "4"]}
          />
        )}
      </div>

      {/* Class Years, Description, Experience */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CheckBox
          label="Eligible Class Years"
          name="years"
          errors={errors}
          errorMessage="Select at least one year"
          formHook={register("years", { required: true })}
          type="checkbox"
          options={years.map(String)}
        />

        <Input
          label="Description (min. 10 characters)"
          name="description"
          errors={errors}
          errorMessage="Description must be at least 10 characters"
          formHook={register("description", {
            required: true,
            minLength: 10,
          })}
          type="textarea"
          options={[]}
          placeHolder="Enter description"
        />

        <Input
          label="Recommended Experience"
          name="recommended_experience"
          errors={errors}
          errorMessage=""
          formHook={register("recommended_experience")}
          type="textarea"
          options={[]}
          placeHolder="Enter recommended experience"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-lg font-semibold transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  ) : loading === "no response" ? (
    <h1 className="text-center text-red-600">There was no response</h1>
  ) : (
    <h1 className="text-center text-gray-600">Loading...</h1>
  );
}
