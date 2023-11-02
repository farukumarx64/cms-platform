import { Component } from "react";
import { Link } from "react-router-dom";
//import  '../styles/FormPage.css'

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description:"",
      header:"",
      address:"",
      selectedOption: "Option 1",
      file: null,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  handleDropdownChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", this.state);
    // You can send the form data to an API or perform any desired action here.
  };

  render() {
    return (
      <div id="form-page">
        <h1>NMDPRA Complaint Form</h1>
        <form onSubmit={this.handleSubmit} className="form">
        <div>
            <label>Subject Header:</label>
            <input
              type="text"
              name="header"
              value={this.state.header}
              onChange={this.handleInputChange}
              placeholder="Header"
            />
          </div>
            
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder="Company Name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="email@gmail.com"
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
              placeholder="Address"
            />
          </div>
          <div>
            <label>Upload a file:</label>
            <input
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png, .pdf, .doc, .dox"
              onChange={this.handleFileChange}
            />
          </div>
            <label>Describe Your Problem</label>
          <textarea 
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
            placeholder="Type Here..."
            cols="40" 
            rows="20"
          ></textarea>
          <div>
            <label>Select your Problem Category:</label>
            <select
              name="selectedOption"
              value={this.state.selectedOption}
              onChange={this.handleDropdownChange}
            >
              <option value="Option 1">Retail Outlet Facility</option>
              <option value="Option 2">ADON SKID</option>
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
            <button type="submit" className="submit-button"><Link to="confirm">submit</Link></button>
          </div>
        </form>
      </div>
    );
  }
}

export default FormPage;
