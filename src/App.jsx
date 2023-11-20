import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ConfirmationPage from "./components/views/ConfirmationPage";
import FormPage from "./components/views/FormPage";
import { TicketProvider } from "./contexts/TicketContext";
import LandingPage from "./components/views/LandingPage";
import TrackingPage from "./components/views/TrackingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/confirm",
      element: <ConfirmationPage />,
    },
    {
      path: "/submit-complaint",
      element: <FormPage />,
    },
    {
      path: "/track-complaint",
      element: <TrackingPage />
    },
  ]);

  return (
    <TicketProvider>
      <RouterProvider router={router} />
    </TicketProvider>
  );
}

export default App;
