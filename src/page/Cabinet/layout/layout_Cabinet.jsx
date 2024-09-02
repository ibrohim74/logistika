import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Admin_Route, User_Route} from '../../../utils/const.jsx';
import './layout_cabinet.css'
import LayoutNav from "./layout_navbar/LayoutNav.jsx";
import $API from "../../../utils/http.js";

const Layout_Cabinet = () => {
    const [user, setUser] = useState({
        username: "",
        role: ""
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await $API.get('/auth/user-info/');
                setUser({username: res.data.username, role: res.data.role , uuid: res.data.uuid});
            } catch (e) {
                console.log('Error fetching user data:', e);
            }
        };
        getUserData();
    }, []);

    return (
        <div className={'layout_box'} >
            <LayoutNav user={user}/>
            <div className="content_layout">
                <div className="container">
                    <Routes>
                        {user.role === "user" &&
                            User_Route.map(({path, Component}) => (
                                <Route key={path} path={path} element={Component}/>
                            ))}
                        {user.role === "admin" &&
                            Admin_Route.map(({path, Component}) => (
                                <Route key={path} path={path} element={Component }/>
                            ))}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Layout_Cabinet;
