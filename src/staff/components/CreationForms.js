import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "./Checkbox";
import Input from "./Input";
import { useParams } from "react-router";
import useGlobalContext from "../../context/global/useGlobalContext";

function trapFocus(element) {
  const focusableEls = element.querySelectorAll(
    "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
  });
}

function setFocusIndicator(element) {
  element.addEventListener("focus", (e) => {
    e.target.style.outline = "2px solid #000";
  });
  element.addEventListener("blur", (e) => {
    e.target.style.outline = "none";
  });
}

const CreationForms = () => {
  const { postID } = useParams();
  const [loading, setLoading] = useState(false);
  const [compensationType, setCompensationType] = useState("For Pay");
  const [isPaused, setIsPaused] = useState(false);
  const formRef = useRef(null);
  const state = useGlobalContext();
  const { loggedIn } = state;
  const { id: authorId } = state;

  const DUMMY_DATA = {
    d1: {
      id: "d1",
      title: "Software Intern",
      department: "Computer Science",
      location: "Remote",
      date: "2024-02-08",
      type: "For Pay",
      hourlyPay: 0,
      credits: 0,
      description: "This is a software internship",
      years: ["Freshman", "Junior", "Senior"],
    },
  };

  async function fetchDetails(key) {
    return new Promise((resolve) => {
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
      type: "For Pay",
      hourlyPay: 0,
      credits: [],
      description: "",
      years: [""],
    },
  });

  useEffect(() => {
    if (postID) {
      setLoading(true);
      fetchData(postID);
    }
  }, []);

  useEffect(() => {
    if (formRef.current) {
      trapFocus(formRef.current);
      setFocusIndicator(formRef.current);
    }
  }, []);

  const submitHandler = (data) => {
    if (authorId) {
      console.log({ ...data, authorId });
    }
  };

  return (
    <div>
      <a href="#main-form" className="skip-to-content">Skip to main content</a>
      <button
        type="button"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? "Resume Auto-Updates" : "Pause Auto-Updates"}
        aria-pressed={isPaused}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
      {!loading ? (
        <form
          ref={formRef}
          id="main-form"
          role="form"
          aria-labelledby="form-title"
          onSubmit={handleSubmit((data) => submitHandler(data))}
          className="form-container"
        >
          <h1 id="form-title">Create a New Opportunity</h1>
          <div className="horizontal-form">
            <Input
              label="Title"
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
            />
            <Input
              errors={errors}
              label="Department"
              name="department"
              type="select"
              options={["Computer Science", "Biology", "Physics"]}
              errorMessage="Department must be at least 3 characters"
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
              name="location"
              errorMessage="Location must be at least 5 characters"
              formHook={{
                ...register("location", {
                  required: true,
                  minLength: 5,
                  maxLength: 100,
                }),
              }}
            />
          </div>
          <div className="compensation-section">
            <label htmlFor="compensation-type">Compensation Type</label>
            <div>
              <input
                type="radio"
                value="For Pay"
                {...register("type")}
                onChange={() => setCompensationType("For Pay")}
              />
              <label>For Pay</label>
              <input
                type="radio"
                value="For Credit"
                {...register("type")}
                onChange={() => setCompensationType("For Credit")}
              />
              <label>For Credit</label>
              <input
                type="radio"
                value="Any"
                {...register("type")}
                onChange={() => setCompensationType("Any")}
              />
              <label>Any</label>
            </div>
          </div>
          <div className="horizontal-form">
            {compensationType === "For Pay" && (
              <Input
                errors={errors}
                label="Hourly Pay"
                name="hourlyPay"
                errorMessage="Hourly pay must be at least 0"
                formHook={{
                  ...register("hourlyPay", {
                    required: true,
                    min: 0,
                  }),
                }}
                type="number"
              />
            )}
            {compensationType === "For Credit" && (
              <CheckBox
                label="Credits"
                options={[1, 2, 3, 4]}
                errors={errors}
                errorMessage="Select at least one credit option"
                name="credits"
                formHook={{
                  ...register("credits", {
                    required: true,
                  }),
                }}
              />
            )}
          </div>
          <CheckBox
            label="Eligible Class Years"
            options={["Freshman", "Sophomore", "Junior", "Senior"]}
            errors={errors}
            errorMessage="Select at least one class year"
            name="years"
            formHook={{ ...register("years", { required: true }) }}
          />
          <Input
            errors={errors}
            label="Description"
            name="description"
            errorMessage="Description must be at least 10 characters"
            formHook={{
              ...register("description", {
                required: true,
                minLength: 10,
              }),
            }}
            type="textarea"
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CreationForms;
