import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, notification, Space, Table } from "antd";
import FilterTableUser from "../../../../component/filterTable/filterTableUser.jsx";
import './list_user.css';
import { Link } from "react-router-dom";
import { CABINET, USER_LIST_USER_PAGE_ADMIN } from "../../../../utils/const.jsx";
import { CreateUsersAPI, GetUsersAPI, UpdateUsersAPI } from "./API/AdminUserLIstAPI.jsx";
import $API from "../../../../utils/http.js";

const ListUsers = () => {
    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState({ id: null, username: "", role: "" });
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userUpdateModal, setUserUpdateModal] = useState(false);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        role: "user"
    });
    const [api, contextHolder] = notification.useNotification();
    const [selectedUserUuid, setSelectedUserUuid] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false); // Add loading state to handle loading spinner

    const handleFilterChange = (filteredData) => {
        setFilteredUsers(filteredData);
    };

    const columns = [
        { title: 'Username', dataIndex: 'username', key: 'username' },
        {
            title: 'Update',
            key: 'update',
            render: (_, record) => (
                <Space size="small">
                    <Button className='update_btn' onClick={() => openUpdateModal(record)}>
                        Update
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Month Stat',
            key: 'month_stat',
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" onClick={() => downloadMonth(record.uuid)}>
                        Month
                    </Button>
                </Space>
            ),
        },

        {
            title: 'View',
            key: 'view',
            render: (_, record) => (
                <Space size="small">
                    <Link to={CABINET + USER_LIST_USER_PAGE_ADMIN.replace(':id', record.uuid)}>View</Link>
                </Space>
            ),
        },
    ];

    const openUpdateModal = (user) => {
        setCurrentUser(user);
        setUserUpdateModal(true);
    };




    const handleUpdateUser = async () => {
        if (currentUser.username.length <= 3) {
            api.error({
                message: "Error",
                description: "Username must be at least 4 characters long."
            });
            return;
        }
        try {
            const response = await UpdateUsersAPI(currentUser);

            // Update only the specific user in the userList and filteredUsers
            const updatedUserList = userList.map(user =>
                user.uuid === currentUser.uuid ? { ...user, ...response.data } : user
            );

            setUserList(updatedUserList);

            // Update the filteredUsers list in the same way, ensuring consistency
            const updatedFilteredUsers = filteredUsers.map(user =>
                user.uuid === currentUser.uuid ? { ...user, ...response.data } : user
            );

            setFilteredUsers(updatedFilteredUsers);

            setUserUpdateModal(false);
        } catch (error) {
            api.error({
                message: "Error updating user",
                description: error.message
            });
        }
    };

    const handleCreateUser = async () => {
        if (newUser.username.length <= 3 || newUser.password.length <= 3) {
            api.error({
                message: "Error",
                description: "All fields must be filled out and at least 4 characters long."
            });
            return;
        }
        try {
            const response = await CreateUsersAPI(newUser);
            const updatedUserList = [...userList, response.data];
            setUserList(updatedUserList);
            setFilteredUsers(updatedUserList);
            setCreateUserModal(false);
            setNewUser({ username: "", password: "", role: "user" }); // Reset form
        } catch (error) {
            api.error({
                message: "Error creating user",
                description: error.message
            });
        }
    };



    const downloadMonth = async (uuid) => {
        if (!uuid) return; // Ensure UUID is present
        try {
            const res = await $API.get(`/product/download-excel-filter/${uuid}/`, {
                params: {
                    month: month,

                },
                responseType: 'blob',
            });

            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Monthly_Report_${uuid}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (e) {
            console.error('Error downloading file:', e);
            api.error({
                message: "Error",
                description: "Failed to download the Excel file.",
            });
        }
    };


    const fetchUsers = async (page = 1) => {
        setLoading(true);
        console.log(page)
        try {
            const response = await GetUsersAPI(page, pagination.pageSize); // Update your API call to accept pagination parameters
            const userData = response.data.results;
            setUserList(userData);
            setFilteredUsers(userData);
            setPagination(prev => ({
                ...prev,
                total: response.data.count, // Update the total number of records
                current: page, // Update the current page
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleTableChange = (page) => {
        fetchUsers(page);
    };

    useEffect(() => {
        fetchUsers(pagination.current);
    }, []);

    return (
        <div>
            {contextHolder}
            {/* User update modal */}
            <Modal
                title="Update User"
                open={userUpdateModal}
                onCancel={() => setUserUpdateModal(false)}
            >
                <Input
                    placeholder='Username'
                    value={currentUser.username}
                    onChange={e => setCurrentUser({ ...currentUser, username: e.target.value })}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={currentUser.password || ""}
                    onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
                />
                <select
                    value={currentUser.role}
                    onChange={e => setCurrentUser({ ...currentUser, role: e.target.value })}
                    className='modal_userList_select'
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button
                    onClick={handleUpdateUser}
                    style={{
                        marginTop: "10px",
                        padding: "10px 0",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Update
                </button>
            </Modal>

            {/* Create new user modal */}
            <Modal
                title="Create User"
                open={createUserModal}
                onCancel={() => setCreateUserModal(false)}
            >
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
                    style={{
                        marginTop: "10px",
                        padding: "10px 0",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Create
                </button>
            </Modal>




            <FilterTableUser
                users={userList}
                onFilterChange={handleFilterChange}
                fields={["username"]}
            />
            <Button className={'Create_User_Btn'} type={"primary"}
            onClick={()=>setCreateUserModal(true)}
            >Create</Button>
            <Table
                columns={columns}
                style={{ marginBottom: "100px" }}
                dataSource={filteredUsers}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    onChange: handleTableChange,
                }}
                loading={loading}
                rowKey={record => record.uuid}
            />

        </div>
    );
};

export default ListUsers;
