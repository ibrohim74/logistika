import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Admin_Route, User_Route} from '../../../utils/const.jsx';
import './layout_cabinet.css'
import LayoutNav from "./layout_navbar/LayoutNav.jsx";

const Layout_Cabinet = () => {
    const [user, setUser] = useState({
        username: "",
        role: ""
    });

    useEffect(() => {
        const userDataString = window.localStorage.getItem('user');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setUser({
                    username: userData.username || "",
                    role: userData.role || ""
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);



    return (
        <div className={'layout_box'} >
            <LayoutNav/>
            <div className="content_layout">
                <div className="container">
                    <Routes>
                        {user.role === "user" &&
                            User_Route.map(({path, Component}) => (
                                <Route key={path} path={path} element={Component}/>
                            ))}
                        {user.role === "admin" &&
                            Admin_Route.map(({path, Component}) => (
                                <Route key={path} path={path} element={Component}/>
                            ))}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Layout_Cabinet;
