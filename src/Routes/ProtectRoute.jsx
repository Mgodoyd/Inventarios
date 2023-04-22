import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectRoute = () => {
       
if (localStorage.getItem("user") === "admin") {
        return <Outlet />;
    } 

if (localStorage.getItem("user") === "operador") {
        return <Outlet />;
    }

    return (
        <Navigate to="/" />
    );
};

export default ProtectRoute;