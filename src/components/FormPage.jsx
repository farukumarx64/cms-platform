import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FormPage.css";
import axios from "axios";
import { useTicket } from "../contexts/TicketContext";

const FormPage = () => {
  const {setTicket} = useTicket();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    header: "",
    address: "",
    selectedOption: "Option 1",
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
      selectedOption: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    try {
      await generateTicket();
      // You can send the form data to an API or perform any desired action here.
    } catch (error) {
      console.error(error);
    }
  };
  
  const generateTicket = async () => {
    try {
      const response = await axios.get("http://localhost:5000/generate-ticket");
      console.log(response.data.ticketID);
      setTicket(response.data.ticketID);
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
        ></textarea>
        <div>
          <label>Select your Problem Category:</label>
          <select
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="Option 1">Retail Outlet Facility</option>
            <option value="Option 2">Adon SKID</option>
            <option value="Option 3">LNG Facility</option>
            <option value="Option 4">CNG Facility</option>
            <option value="Option 5">Gas Plant</option>
            <option value="Option 6">Refinery</option>
            <option value="Option 7">Lube Blending Plant</option>
            <option value="Option 8">Calibration Centers</option>
            <option value="Option 9">Gas Storage Facility</option>
            <option value="Option 10">Petroleum Storage Facility</option>
            <option value="Option 11">Aviation Fuel Facility</option>
          </select>
        </div>
        <div>
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            <Link to="confirm">submit</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
