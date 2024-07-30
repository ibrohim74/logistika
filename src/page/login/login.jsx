import React, { useEffect, useState } from 'react';
import './login.css';
import truck from '../../assets/img/login_truck.png';
import { notification } from "antd";
import { CABINET, CURRENT_MONTH_USER, USER_LIST_ADMIN } from "../../utils/const.jsx";

const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const [initialState, setInitialState] = useState({
        username: "",
        password: "",
        role: "user"
    });

    useEffect(() => {
        const userDataString = window.localStorage.getItem('user');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                // Redirect based on stored user role if already logged in
                if (userData.role === 'user') {
                    window.location.assign(CABINET + CURRENT_MONTH_USER);
                } else if (userData.role === 'admin') {
                    window.location.assign(CABINET + USER_LIST_ADMIN);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!initialState.username) {
            api.error({
                message: 'Error',
                description: 'Please enter a username.',
            });
        } else if (!initialState.password) {
            api.error({
                message: 'Error',
                description: 'Please enter a password.',
            });
        } else {
            // Save user data to local storage
            window.localStorage.setItem('user', JSON.stringify({
                username: initialState.username,
                role: initialState.role
            }));

            // Redirect based on user role
            if (initialState.role === 'user') {
                window.location.assign(CABINET + CURRENT_MONTH_USER);
            } else if (initialState.role === 'admin') {
                window.location.assign(CABINET + USER_LIST_ADMIN);
            }
        }
    };

    return (
        <div className='login-box'>
            {contextHolder}
            <div className="login_truck_img">
                <img src={truck} alt="uzbleader cargo" />
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
                            onChange={e => setInitialState({ ...initialState, username: e.target.value })}
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
                            onChange={e => setInitialState({ ...initialState, password: e.target.value })}
                            value={initialState.password}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            onChange={e => setInitialState({ ...initialState, role: e.target.value })}
                            value={initialState.role}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className='login_btn'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
