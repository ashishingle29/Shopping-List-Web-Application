import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <BrowserRouter>
        <h2 style={{ background: "#b84dff", color: "white", textAlign: "center" ,width:"1280px"}}>Shopping List</h2>
        <Routes>
            <Route path='/' element={<App />} />
        </Routes>
    </BrowserRouter>
)