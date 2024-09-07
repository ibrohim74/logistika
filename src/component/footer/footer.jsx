import React from 'react';
import './footer.css'
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <div className={'container'}>

            <div className="footer-box">
                <div className="footer-box-left">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24007.573667265828!2d69.12046343476564!3d41.2229318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae639c647c68d3%3A0x1cec839d997e2ee0!2sHighway%20Logistics%20Center!5e0!3m2!1sru!2s!4v1725696476248!5m2!1sru!2s"
                        width="100%" height="100%"  allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="footer-box-right">
                    <div className="footer-box-right-top">
                        <p>{t('footer.title')}</p>
                        <h1><span>+998 99 800 24 25</span></h1>
                    </div>
                    <div className="footer-box-right-bottom">
                        <a className={"button gradient-border"} href="mailto:office@uzleaderlogitics.com">
                            <span><i className="far fa-envelope-open"></i> {t('footer.mail')}</span>
                            <span>office@uzleaderlogitics.com</span>
                        </a>
                        <a className={"button gradient-border"} href="tel:+998998002425">
                            <span><i className="fa fa-phone"></i> {t('footer.call')}</span>
                            <span>+998 99 800 24 25</span>
                        </a>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Footer;