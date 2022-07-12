import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import App from "./App";
import PPT from "./PPT";

export default function BasicExample() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/ppt" element={<PPT />} />
      </Routes>
    </Router>
  );
}
