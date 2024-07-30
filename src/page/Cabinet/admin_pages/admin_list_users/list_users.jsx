import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, notification, Space, Table } from "antd";
import FilterTableUser from "../../../../component/filterTable/filterTableUser.jsx";
import './list_user.css';
import { Link } from "react-router-dom";
import { CABINET, USER_LIST_USER_PAGE_ADMIN } from "../../../../utils/const.jsx";

const generateDummyData = (numItems) => {
    return Array.from({ length: numItems }, (_, index) => ({
        id: index + 1,
        usernames: `username ${index + 1}`,
        year_stat: `Year ${index + 20}`, // Just for example
    }));
};

const ListUsers = () => {
    const [userList, setUserList] = useState(generateDummyData(10));
    const [currentUser, setCurrentUser] = useState({ id: null, username: "", role: "" });
    const [filteredUsers, setFilteredUsers] = useState(userList);
    const [userUpdateModal, setUserUpdateModal] = useState(false);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [userMonthModal, setUserMonthModal] = useState(false);
    const [userYearModal, setUserYearModal] = useState(false);

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        role: "user"
    });

    const [api, contextHolder] = notification.useNotification();

    const handleFilterChange = (filteredData) => {
        setFilteredUsers(filteredData);
    };

    const columns = [
        { title: 'User ID', dataIndex: 'id', key: 'id' },
        { title: 'Username', dataIndex: 'usernames', key: 'usernames' },
        {
            title: 'Update',
            dataIndex: 'update',
            key: 'update',
            render: (_, record) => (
                <Space size="small">
                    <button className={'update_btn'} onClick={() => openUpdateModal(record)}>
                        Update
                    </button>
                </Space>
            ),
        },
        {
            title: 'Month Stat',
            dataIndex: 'month_stat',
            key: 'month_stat',
            render: (_, record) => (
                <Space size="small">
                    <Button type={"primary"} onClick={() => setUserMonthModal(true)}>
                        Month
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Year Stat',
            dataIndex: 'year_stat',
            key: 'year_stat',
            render: (_, record) => (
                <Space size="small">
                    <button className={'year_btn'} onClick={() => setUserYearModal(true)}>
                        Year
                    </button>
                </Space>
            ),
        },
        {
            title: 'View',
            dataIndex: 'view',
            key: 'view',
            render: (_, record) => (
                <Space size="small">
                    <Link to={CABINET + USER_LIST_USER_PAGE_ADMIN.replace(':id', record.id)}>view</Link>
                </Space>
            ),
        },
    ];

    const openUpdateModal = (user) => {
        setCurrentUser(user);
        setUserUpdateModal(true);
    };

    const handleUpdateUser = () => {
        if (currentUser.username.length <= 3) {
            api.error({
                message: "Error",
                description: "Username must be at least 4 characters long."
            });
        } else {
            const updatedUserList = userList.map(user =>
                user.id === currentUser.id ? { ...user, usernames: currentUser.username, role: currentUser.role } : user
            );
            setUserList(updatedUserList);
            setFilteredUsers(updatedUserList); // Ensure filtered list is also updated
            setUserUpdateModal(false);
        }
    };

    const handleCreateUser = () => {
        if (newUser.username.length <= 3 || newUser.password.length <= 3) {
            api.error({
                message: "Error",
                description: "All fields must be filled out and at least 4 characters long."
            });
        } else {
            const newUserEntry = {
                id: userList.length + 1, // Simple ID generation
                usernames: newUser.username,
                year_stat: `Year ${userList.length + 20}`, // Just for example
            };

            setUserList([...userList, newUserEntry]);
            setFilteredUsers([...userList, newUserEntry]); // Ensure filtered list is also updated
            setNewUser({
                username: "",
                password: "",
                role: "user"
            });
            setCreateUserModal(false);
        }
    };

    useEffect(() => {
        const userDataString = window.localStorage.getItem('user');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setCurrentUser({
                    username: userData.username || "",
                    role: userData.role || ""
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    return (
        <div>
            {contextHolder}
            {/* User update modal */}
            <Modal title="Update User" open={userUpdateModal} onCancel={() => setUserUpdateModal(false)}>
                <Input
                    placeholder='Username'
                    value={currentUser.username}
                    onChange={e => setCurrentUser({ ...currentUser, username: e.target.value })}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={currentUser.password}
                    onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                />
                <select
                    value={currentUser.role}
                    onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button
                    type="primary"
                    onClick={handleUpdateUser}
                    style={{ marginTop: "10px" }}
                >
                    Update
                </button>
            </Modal>

            {/* Create new user */}
            <Modal title="Create User" open={createUserModal} onCancel={() => setCreateUserModal(false)}>
                <Input
                    placeholder='Username'
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
                <select
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                    className='modal_userList_select'
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button

                    onClick={handleCreateUser}
                    style={{ marginTop: "10px" , padding:"10px 0" , borderRadius:"5px" , border:"none" , outline:"none" , color:"white" , cursor:"pointer"}}
                >
                    Create
                </button>
            </Modal>

            {/* User month modal */}
            <Modal title="User Month" open={userMonthModal} onCancel={() => setUserMonthModal(false)}>
                <div className="btn_modal_user_list">
                    <button>Download as Excel</button>
                    <label className="fileUploadLabel">
                        Upload Excel
                        <Input
                            type="file"
                            accept=".xlsx, .xls"
                            className="fileUpload"
                        />
                    </label>
                </div>
            </Modal>

            {/* User year modal */}
            <Modal title="User Year" open={userYearModal} onCancel={() => setUserYearModal(false)}>
                <div className="btn_modal_user_list">
                    <button>Download as Excel</button>
                    <label className="fileUploadLabel">
                        Upload Excel
                        <Input
                            type="file"
                            accept=".xlsx, .xls"
                            className="fileUpload"
                        />
                    </label>
                </div>
            </Modal>

            <FilterTableUser
                users={userList}
                onFilterChange={handleFilterChange}
            />
            <div className='download_excel_btn'>
                <button onClick={() => setCreateUserModal(true)}>
                    Create New User
                </button>
            </div>
            <Table
                columns={columns}
                style={{ marginTop: "30px" }}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{
                    pageSize: 20, // Number of items per page
                    showSizeChanger: true, // Allow changing page size
                }}
            />
        </div>
    );
};

export default ListUsers;
