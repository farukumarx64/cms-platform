import './App.css'
import { v4 as uuidv4 } from 'uuid';
import ConfirmationPage from './components/ConfirmationPage';

function App() {
  const a = uuidv4(), b = uuidv4();
  console.log(a, b)

  return (
    <>
    <ConfirmationPage />
    </>
  )
}

export default App
