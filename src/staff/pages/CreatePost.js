import React, { useState } from "react";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateInput = (key, value) => {
    if (key === "title" && value.length < 5) {
      return "Title must be at least 5 characters.";
    }
    if (key === "description" && value.length < 20) {
      return "Description must be at least 20 characters.";
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    if (error) {
      setError(error);
    } else {
      setError("");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTagAddition = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create post.");
      setSuccessMessage("Post created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <select name="category" value={formData.category} onChange={handleInputChange}>
          <option value="General">General</option>
          <option value="Job">Job</option>
          <option value="Event">Event</option>
        </select>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default CreatePost;
