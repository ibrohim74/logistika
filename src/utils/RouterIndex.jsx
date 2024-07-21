import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RouterData} from "./const.jsx";

const RouterIndex = () => {
    return (


            <BrowserRouter>
                <Routes>

                    {RouterData?.map(({path, Component}) => (
                        <Route key={path} path={path} element={Component}/>
                    ))}

                </Routes>
            </BrowserRouter>


    );
};

export default RouterIndex;