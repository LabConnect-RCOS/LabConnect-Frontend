import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../../shared/components/Checkbox.tsx";
import Input from "./Input.jsx";
import { useParams } from "react-router";
import { Locations } from "../../shared/data/locations.ts";

interface CreationFormsProps {
  edit: boolean;
}

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

export default function CreationForms({ edit }: CreationFormsProps) {
  const { postID } = useParams();
  const [loading, setLoading] = useState<string | boolean>("loading");
  const [compensationType, setCompensationType] = useState("Any");
  const [years, setYears] = useState<string[]>([]);

  async function fetchYears() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/years`
      );

      if (!response.ok) {
        throw new Error("No response for years");
      }

      const data = await response.json();
      setYears(data);
    } catch (e) {
      console.log(e);
      setLoading("no response");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
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
      years: [],
    },
  });

  function submitHandler(data: FormData) {
    if (edit) {
      fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/editOpportunity/${postID}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      ).then((response) => {
        if (response.ok) {
          alert("Successfully updated");
          window.location.href = `/opportunity/${postID}`;
        } else {
          alert("Failed to update");
        }
      });
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_SERVER}/createOpportunity`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
  }

  useEffect(() => {
    async function fetchEditData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/editOpportunity/${postID}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("No response");

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

        if (type === "For Pay" || type === "For Credit" || type === "Any") {
          setCompensationType(type);
        }

        setLoading(false);
      } catch (e) {
        console.log(e);
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

  if (loading === "loading") return <h1>Loading...</h1>;
  if (loading === "no response") return <h1>There was no response</h1>;
  if (!years) return <h1>Loading...</h1>;

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-6"
    >
      {/* Row 1: Title / Location / Deadline */}
      <div className="lg:col-span-1">
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

      <div className="lg:col-span-1">
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

      <div className="lg:col-span-1">
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

      {/* Row 2: Compensation / Pay / Credits */}
      <div className="lg:col-span-1">
        <label className="label-text font-medium">Compensation Type</label>
        <div className="mt-3 space-y-1">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="For Pay"
              className="accent-blue-600 dark:accent-blue-400"
              {...register("type", { required: true })}
              checked={compensationType === "For Pay"}
              onChange={() => setCompensationType("For Pay")}
            />
            <span>For Pay</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="For Credit"
              className="accent-blue-600 dark:accent-blue-400"
              {...register("type", { required: true })}
              checked={compensationType === "For Credit"}
              onChange={() => setCompensationType("For Credit")}
            />
            <span>For Credit</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Any"
              className="accent-blue-600 dark:accent-blue-400"
              {...register("type", { required: true })}
              checked={compensationType === "Any"}
              onChange={() => setCompensationType("Any")}
            />
            <span>Any</span>
          </label>
        </div>
      </div>

      <div className="lg:col-span-1">
        {(compensationType === "For Pay" || compensationType === "Any") && (
          <Input
            errors={errors}
            label="Hourly Pay (min. 0)"
            name={"hourlyPay"}
            errorMessage={"Hourly pay must be at least 0"}
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
        )}
      </div>

      <div className="lg:col-span-1">
        {(compensationType === "For Credit" || compensationType === "Any") && (
          <CheckBox
            label="Credits"
            options={["1", "2", "3", "4"]}
            errors={errors}
            errorMessage={"You must select at least one credit option"}
            name={"credits"}
            type="checkbox"
            formHook={{
              ...register("credits", {
                required: compensationType === "For Credit",
              }),
            }}
          />
        )}
      </div>

      {/* Row 3: Years + Description/Experience */}
      <div className="lg:col-span-1">
        <CheckBox
          label="Eligible Class Years"
          options={years.map(String)}
          errors={errors}
          errorMessage={"At least one year must be selected"}
          name={"years"}
          formHook={{ ...register("years", { required: true }) }}
          type="checkbox"
        />
      </div>

      <div className="lg:col-span-2 flex flex-col gap-6">
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
            ...register("recommended_experience", {}),
          }}
          type="textarea"
          options={[]}
          placeHolder="Enter recommended experience"
        />
      </div>

{/* Reset + Submit row */}
<div className="lg:col-span-3 flex justify-center pt-4 pb-2">
  {/* Inner wrapper controls total width and centers the pair */}
  <div className="w-full md:w-3/5 flex gap-4">
    {/* Reset Button */}
    <button
      type="button"
      onClick={() => reset()}
      className="
        btn btn-primary
        flex-1
        rounded-2xl
        bg-red-700 text-gray-100
        hover:bg-red-800
        focus:outline-none focus:ring-2 focus:ring-red-500
        transition
      "
    >
      Reset
    </button>

    {/* Submit Button */}
    <input
      type="submit"
      className="
        btn btn-primary
        flex-1
        rounded-2xl
        bg-blue-700 text-gray-100
        hover:bg-blue-800
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition
      "
      value={edit ? 'Update Opportunity' : 'Submit'}
    />
  </div>
</div>


    </form>
  );
}
