import React from "react";
import { Menu } from "antd";
import {Link} from "react-router-dom";
import {CABINET, CURRENT_MONTH_USER, CURRENT_YEAR_USER, USER_LIST_ADMIN} from "../../../../utils/const.jsx";

const LeftMenu = ({ mode , user}) => {
  return (
    <Menu mode={mode} >
        {user?.role === 'user' && <>
            <Menu.Item key="explore" ><Link to={CABINET+CURRENT_MONTH_USER} style={{textTransform:"uppercase" , fontWeight:"600"}}>текущий месяц</Link> </Menu.Item>
            <Menu.Item key="features"><Link to={CABINET+CURRENT_YEAR_USER} style={{textTransform:"uppercase",fontWeight:"600"}}>текущий год</Link></Menu.Item>
        </>}
      {user?.role === 'admin' && <>
            <Menu.Item key="explore" ><Link to={CABINET+USER_LIST_ADMIN} style={{textTransform:"uppercase" , fontWeight:"600"}}>Users List</Link> </Menu.Item>
        </>}
    </Menu>
  );
};

export default LeftMenu;