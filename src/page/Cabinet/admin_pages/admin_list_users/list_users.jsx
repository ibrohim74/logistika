import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, notification, Space, Table} from "antd";
import FilterTableUser from "../../../../component/filterTable/filterTableUser.jsx";
import './list_user.css';
import {Link} from "react-router-dom";
import {CABINET, USER_LIST_USER_PAGE_ADMIN} from "../../../../utils/const.jsx";
import {CreateUsersAPI, DeleteUsersAPI, GetUsersAPI, UpdateUsersAPI} from "./API/AdminUserLIstAPI.jsx";
import $API from "../../../../utils/http.js";

const ListUsers = () => {
    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState({id: null, username: "", role: ""});
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userUpdateModal, setUserUpdateModal] = useState(false);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        role: "user"
    });
    const [api, contextHolder] = notification.useNotification();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [filtrUsers, setFiltrUsers] = useState();

    const handleMonthChange = (uuid, month) => {
        const updatedMonth = month || currentMonth;
        const updatedUserList = userList.map(user =>
            user.uuid === uuid ? {...user, selectedMonth: updatedMonth} : user
        );
        setUserList(updatedUserList);
        setFilteredUsers(updatedUserList);
    };

    const currentMonth = new Date().getMonth().toString();

    const columns = [
        {title: 'Username', dataIndex: 'username', key: 'username'},
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
            title: 'Month Statistic',
            key: 'month_stat',
            render: (_, record) => (
                <Space size="small">
                    <select
                        value={record.selectedMonth || currentMonth}
                        onChange={(e) => handleMonthChange(record.uuid, e.target.value)}
                        className='modal_userList_select'
                        style={{width: 150}}
                    >
                        <option value="0">Yanvar</option>
                        <option value="1">Fevral</option>
                        <option value="2">Mart</option>
                        <option value="3">Aprel</option>
                        <option value="4">May</option>
                        <option value="5">Iyun</option>
                        <option value="6">Iyul</option>
                        <option value="7">Avgust</option>
                        <option value="8">Sentyabr</option>
                        <option value="9">Oktyabr</option>
                        <option value="10">Noyabr</option>
                        <option value="11">Dekabr</option>
                    </select>

                    <Button type="primary"
                            onClick={() => downloadMonth(record.uuid, record.selectedMonth, record.username)}>
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

    const handleDeleteUser = async () => {
        try {
            await DeleteUsersAPI(currentUser);

            const updatedUserList = userList.filter(user => user.uuid !== currentUser.uuid);
            const updatedFilteredUsers = filteredUsers.filter(user => user.uuid !== currentUser.uuid);

            setUserList(updatedUserList);
            setFilteredUsers(updatedFilteredUsers);
            setUserUpdateModal(false);
            api.success({
                message: "Пользователь успешно удален",
            });
        } catch (e) {
            api.error({
                message: "Ошибка",
                description: "Не удалось удалить пользователя."
            });
        }
    };

    const handleUpdateUser = async () => {
        if (currentUser.username.length <= 3) {
            api.error({
                message: "Ошибка",
                description: "Имя пользователя должно быть длиной не менее 4 символов."
            });
            return;
        }
        try {
            const response = await UpdateUsersAPI(currentUser);

            const updatedUserList = userList.map(user =>
                user.uuid === currentUser.uuid ? {...user, ...response.data} : user
            );

            setUserList(updatedUserList);

            const updatedFilteredUsers = filteredUsers.map(user =>
                user.uuid === currentUser.uuid ? {...user, ...response.data} : user
            );

            setFilteredUsers(updatedFilteredUsers);
            setUserUpdateModal(false);
            api.success({
                message: "Пользователь обновлен успешно",
            });
        } catch (error) {
            api.error({
                message: "Ошибка обновления пользователя",
                description: error.message
            });
        }
    };

    const handleCreateUser = async () => {
        if (newUser.username.length <= 3 || newUser.password.length <= 3) {
            api.error({
                message: "Ошибка",
                description: "Все поля должны быть заполнены и иметь длину не менее 4 символов."
            });
            return;
        }
        try {
            const response = await CreateUsersAPI(newUser);

            const updatedUserList = [...userList, response.data];
            setUserList(updatedUserList);
            setFilteredUsers(updatedUserList);
            setCreateUserModal(false);
            setNewUser({username: "", password: "", role: "user"});
            api.success({
                message: "Новый пользователь успешно создан",

            });
        } catch (error) {
            api.error({
                message: "Ошибка создания пользователя",
                description: error.message
            });
        }
    };

    const downloadMonth = async (uuid, month, username) => {
        const validMonth = (month !== undefined && month !== null) ? month : currentMonth;

        if (!uuid) {
            api.error({
                message: "Ошибка",
                description: "UUID необходим для загрузки файла."
            });
            return;
        }
        try {
            const res = await $API.get(`/product/download-excel-filter/${uuid}/`, {
                params: {
                    month: parseInt(validMonth, 10) + 1,
                },
                responseType: 'blob',
            });

            const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Monthly_Report_${parseInt(validMonth, 10) + 1}_${username}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            api.success({
                message: "файл Excel скачан",
            });
        } catch (e) {
            api.error({
                message: "Ошибка",
                description: "Не удалось загрузить файл Excel.",
            });
        }
    };

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await GetUsersAPI(page, filtrUsers);
            const userData = response.data.results;
            setUserList(userData);
            setFilteredUsers(userData);
            setPagination(prev => ({
                ...prev,
                total: response.data.count,
                current: page,
            }));
        } catch (error) {

            if (error?.response?.status === 404) {
                // Retry with page 1
                const Retry = await GetUsersAPI(1, filtrUsers);
                const userData = Retry.data.results;
                setUserList(userData);
                setFilteredUsers(userData);
                setPagination(prev => ({
                    ...prev,
                    total: Retry.data.count,
                    current: page,
                }));
            } else {
                api.error({
                    message: "Ошибка",
                    description: "Не удалось получить пользователей."
                });
            }

        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (page) => {
        fetchUsers(page);
    };

    useEffect(() => {
        fetchUsers(pagination.current);
    }, [pagination.current, filtrUsers]);

    return (
        <div>
            {contextHolder}
            <Modal
                title="Update User"
                open={userUpdateModal}
                onCancel={() => setUserUpdateModal(false)}
            >
                <Input
                    placeholder='Username'
                    value={currentUser.username}
                    onChange={e => setCurrentUser({...currentUser, username: e.target.value})}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={currentUser.password || ""}
                    onChange={e => setCurrentUser({...currentUser, password: e.target.value})}
                />
                <select
                    value={currentUser.role}
                    onChange={e => setCurrentUser({...currentUser, role: e.target.value})}
                    className='modal_userList_select'
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <div className="update_userList_btns">
                    <Button type="primary" onClick={handleUpdateUser}>Update</Button>
                    <Button type="danger" onClick={handleDeleteUser}>Delete</Button>
                </div>
            </Modal>

            <Modal
                title="Create User"
                open={createUserModal}
                onCancel={() => setCreateUserModal(false)}
            >
                <Input
                    placeholder='Username'
                    value={newUser.username}
                    onChange={e => setNewUser({...newUser, username: e.target.value})}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    value={newUser.password}
                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                />
                <select
                    value={newUser.role}
                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                    className='modal_userList_select'
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <Button
                    type="primary"
                    onClick={handleCreateUser}
                    style={{
                        marginTop: "10px",
                        padding: "10px 0",
                        borderRadius: "5px",
                        border: "none",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Create
                </Button>
            </Modal>

            <FilterTableUser setFiltrUsers={setFiltrUsers}/>
            <Button className='Create_User_Btn' type="primary" onClick={() => setCreateUserModal(true)}>
                Create
            </Button>
            <Table
                columns={columns}
                style={{marginBottom: "100px"}}
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
