import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Store image URL for preview

  // Handle image file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Generate image preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result); // Set image preview URL
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile); // Convert file to data URL for preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (file) {
      formData.append("file", file); // Add image file to form data
    }

    try {
      await axios.post(
        "https://test-fullstack-backend-z3jh.onrender.com/createUser", // Update the endpoint accordingly
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/"); // Navigate to users list after successful creation
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4 overflow-hidden h-[100px]">
            {/* Display image preview if available */}
            {imageUrl && <img src={imageUrl} alt="User Preview" className="w-full h-[150px] mb-4" />}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">+ Add Your Image</label>
            <input
              type="file"
              onChange={handleFileChange} // Handle file change to set image preview and file state
              className="w-full mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
