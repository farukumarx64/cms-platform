import { Link } from "react-router-dom";
import "../../styles/LandingPage.css"; // You can create this CSS file for styling
import complaintImage from "/images/landing_illus.svg"; // Replace with your image file
import Auth from "../../backend/auth";

const auth = new Auth();

const LandingPage = () => {
  async function handleLogout() {
    try {
      auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="landing-page">
      <button className="logout-button primary-button" onClick={handleLogout}>
        Log Out
      </button>
      <div className="content">
        <div className="image-container">
          <img src={complaintImage} alt="Complaint Management" />
        </div>
        <div className="info-container">
          <h1>Welcome to the NMDPRA Complaint Portal</h1>
          <p>Efficiently manage and track your complaints.</p>

          <div className="action-buttons">
            <Link to="/submit-complaint">
              <button className="primary-button">Submit a Complaint</button>
            </Link>

            <Link to="/track-complaint">
              <button className="secondary-button">Track a Complaint</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
