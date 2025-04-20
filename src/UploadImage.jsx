import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState();

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //? pass the "file" to the backend here => upload.single("file")
    formData.append("file", file);
    axios
      .post("https://test-fullstack-backend-9431.onrender.com/upload", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;
