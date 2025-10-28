import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../../shared/components/Checkbox.tsx";
import Input from "./Input.jsx";
import { useParams } from "react-router";
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
    const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/years`);
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
      ? `${import.meta.env.VITE_BACKEND_SERVER}/editOpportunity/${postID}`
      : `${import.meta.env.VITE_BACKEND_SERVER}/createOpportunity`;

    const method = edit ? "PUT" : "POST";

    fetch(endpoint, {
      method,
      credentials: "include",
      body: JSON.stringify({ ...data }),
    }).then((response) => {
      if (response.ok) {
        const message = edit ? "Successfully updated" : "Successfully created";
        alert(message);

        if (!edit) {
          response.json().then((data_response) => {
            window.location.href = `/opportunity/${data_response["id"]}`;
          });
        } else {
          window.location.href = `/opportunity/${postID}`;
        }
      } else {
        alert("Failed to submit form");
        console.log(response);
      }
    });
  }

  useEffect(() => {
    async function fetchEditData() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/editOpportunity/${postID}`,
        { credentials: "include" }
      );
      if (response.ok) {
        const {
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
        } = await response.json();
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
    if (edit) fetchEditData();
    else setLoading(false);
  }, [edit, postID, reset]);

  return loading === false && years != null ? (
    <form
      onSubmit={handleSubmit((data) => submitHandler(data))}
      className="flex flex-col gap-8 bg-gray-50 p-6 sm:p-8 rounded-xl w-full max-w-6xl mx-auto"
    >
      {/* Title, Location, Deadline */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-xl shadow-md p-4 sm:p-6">
        <Input
          label="Title (min. 5 characters)"
          name="title"
          errors={errors}
          errorMessage="Title must be at least 5 characters"
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

        <Input
          errors={errors}
          label="Location"
          name="location"
          type="select"
          options={Locations}
          errorMessage="Location is required"
          formHook={{
            ...register("location", { required: true }),
          }}
          placeHolder="Select Location"
        />

        <Input
          errors={errors}
          label="Deadline"
          name="application_due"
          errorMessage="Deadline is required"
          formHook={{ ...register("application_due", { required: true }) }}
          type="date"
          placeHolder="Select Deadline"
          options={[]}
        />
      </section>

      {/* Compensation Type + Pay + Credits */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-xl shadow-md p-4 sm:p-6">
        {/* Compensation Type */}
        <div>
          <label className="font-medium block mb-2">Compensation Type</label>
          <div className="space-y-2">
            {["For Pay", "For Credit", "Any"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={type}
                  {...register("type", { required: true })}
                  checked={compensationType === type}
                  onChange={() => setCompensationType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hourly Pay */}
        {(compensationType === "For Pay" || compensationType === "Any") && (
          <div>
            <Input
              errors={errors}
              label="Hourly Pay (min. 0)"
              name="hourlyPay"
              errorMessage="Hourly pay must be at least 0"
              formHook={{
                ...register("hourlyPay", {
                  required: compensationType === "For Pay",
                  min: 0,
                }),
              }}
              type="number"
              options={[]}
              placeHolder="Enter hourly pay"
            />
          </div>
        )}

        {/* Credits */}
        {(compensationType === "For Credit" || compensationType === "Any") && (
          <div>
            <CheckBox
              label="Credits"
              options={["1", "2", "3", "4"]}
              errors={errors}
              errorMessage="You must select at least one credit option"
              name="credits"
              type="checkbox"
              formHook={{
                ...register("credits", {
                  required: compensationType === "For Credit",
                }),
              }}
            />
          </div>
        )}
      </section>

      {/* Eligible Years, Description, Experience */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-xl shadow-md p-4 sm:p-6">
        {/* Eligible Class Years */}

        <div className="inline-flex items-center gap-2 mr-6 mb-2">
          <CheckBox
            label="Eligible Class Years"
            options={years.map(String) }
            errors={errors}
            errorMessage="At least one year must be selected"
            name="years"
            formHook={{ ...register("years", { required: true }) }}
            type="checkbox"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-1 md:col-span-1 lg:col-span-1">
          <label className="font-medium mb-1">
            Description (min. 10 characters)
          </label>
          <textarea
            {...register("description", { required: true, minLength: 10 })}
            placeholder="Enter description"
            className="border rounded-xl p-3 h-36 sm:h-40 resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              Description must be at least 10 characters
            </p>
          )}
        </div>

        {/* Recommended Experience */}
        <div className="flex flex-col col-span-1 md:col-span-1 lg:col-span-1">
          <label className="font-medium mb-1">Recommended Experience</label>
          <textarea
            {...register("recommended_experience")}
            placeholder="Enter recommended experience"
            className="border rounded-xl p-3 h-36 sm:h-40 resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </section>

      {/* Submit Button */}
      <section className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-10 sm:px-12 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Submit
        </button>
      </section>
    </form>
  ) : null;
}
 