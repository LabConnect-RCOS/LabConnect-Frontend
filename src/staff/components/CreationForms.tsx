import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CheckBox from "./Checkbox";
import Input from "./Input";
import { useParams } from "react-router";

interface CreationFormsProps {
  edit: boolean;
  token: string;
}

const locations = [
  "TBD",
  "Amos Eaton",
  "Carnegie",
  "Center for Biotechnology and Interdisciplinary Studies",
  "Center for Computational Innovations",
  "Low Center for Industrial Innovation (CII)",
  "Cogswell Laboratory",
  "Darrin Communications Center",
  "Experimental Media and Performing Arts Center",
  "Greene Library",
  "Jonsson Engineering Center",
  "Jonsson-Rowland Science Center",
  "Lally Hall",
  "LINAC Facility (Gaerttner Laboratory)",
  "Materials Research Center",
  "Pittsburgh Building",
  "Ricketts Building",
  "Russell Sage Laboratory",
  "Voorhees Computing Center",
  "Walker Laboratory",
  "West Hall",
  "Winslow Building",
  "Remote"
]

const CreationForms: React.FC<CreationFormsProps> = ({ edit, token }) => {
  const { postID } = useParams();
  const [loading, setLoading] = useState<string | boolean>(false);
  const [compensationType, setCompensationType] = useState("For Pay"); // Manage the state for "For Pay" or "For Credit"
  const [departments, setDepartments] = useState(null);
  const [years, setYears] = useState(null);

  async function fetchDetails() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/editOpportunity/${postID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    if (!response.ok) {
      return null;
    }
    return await response.json();
  }

  async function fetchEditData() {
    const response = await fetchDetails();
    if (response) {
      const { id, title, date, type, hourlyPay, credits, description } = response;
      reset({
        id,
        title,
        date,
        type,
        hourlyPay,
        credits,
        description,
      });
      setLoading(false);
    } else {
      console.log("No response");
      setLoading("no response");
    }
  }

  async function fetchDepartments() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/departments`)

    if (response.ok) {
      const data = await response.json();
      const department_data = data.map(item => item.title);
      setDepartments(department_data);
    } else {
      console.log("No response departments");
      setLoading("no response");
    }
  }

  async function fetchYears() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/years`)

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
      date: "",
      type: "For Pay", // Default to "For Pay"
      hourlyPay: 0,
      credits: [],
      description: "",
      department: "",
      location: "",
      years: [""],
    },
  });

  useEffect(() => {
    fetchDepartments();
    fetchYears();
    if (edit) {
      fetchEditData();
    } else {
      setLoading(false);
    }
  }, []);

  const submitHandler = (data) => {
    console.log({ ...data });
  };

  return loading === false && departments != null && years != null ? (
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
          type="text"
          options={[]}
          placeHolder="Enter title"
        />

        <Input
          errors={errors}
          label="Department"
          name={"department"}
          type="select"
          options={departments}
          errorMessage={"Department is required"}
          formHook={{
            ...register("department", {
              required: true,
            }),
          }}
          placeHolder="Select department"
        />

        <Input
          errors={errors}
          label="Location"
          name={"location"}
          type="select"
          options={locations}
          errorMessage={"Location is required"}
          formHook={{
            ...register("location", {
              required: true,
            }),
          }}
          placeHolder="Select department"
        />

        <Input
          errors={errors}
          label="Due Date"
          name={"date"}
          errorMessage={"Due Date is required"}
          formHook={{ ...register("date", { required: true }) }}
          type="date"
          placeHolder={"Select Due Date"}
          options={[]}
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
          <label className="pl-2">Both</label>
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
            options={[]}
            placeHolder="Enter hourly pay"
          />
        ) : null}

        {compensationType === "For Credit" || compensationType === "Any" ? (
          <CheckBox
            label="Credits"
            options={[1, 2, 3, 4]} // Checkboxes for credit options
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
        ) : null}
      </div>

      {/* Class Year and Description aligned horizontally */}
      <div className="horizontal-form">
        <CheckBox
          label="Eligible Class Years"
          options={years}
          errors={errors}
          errorMessage={"At least one year must be selected"}
          name={"years"}
          formHook={{ ...register("years", { required: true }) }}
          type="checkbox"
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
            }),
          }}
          type="textarea"
          options={[]}
          placeHolder="Enter description"
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

export default CreationForms;