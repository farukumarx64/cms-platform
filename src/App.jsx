import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import ConfirmationPage from './components/ConfirmationPage';
import FormPage from './components/FormPage';

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
    <RouterProvider router={router} />
  )
}

export default App
