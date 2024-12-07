import React, { useRef, useEffect } from "react";
import ProfileAvatar from "../components/UIElements/ProfileAvatar.tsx";
import EditInformation from "../components/Profile/EditInformation";

// Accessibility Utility: Focus Trap for Modal
function trapFocus(element) {
  const focusableEls = element.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
  });
}

const EditProfile = ({
  id,
  name,
  department,
  researchCenter,
  description,
  email,
  role,
  image,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Apply Focus Trap when modal is mounted
    if (modalRef.current) {
      trapFocus(modalRef.current);
    }
  }, []);

  const handleSave = () => {
    console.log("Profile information saved.");
  };

  const handleCancel = () => {
    console.log("Edit canceled.");
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "name" && value.trim().length < 3) {
      return "Name must be at least 3 characters.";
    }
    if (fieldName === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      return "Invalid email format.";
    }
    if (fieldName === "description" && value.length > 300) {
      return "Description should not exceed 300 characters.";
    }
    return null;
  };

  const renderFieldValidation = (fieldName, value) => {
    const error = validateField(fieldName, value);
    return error ? <p className="text-red-500 text-sm">{error}</p> : null;
  };

  return (
    <section className="edit-profile-section p-5" ref={modalRef}>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div className="flex gap-5">
        <ProfileAvatar name={name} image={image} />
        <EditInformation
          id={id}
          name={name}
          description={description}
          email={email}
          role={role}
          image={image}
          department={department}
          researchCenter={researchCenter}
        />
      </div>

      <form className="edit-profile-form mt-5">
        <div className="form-group mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={name}
            className="border p-2 w-full rounded"
          />
          {renderFieldValidation("name", name)}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={email}
            className="border p-2 w-full rounded"
          />
          {renderFieldValidation("email", email)}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
            className="border p-2 w-full rounded"
            maxLength={300}
          ></textarea>
          {renderFieldValidation("description", description)}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="department" className="block text-sm font-medium">
            Department
          </label>
          <select
            id="department"
            name="department"
            defaultValue={department}
            className="border p-2 w-full rounded"
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Biology">Biology</option>
            <option value="Physics">Physics</option>
          </select>
        </div>

        <div className="form-actions flex gap-3 mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
