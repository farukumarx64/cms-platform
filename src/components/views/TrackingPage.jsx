// TrackingPage.jsx

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../../styles/TrackingPage.css";

function TrackingBox(props) {
  const inputRefs = Array.from({ length: 14 }, () => useRef(null)); // Update the length

  const handleInputChange = (index, event) => {
    if (event.target.value) {
      // Find the next valid input index (skipping over "-")
      let nextIndex = index + 1;
      while (nextIndex < inputRefs.length && !inputRefs[nextIndex].current) {
        nextIndex++;
      }

      if (nextIndex < inputRefs.length) {
        inputRefs[nextIndex].current.focus();
      }
    }
    props.onChangeBtn(index, event.target.value);
  };

  const handleBackspace = (index, event) => {
    if (index > 0 && !event.target.value) {
      // Find the previous valid input index (skipping over "-")
      let prevIndex = index - 1;
      while (prevIndex >= 0 && !inputRefs[prevIndex].current) {
        prevIndex--;
      }

      if (prevIndex >= 0) {
        inputRefs[prevIndex].current.focus();
      }
    }
    props.onChangeBtn(index, "");
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0) {
      handleBackspace(index, event);
    }
  };

  useEffect(() => {
    // Focus on the first input when the component mounts
    inputRefs[0].current.focus();
  }, []);

  return (
    <div className="tracking-box">
      {Array.from({ length: 14 }).map((_, index) => (
        <React.Fragment key={index}>
          {index === 3 || index === 9 ? (
            <p>-</p>
          ) : (
            <input
              ref={inputRefs[index]}
              type="text"
              className="otp-input"
              maxLength="1"
              onChange={(event) => handleInputChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const TrackingPage = () => {
  const [ticketInput, setTicketInput] = useState("XXX-XXXXX-XXX");
  const [complaintRecord, setComplaintRecord] = useState(null);

  const handleTicketInputChange = (index, value) => {
    const inputValue = value.toUpperCase(); // Ensure uppercase
    event.target.value = inputValue;
    setTicketInput((prev) => {
      const chars = prev.split("");
      chars[index] = inputValue;
      return chars.join("");
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search-ticket/${ticketInput}`
      );
      setComplaintRecord(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="tracking-page">
      <h1>Track Your Complaint</h1>
      <p>Please enter your complaint Tracking ID</p>
      <TrackingBox onChangeBtn={handleTicketInputChange} />
      <button onClick={handleSearch} className="submit-btn">
        Search
      </button>
      {complaintRecord && (
        <div className="complaint-details">
          <h2>Complaint Record</h2>
          <p>Ticket ID: {complaintRecord.ticketID}</p>
          <p>Subject Header: {complaintRecord.subject}</p>
          <p>Company Name: {complaintRecord.companyName}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
