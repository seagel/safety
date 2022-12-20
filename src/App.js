import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Map";

function App() {
  return (
      <div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Map />}/>
              <Route path="/map" element={<Map />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
