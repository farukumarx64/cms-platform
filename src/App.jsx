import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ConfirmationPage from "./components/ConfirmationPage";
import FormPage from "./components/FormPage";
import { TicketProvider } from "./contexts/TicketContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FormPage />,
    },
    {
      path: "/confirm",
      element: <ConfirmationPage />,
    },
  ]);

  return (
    <TicketProvider>
      <RouterProvider router={router} />
    </TicketProvider>
  );
}

export default App;
