import MainLayout from "./components/layout/MainLayout";
import { ToastContainer} from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}/>
      <MainLayout />
    </div>
  );
}

export default App;
