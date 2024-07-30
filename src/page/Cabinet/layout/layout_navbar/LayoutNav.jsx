import React, {useEffect, useState} from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu.jsx";
import RightMenu from "./RightMenu.jsx";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import './layoutNav.css'
import logo from '../../../../assets/img/rsz_logo.png'
const LayoutNav = () => {
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState({
        username: "",
        role: ""
    });

    const showDrawer = () => {
        setVisible(!visible);
    };

    // If you do not want to auto-close the mobile drawer when a path is selected
    // Delete or comment out the code block below
    // From here
    let { pathname: location } = useLocation();
    useEffect(() => {
        setVisible(false);
    }, [location]);
    // Upto here




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
        <div className="navbar">
            <Layout>
                <Layout.Header className="nav-header">
                    <a href="/">
                    <div className="logo-layout">

                            <img src={logo} alt=""/>


                    </div> </a>
                    <div className="navbar-menu">
                        <div className="leftMenu">
                            <LeftMenu mode={"horizontal"} user={user}/>
                        </div>
                        <Button className="menuButton" type="text" onClick={showDrawer}>
                            <MenuOutlined />
                        </Button>
                        <div className="rightMenu">
                            <RightMenu mode={"horizontal"} user={user}/>
                        </div>

                        <Drawer
                            title={"Brand Here"}
                            placement="right"
                            closable={true}
                            onClose={showDrawer}
                            visible={visible}
                            style={{ zIndex: 99999 }}
                        >
                            <LeftMenu mode={"inline"} user={user}/>
                            <RightMenu mode={"inline"} user={user}/>
                        </Drawer>
                    </div>
                </Layout.Header>
            </Layout>
        </div>
    );
};

export default LayoutNav;