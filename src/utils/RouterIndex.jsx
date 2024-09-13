import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout, RouterData } from "./const.jsx";

const RouterIndex = () => {
    return (
        <BrowserRouter>
            <Routes>
                {RouterData?.map(({ path, Component }, index) => (
                    <Route key={index} path={path} element={<Component />} />
                ))}
                {Layout?.map(({ path, Component }, index) => (
                    <Route key={index} path={`${path}/*`} element={<Component />} />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default RouterIndex;
