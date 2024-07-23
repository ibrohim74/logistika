import React, {useEffect, useState} from 'react';
import "./navbar.css"
import logo from '../../assets/img/rsz_logo.png'
import {ArrowRightOutlined, CloseOutlined, DownOutlined, MenuOutlined} from "@ant-design/icons";
import {Dropdown, Space} from "antd";
import {useLanguage} from "../../utils/lang/LangContext.jsx";
import {languages} from "../../utils/lang/langs.jsx";

const Navbar = ({onlyIcon = true}) => {
    const {handleLanguageChange, selectedLanguage} = useLanguage();
    const [navClicker, setNavClicker] = useState(false);
    const handleChangeNav = () => {
        setNavClicker(current => !current);
    };

    console.log(navClicker)
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
            <button onClick={handleChangeNav} aria-label="Toggle Navigation Menu">
                {navClicker ? <CloseOutlined color={"black"}/> : <MenuOutlined style={{color: "white"}}/>}
            </button>
            <div className="nav-content">
                <div className="logo">
                    <a href="#"><img src={logo}/></a>
                </div>
                <div className="nav-menu1">
                    <ul className="nav-links">
                        <li><a href="#">Главная</a></li>
                        <li><a href="#">О нас</a></li>
                        <li><a href="#">УСЛУГИ</a></li>
                        <li><a href="#">Контакты</a></li>
                    </ul>
                    <ul className="nav-links">
                        <li className={'lang_drop'}>
                            <Dropdown
                                menu={{
                                    items: languages,
                                    onClick: handleLanguageChange,
                                }}
                                style={{cursor: "pointer"}}
                                trigger={['click']}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{zIndex: 9999}}>
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
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "center"
                        }}><a href="#" className={"btn login"}>
                            <p>Login</p>
                            <span className="arrowBtn"><ArrowRightOutlined/></span></a></li>
                    </ul>
                </div>
            </div>
            <div className={`nav-menu ${navClicker ? 'active' : ''}`}>
                <ul className="nav-links nav-list">
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">УСЛУГИ</a></li>
                    <li><a href="#">Контакты</a></li>
                </ul>
                <ul className="nav-links">
                    <li className={'lang_drop'}>
                        <Dropdown
                            menu={{
                                items: languages,
                                onClick: handleLanguageChange,
                            }}
                            style={{cursor: "pointer"}}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space style={{zIndex: 9999}}>
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
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                    }}><a href="#" className={"btn login"} style={{margin: 0}}>
                        <p>Login</p>
                        <span className="arrowBtn"><ArrowRightOutlined/></span></a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;