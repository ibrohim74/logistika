import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import Logout from '../../../../assets/icons/logout.svg'
import {HOME} from "../../../../utils/const.jsx";
const RightMenu = ({ mode, user }) => {
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
                <Menu.Item key="log-out" onClick={()=>{
                    window.localStorage.clear()
                    window.location.assign(HOME)
                }}>
                   <LogoutOutlined/>
                    Logout
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default RightMenu;