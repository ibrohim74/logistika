import React, {useEffect, useState} from 'react';
import './login.css';
import truck from '../../assets/img/login_truck.png';
import {notification} from "antd";
import {CABINET, CURRENT_MONTH_USER, USER_LIST_ADMIN} from "../../utils/const.jsx";
import {LoginAPI} from "./loginAPI.js";
import $API from "../../utils/http.js";

const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const [initialState, setInitialState] = useState({
        username: "",
        password: "",
        role: "user"
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!initialState.username) {
            api.error({
                message: 'Error',
                description: 'Please enter a username.',
            });
            return;
        }

        if (!initialState.password) {
            api.error({
                message: 'Error',
                description: 'Please enter a password.',
            });
            return;
        }

        try {
            const response = await LoginAPI(initialState);
            if (response.status === 200) {
                window.localStorage.setItem('user', response.data.token);

                if (response.data.role === 'user') {
                    window.location.assign(CABINET + CURRENT_MONTH_USER);
                } else if (response.data.role === 'admin') {
                    window.location.assign(CABINET + USER_LIST_ADMIN);
                }
            } else {
                api.error({
                    message: 'Login Failed',
                    description: 'Invalid credentials. Please try again.',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            api.error({
                message: 'Login Error',
                description: 'An error occurred while logging in. Please try again later.',
            });
        }
    };
    const fetchData = async () => {
        const userDataString = window.localStorage.getItem('user');
        if (userDataString) {
            try {

                const res = await $API.get('/auth/user-info/');

                if (res.data.role === 'user') {
                    window.location.assign(CABINET + CURRENT_MONTH_USER);
                } else if (res.data.role === 'admin') {
                    window.location.assign(CABINET + USER_LIST_ADMIN);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                window.localStorage.removeItem("user");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [initialState]);
    return (
        <div className='login-box'>
            {contextHolder}
            <div className="login_truck_img">
                <img src={truck} alt="uzbleader cargo"/>
            </div>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1>UzLeader Cargo</h1>
                    <div className="input">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder='Username'
                            autoComplete='new-username'
                            onChange={e => setInitialState({...initialState, username: e.target.value})}
                            value={initialState.username}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            autoComplete='new-password'
                            onChange={e => setInitialState({...initialState, password: e.target.value})}
                            value={initialState.password}
                        />
                    </div>

                    <button type="submit" className='login_btn'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
