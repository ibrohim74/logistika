import React, {useEffect} from 'react';
import "./navbar.css"
import logo from '../../assets/img/rsz_logo.png'
import {ArrowRightOutlined, DownOutlined} from "@ant-design/icons";
import {Dropdown, Space} from "antd";
import {useLanguage} from "../../utils/lang/LangContext.jsx";
import {languages} from "../../utils/lang/langs.jsx";

const Navbar = ({onlyIcon = true  }) => {
    const {handleLanguageChange, selectedLanguage} = useLanguage();
    useEffect(() => {
        let nav = document.querySelector("nav");
        window.onscroll = function () {
            if (document.documentElement.scrollTop > 20) {
                nav.classList.add("sticky");
            } else {
                nav.classList.remove("sticky");
            }
        }
    }, []);


    return (
        <nav>
            <div className="nav-content">
                <div className="logo">
                    <a href="#"><img src={logo}/></a>
                </div>

                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Skills</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Home</a></li>
                </ul>
                <ul className="nav-links">
                    <li className={'lang_drop'}>
                        <Dropdown
                            menu={{
                                items: languages,
                                onClick: handleLanguageChange,
                            }}
                            style={{cursor:"pointer"}}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space style={{zIndex:9999}}>
                                    {onlyIcon ? (
                                        <>
                                            {selectedLanguage.icon} {selectedLanguage.label} <DownOutlined/>
                                        </>
                                    ) : (
                                        <>
                                            {selectedLanguage.icon} {selectedLanguage.label} <DownOutlined/>
                                        </>
                                    )}
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                    <li style={{
                        display:'flex',
                        justifyContent:"center",
                        alignItems:"center"
                    }}><a href="#" className={"btn login"}>
                        <p>Login</p>
                        <span className="arrowBtn"><ArrowRightOutlined/></span></a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;