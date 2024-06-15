import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Crud from "./crud/Crud";
import AddTask from "./crud/AddTask";
import { Toaster } from "react-hot-toast";
import UpdateData from "./crud/UpdateData";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Crud />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/updateTask/:id" element={<UpdateData />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
