import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Store image URL

  useEffect(() => {
    axios
      .get("https://test-fullstack-backend-9431.onrender.com/getUser/" + id)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setFile(result.data.image); // Assuming the image field is 'image'
        setImageUrl(result.data.image ? `https://test-fullstack-backend-9431.onrender.com/images/${result.data.image}` : ''); // Set image URL
      })
      .catch((err) => console.log(err));
  }, [id]);

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
        `https://test-fullstack-backend-9431.onrender.com/updateUserWithImage/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");  // Navigate to the home page after successful update
      window.location.reload(); // Reload the page to reflect changes
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Update User</h2>
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
          <div className="mb-4">
            {/* Display existing image */}
            {imageUrl && <img src={imageUrl} alt="User" className="w-full h-auto mb-4" />}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">+ Add Your Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
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

export default UpdateUser;
