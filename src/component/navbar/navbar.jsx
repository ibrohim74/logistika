import React, {useEffect, useState} from "react";
import "./navbar.css";
import logo from "../../assets/img/rsz_logo.png";
import {ArrowRightOutlined, CloseOutlined, DownOutlined, MenuOutlined} from "@ant-design/icons";
import {Dropdown, Space} from "antd";
import {useLanguage} from "../../utils/lang/LangContext.jsx";
import {languages} from "../../utils/lang/langs.jsx";
import {Link} from "react-router-dom";
import {LOGIN} from "../../utils/const.jsx";
import {useTranslation} from "react-i18next";

const Navbar = ({onlyIcon = true}) => {
    const {handleLanguageChange, selectedLanguage} = useLanguage();
    const [navClicker, setNavClicker] = useState(false);
    const { t } = useTranslation();
    // Toggle navigation menu in mobile view
    const handleChangeNav = () => {
        setNavClicker((current) => !current);
    };

    // Add sticky class to navbar on scroll
    useEffect(() => {
        const nav = document.querySelector("nav");
        const handleScroll = () => {
            if (document.documentElement.scrollTop > 20) {
                nav.classList.add("sticky");
            } else {
                nav.classList.remove("sticky");
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav>
            <button onClick={handleChangeNav} aria-label="Toggle Navigation Menu">
                {navClicker ? <CloseOutlined style={{color: "black"}}/> : <MenuOutlined style={{color: "white"}}/>}
            </button>
            <div className="nav-content">
                <div className="logo">
                    <a href="#">
                        <img src={logo} alt="Logo"/>
                    </a>
                </div>
                <div className="nav-menu1">
                    <ul className="nav-links">
                        <li>
                            <a href="#">{t('nav.home')}</a>
                        </li>
                        <li>
                            <a href="#">{t('nav.about')}</a>
                        </li>
                        <li>
                            <a href="#">{t('nav.services')}</a>
                        </li>
                        <li>
                            <a href="#">{t('nav.contact')}</a>
                        </li>
                    </ul>
                    <ul className="nav-links">
                        <li className={"lang_drop"}>
                            <Dropdown
                                menu={{
                                    items: languages,
                                    onClick: handleLanguageChange,
                                }}
                                trigger={["click"]}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {selectedLanguage.icon} {selectedLanguage.label} <DownOutlined/>
                                    </Space>
                                </a>
                            </Dropdown>
                        </li>
                        <li
                            className={"login-li"}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Link to={LOGIN} className={"btn login"} style={{margin: 0}}>
                                <p>{t('nav.login')}</p>
                                <span className="arrowBtn">
                                   <ArrowRightOutlined/>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`nav-menu ${navClicker ? "active" : ""}`}>
                <ul className="nav-links nav-list">
                    <li>
                        <a href="#">{t('nav.home')}</a>
                    </li>
                    <li>
                        <a href="#">{t('nav.about')}</a>
                    </li>
                    <li>
                        <a href="#">{t('nav.services')}</a>
                    </li>
                    <li>
                        <a href="#">{t('nav.contact')}</a>
                    </li>
                </ul>
                <ul className="nav-links">
                    <li className={"lang_drop"}>
                        <Dropdown
                            menu={{
                                items: languages,
                                onClick: handleLanguageChange,
                            }}
                            trigger={["click"]}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {selectedLanguage.icon} {selectedLanguage.label} <DownOutlined/>
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                    <li
                        className={"login-li"}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Link to={LOGIN} className={"btn login"} style={{margin: 0}}>
                            <p>{t('nav.login')}</p>
                            <span className="arrowBtn">
                                   <ArrowRightOutlined/>
                                </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
