// TrackingPage.jsx

import React, { useState, useRef, useEffect } from "react";
import "../../styles/TrackingPage.css";
import Database from "../../backend/dataBase";

function TrackingBox(props) {
  const inputRefs = Array.from({ length: 13 }, () => useRef(null)); // Update the length

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
    } else if (event.key === "Enter") {
      // Handle Enter key press, you can adjust this logic as needed
      props.onEnterPress();
    }
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text").toUpperCase();
    if (pastedText.length === 13) {
      // Assume the pasted text is a valid ticket format
      const ticketChars = pastedText.split("");
      ticketChars.forEach((char, index) => {
        if (index >= 0 && inputRefs[index] && inputRefs[index].current) {
          inputRefs[index].current.value = char;
          props.onChangeBtn(index, char);
        }
      });
    }
  };

  useEffect(() => {
    // Focus on the first input when the component mounts
    inputRefs[0].current.focus();
  }, []);

  return (
    <div className="tracking-box">
      {Array.from({ length: 13 }).map((_, index) => (
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
              onPaste={handlePaste}
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
    event.target.value = event.target.value.toUpperCase();
    setTicketInput((prev) => {
      const chars = prev.split("");
      chars[index] = inputValue;
      return chars.join("");
    });
  };

  const handleSearch = async () => {
    const input = document.querySelector(".tracking-input");
    input.style.display = "none";
    console.log(ticketInput); //VIO-ORCHX-947 or XOJ-ZZUNB-663 or vio-orchx-947
    try {
      const dataBase = new Database();
      const response = await dataBase.queryData(ticketInput);
      console.log(response[0].ticket);
      setComplaintRecord(response[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnterPress = () => {
    // Handle Enter key press, you can adjust this logic as needed
    handleSearch();
  };

  return (
    <div id="tracking-page">
      <div className="tracking-input">
        <h1>Track Your Complaint</h1>
        <p>Please enter your complaint Tracking ID</p>
        <TrackingBox
          onChangeBtn={handleTicketInputChange}
          onEnterPress={handleEnterPress}
        />
        <button onClick={handleSearch} className="submit-btn">
          Search
        </button>
      </div>
      {complaintRecord && (
        <div className="complaint-details">
          <h2>Complaint Record</h2>
          <p>Ticket ID: &nbsp;&nbsp;&nbsp;&nbsp;{complaintRecord.ticket}</p>
          <p>
            Subject Header: &nbsp;&nbsp;&nbsp;&nbsp;{complaintRecord.header}
          </p>
          <p>Company Name: &nbsp;&nbsp;&nbsp;&nbsp;{complaintRecord.name}</p>
          <p>
            Complain Category: &nbsp;&nbsp;&nbsp;&nbsp;
            {complaintRecord.category}
          </p>
          <p>
            description: &nbsp;&nbsp;&nbsp;&nbsp;{complaintRecord.description}
          </p>
          {/* Add more details as needed */}
          <button
            className="submit-btn"
            onClick={() => (window.location.href = "/track-complaint")}
          >
            Search again
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
