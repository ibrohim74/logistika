import React, {useEffect, useState} from "react";
import {Layout, Button, Drawer} from "antd";
import LeftMenu from "./LeftMenu.jsx";
import RightMenu from "./RightMenu.jsx";
import {MenuOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";
import './layoutNav.css'
import logo from '../../../../assets/img/logoUzLeader.png'


const LayoutNav = ({user}) => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(!visible);
    };
    let {pathname: location} = useLocation();
    useEffect(() => {
        setVisible(false);
    }, [location]);
    return (
        <div className="navbar">
            <Layout>
                <Layout.Header className="nav-header">
                    <a href="/">
                        <div className="logo-layout">

                            <img src={logo} alt=""/>


                        </div>
                    </a>
                    <div className="navbar-menu">
                        <div className="leftMenu">
                            <LeftMenu mode={"horizontal"} user={user}/>
                        </div>
                        <Button className="menuButton" type="text" onClick={showDrawer}>
                            <MenuOutlined/>
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
                            style={{zIndex: 99999}}
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