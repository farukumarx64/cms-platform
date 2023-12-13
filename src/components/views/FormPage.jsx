import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/FormPage.css";
import axios from "axios";
import { useTicket } from "../../contexts/TicketContext";
import Database from "../../backend/dataBase";
import StorageService from "../../backend/storage";

const FormPage = () => {
  const { setTicket } = useTicket();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    header: "",
    address: "",
    category: "Retail Outlet Facility",
    file: null,
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      file: event.target.files[0],
    });
  };

  const handleDropdownChange = (event) => {
    setFormData({
      ...formData,
      category: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the required fields are filled out
    const requiredFields = [
      "header",
      "name",
      "email",
      "address",
      "description",
      "category",
    ];
    const hasEmptyFields = requiredFields.some((field) => !formData[field]);
    if (hasEmptyFields) {
      alert("Please fill out all required fields.");
      navigate("/submit-complaint");
      console.log(navigate)
      return;
    }

    console.log("Form data submitted:", formData);
    try {
      const storage = new StorageService();

      // Upload file to Supabase Storage
      const fileKey = await storage.uploadFile(formData.file);

    // Update the formData with the new File object
    const updatedFormData = {
      ...formData,
      file: { name: formData.file.name, url: fileKey },
    };

      await generateTicket(updatedFormData);
      navigate('/confirm')
      // You can send the form data to an API or perform any desired action here.
    } catch (error) {
      console.error(error);
    }
  };

  const generateTicket = async (formData) => {
    const localUrl = "http://localhost:5000/generate-ticket";
    try {
      const response = await axios.get(localUrl);
      console.log(response.data.ticketID);
      setTicket(response.data.ticketID);
      const dataBase = new Database();
      dataBase.insertData(formData, response.data.ticketID);
      dataBase.queryAll();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught in the handleSubmit function
    }
  };

  return (
    <div id="form-page">
      <h1>NMDPRA Complaint Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Subject Header:</label>
          <input
            type="text"
            name="header"
            value={formData.header}
            onChange={handleInputChange}
            placeholder="Header"
            required
          />
        </div>

        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Company Name"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="email@gmail.com"
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          />
        </div>
        <div>
          <label>Upload a file:</label>
          <input
            type="file"
            name="file"
            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
            onChange={handleFileChange}
          />
        </div>
        <label>Describe Your Problem</label>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Type Here..."
          cols="40"
          rows="20"
          required
        ></textarea>
        <div>
          <label>Select your Problem Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleDropdownChange}
            required
          >
            <option value="Retail Outlet Facility">
              Retail Outlet Facility
            </option>
            <option value="Add-On SKID">Add-On SKID</option>
            <option value="LNG Facility">LNG Facility</option>
            <option value="CNG Facility">CNG Facility</option>
            <option value="Gas Plant">Gas Plant</option>
            <option value="Refinery">Refinery</option>
            <option value="Lube Blending Plant">Lube Blending Plant</option>
            <option value="Calibration Centers">Calibration Centers</option>
            <option value="Gas Storage Facility">Gas Storage Facility</option>
            <option value="Petroleum Storage Facility">
              Petroleum Storage Facility
            </option>
            <option value="Aviation Fuel Facility">
              Aviation Fuel Facility
            </option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            <Link>submit</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
