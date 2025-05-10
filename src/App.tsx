import Navbar from "./components/navbar/Navbar";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto ">
      {/* nav part */}
      <Navbar />
      {/* main part */}
      <MainLayout />
    </div>
  );
}

export default App;
