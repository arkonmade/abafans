import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import VenueSpotPage from "./pages/Spot";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="venue/:path" element={<VenueSpotPage />} />
            <Route path="match/:path" element={<VenueSpotPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
