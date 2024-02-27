import { useState } from "react";
import "./App.css";
import UnpaidForm from "./components/UnpaidForm";
import PaidForm from "./components/PaidForm";

function App() {
  const [selectedMode, setSelectedMode] = useState("Unpaid");

  const handleSelectChange = (value) => {
    setSelectedMode(value);
  };

  return (
    <div>
      {/* <div className="space-x-4 mb-10">
        <button
          className={`${selectedMode === "Unpaid" && "bg-sky-500"}`}
          onClick={() => handleSelectChange("Unpaid")}
        >
          Unpaid Form
        </button>
        <button
          className={`${selectedMode === "Paid" && "bg-sky-500"}`}
          onClick={() => handleSelectChange("Paid")}
        >
          Paid Form
        </button>
      </div> */}
      {/* {selectedMode === "Unpaid" ? <UnpaidForm /> : <PaidForm />} */}
      <UnpaidForm />
    </div>
  );
}

export default App;
