import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import Logout from '../../../../assets/icons/logout.svg'
import {HOME} from "../../../../utils/const.jsx";
import $API from "../../../../utils/http.js";
const RightMenu = ({ mode, user }) => {

    const logout = async () => {
        try {
            const res = await $API.post('/auth/logout/');
            console.log(res)
            window.localStorage.clear()
            window.location.assign(HOME)
        }catch (e) {
            console.log(e)
            window.localStorage.clear()
            window.location.assign(HOME)
        }

    }

    return (
        <Menu mode={mode}>
            <Menu.SubMenu
                title={
                    <span style={{display:"flex", alignItems:"center"}}>
                        <Avatar icon={<UserOutlined />} style={{marginRight:"20px"}}/>
                        <span className="username">{user?.username}</span>
                    </span>
                }
            >
                <Menu.Item key="log-out" onClick={()=>logout()}>
                   <LogoutOutlined/>
                    Logout
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default RightMenu;