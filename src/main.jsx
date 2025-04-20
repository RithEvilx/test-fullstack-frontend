import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./User/Users.jsx";
import CreateUser from "./User/CreateUser.jsx";
import UpdateUser from "./User/UpdateUser.jsx";
import UploadImage from "./UploadImage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/uploadimage" element={<UploadImage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
