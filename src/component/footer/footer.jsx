import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <div className={'container'}>

            <div className="footer-box">
                <div className="footer-box-left">
                    <iframe
                        style={{borderRadius:"15px"}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48013.31980114136!2d69.2158464!3d41.225420799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae619c133eb16b%3A0x11ae46411f42093d!2zMy3QkdC10LrQsNGC!5e0!3m2!1sru!2s!4v1722450694462!5m2!1sru!2s"
                        width="100%" height="100%" allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="footer-box-right">
                    <div className="footer-box-right-top">
                        <p>При вопросах – звоните по телефонам или напишите по телеграм
                            Мы на связи каждый день с 10:00 до 18:00</p>
                        <h1><span>+998 99 123 45 67</span></h1>
                    </div>
                    <div className="footer-box-right-bottom">
                        <a className={"button gradient-border"} href="#">
                            <span><i className="far fa-envelope-open"></i> отправить сообщение по почте</span>
                            <span>office@uzleadercargo.com</span>
                        </a>
                        <a className={"button gradient-border"} href="#">
                            <span><i className="far fa-envelope-open"></i> позвонить сейчас</span>
                            <span>+998 99 123 45 67</span>
                        </a>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Footer;