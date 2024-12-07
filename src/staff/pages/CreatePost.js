const validateInput = (field, value) => {
  if (field === "title" && value.length < 5) {
      return "Title must be at least 5 characters long.";
  }
  if (field === "description" && value.length < 20) {
      return "Description must be at least 20 characters long.";
  }
  return null;
};

const handleSubmit = async (data) => {
  const errors = Object.keys(data).reduce((acc, key) => {
      const error = validateInput(key, data[key]);
      if (error) acc[key] = error;
      return acc;
  }, {});
  if (Object.keys(errors).length > 0) {
      console.error("Form validation failed:", errors);
      return;
  }
  try {
      const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Submission failed.");
      console.log("Form submitted successfully!");
  } catch (err) {
      console.error("Error submitting form:", err);
  }
};
