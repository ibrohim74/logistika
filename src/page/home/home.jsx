import React, {useState} from 'react';
import "./home.css"
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import {EffectFade, Navigation, Pagination, Autoplay} from 'swiper/modules';
import Navbar from "../../component/navbar/navbar.jsx";
import {ArrowRightOutlined, EnterOutlined} from "@ant-design/icons";
import PriceCalc from "./priceCalc.jsx";

import {Input, message} from "antd";
import Footer from "../../component/footer/footer.jsx";
import {useTranslation} from "react-i18next";
import axios from "axios";

const Home = () => {
    const [initialState, setInitialState] = useState({})
    const {t} = useTranslation();
    const langStorage = window.localStorage.getItem('i18nextLng')
    const [messageApi, contextHolder] = message.useMessage();
    const [disabled, setDisabled] = useState(false);


    const checkForm = () => {
        setDisabled(true);

        const hasNumber = /\d/;

        if (!initialState.username || initialState.username.trim().length === 0) {
            messageApi.open({
                type: 'error',
                content: t('errors.name_empty'),
            });
            setDisabled(false)
            return;
        }

        if (initialState.username.trim().length <= 3 || hasNumber.test(initialState.username)) {
            messageApi.open({
                type: 'error',
                content: t('errors.name_error'),
            });
            setDisabled(false)
            return;
        }

        if (!initialState.tell || initialState.tell.trim().length < 17) {
            messageApi.open({
                type: 'error',
                content: t('errors.tell_error'),
            });
            setDisabled(false)
            return;
        }

        let msg = `<b>Новое сообщение  </b> \n`;
        msg += `\n имя: ${initialState.username}\n`;
        msg += `\n телефон: ${initialState.tell}\n`;


        const TOKEN = "6849867187:AAESn81Py9OGFkncjSNu-eHeoHyc4hA3sm8";
        const CHAT_ID = "-4590200059";

        try {
            axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: msg
            }).then((res) => {
                if (res?.status === 200) {
                    messageApi.open({
                        type: 'success',
                        content: t('errors.success'),
                    });
                    setTimeout(() => {
                        setInitialState({username: "", tell: ""})
                        setDisabled(false)
                    }, 5000);
                }

            })
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: t('errors.server_error'),
            });
            setDisabled(false)
        }

    };

    return (
        <>
            <Navbar/>
            {contextHolder}
            <div className={"swiper_opacity"}>
                <div className="swiper_opacity_block"></div>
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    navigation={false}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    pagination={false}
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img
                            src="https://assets-global.website-files.com/626c0bf09f5203e8159eaaeb/6377b4b730f6adad87e0e3c6_1.jpg"
                            loading={"lazy"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://corp.uzairways.com/sites/default/files/inline-images/img_8296_0.jpg"
                             loading={"lazy"}/>
                    </SwiperSlide>
                </Swiper>


                <div className="container">
                    <div className="header_content">
                        <h1>UzLeader logistics</h1>
                        <p>{t('home_header.p')}</p>

                        <a href="#contacts" className={"btn"}>
                            <p>{t('home_header.contact')}</p>
                            <span className="arrowBtn"><ArrowRightOutlined/></span></a>
                    </div>
                </div>

            </div>

            <section className={" about"} id={'services'}>
                <div className="container">
                    {langStorage === 'ru' || langStorage === "ru-RU" ? (
                        <h1>ВЫ ПОЛУЧИТЕ <span>ЛУЧШИЙ</span> СЕРВИС И КАЧЕСТВО, ЧТО ЕСТЬ НА РАСТУЩЕМ РЫНКЕ ПО ЦЕНАМ,
                            КОТОРЫЕ
                            ПРЕВРАТЯТ
                            ВЛОЖЕНИЯ НА <span>ДОСТАВКУ</span> – В МОЩНЫЙ АКТИВ ВАШЕГО БИЗНЕСА.</h1>
                    ) : ('')}
                    {langStorage === 'en' || langStorage === "en-EN" ? (
                        <h1>You will receive the <span>best service</span> and quality on the growing market at prices
                            that <span>will</span> turn
                            delivery investments into a <span>powerful</span> asset for your <span>business</span>.</h1>
                    ) : (
                        ''
                    )}
                    {langStorage === 'uz' || langStorage === "uz-UZ" ? (
                        <h1>Siz o'sib borayotgan <span>bozorda</span> eng yaxshi
                            <span> xizmat</span> va <span>sifatni</span> olasiz, bu sizning
                            <span> biznesingiz </span>
                            uchun etkazib berish xarajatlarini qudratli <span>aktivga</span> aylantiradi.</h1>
                    ) : (
                        ''
                    )}


                    <div className="about-list">
                        <ul>
                            <li><EnterOutlined/>{t('about.i1')}</li>
                            <li><EnterOutlined/>{t('about.i2')}</li>
                            <li><EnterOutlined/>{t('about.i3')}</li>
                            <li><EnterOutlined/>{t('about.i4')}</li>

                        </ul>
                        <ul>
                            <li><EnterOutlined/>{t('about.i5')}</li>
                            <li><EnterOutlined/>{t('about.i6')}</li>
                            <li><EnterOutlined/>{t('about.i7')}</li>
                        </ul>
                    </div>
                </div>

            </section>

            <PriceCalc/>

            <section className={'car'} id="about">
                <div className="car-opacity"></div>
                <div className="container">
                    <div className="car-title">
                        {langStorage === 'ru' || langStorage === "ru-RU" ? (
                            <h1>ВЫ ВИДИТЕ <span>ПОЛНОЕ СОПРОВОЖДЕНИЕ</span> ДОСТАВКИ – С ТОЧКИ А ДО ТОЧКИ B. КАК
                                ГРУЗЫ <span>БЕРЕЖНО РАЗМЕЩЕНЫ</span> НА
                                ФУРАХ
                                И КАК ОТБЫВАЮТ СО СКЛАДА В СТРОГОМ СООТВЕТСТВИИ СО СТАНДАРТАМИ <span>ISO – 9000</span>.
                            </h1>
                        ) : ('')}
                        {langStorage === 'uz' || langStorage === "uz-UZ" ? (
                            <h1>
                                Siz A nuqtasidan B nuqtasigacha
                                bo‘lgan <span>to‘liq yetkazib berish jarayonini</span> ko‘rasiz.
                                Yuklar yuk
                                mashinalariga <span>ehtiyotkorlik</span> bilan <span>joylashtirilgan</span> va
                                ombordan <span>ISO-9000 </span>
                                standartlariga qat'iy rioya qilgan holda jo‘natiladi.
                            </h1>
                        ) : ('')}
                        {langStorage === 'en' || langStorage === "en-EN" ? (
                            <h1>
                                You <span>see</span> the complete <span>delivery</span> accompaniment – from point A to
                                point B. How the cargo is
                                carefully <span>placed</span> on the trucks and departs from
                                the <span>warehouse</span> in strict accordance with
                                <span>ISO-9000</span> standards.
                            </h1>
                        ) : ('')}
                    </div>
                </div>
            </section>
            <section className={'aboutCompany'}>
                <div className="container">
                    <div className="aboutCompany-title">
                        {langStorage === 'ru' || langStorage === "ru-RU" ? (
                            <h1>
                                Ваш <span>Проект</span> – Наш <span>Приоритет</span>
                            </h1>
                        ) : ('')}
                        {langStorage === 'uz' || langStorage === "uz-UZ" ? (
                            <h1>
                                Sizning <span>Loyihangiz</span> – Bizning <span>Ustuvorligimiz</span>
                            </h1>
                        ) : ('')}
                        {langStorage === 'en' || langStorage === "en-EN" ? (
                            <h1>
                                Your <span>Project</span> – Our <span>Priority</span>
                            </h1>
                        ) : ('')}


                        <p>{t("aboutCompany.titleP")}</p>
                    </div>
                    <div className="aboutCompany-box">
                        <div className="box">
                            <span></span>
                            <div className="content">
                                <h2>{t("aboutCompany.card1.title")}</h2>
                                <p>{t("aboutCompany.card1.description")}</p>

                            </div>
                        </div>
                        <div className="box">
                            <span></span>
                            <div className="content">
                                <h2> {t("aboutCompany.card2.title")}</h2>
                                <p>{t("aboutCompany.card2.description")}</p>
                            </div>
                        </div>
                        <div className="box">
                            <span></span>
                            <div className="content">
                                <h2>{t("aboutCompany.card3.title")}</h2>
                                <p>{t("aboutCompany.card3.description")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="aboutCompany-chart">
                        <div className="aboutCompany-chart-item">
                            <h1>100</h1>
                            <p>{t("aboutCompany.chart.i1")}</p>
                        </div>
                        <div className="aboutCompany-chart-item">
                            <h1>100</h1>
                            <p>{t("aboutCompany.chart.i2")}</p>

                        </div>
                        <div className="aboutCompany-chart-item">
                            <h1>70%</h1>
                            <p>{t("aboutCompany.chart.i3")}</p>

                        </div>
                        <div className="aboutCompany-chart-item" id={'contacts'}>
                            <h1>10 {t("aboutCompany.chart.year")}</h1>
                            <p>{t("aboutCompany.chart.i4")}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact" id={'contacts'}>
                <div className="container">
                    <div className="contact-box">
                        <div className="contact-box-left">
                            {langStorage === 'ru' || langStorage === "ru-RU" ? (
                                <h1><span>Стремитесь</span>, чтобы ваш бизнес <span>приносил</span> высокий
                                    результат <span>24/7</span> – для этого мы с вами в <span>команде!</span></h1>
                            ) : ('')}
                            {langStorage === 'uz' || langStorage === "uz-UZ" ? (
                                <h1><span>Intiling</span>, biznesingiz <span>24/7</span> yuqori
                                    natija <span>berishi</span> uchun
                                    – buning uchun biz siz bilan <span>bir jamoada!</span></h1>
                            ) : ('')}
                            {langStorage === 'en' || langStorage === "en-EN" ? (
                                <h1><span>Strive</span> for your business to <span>deliver</span> high
                                    results <span>24/7</span>
                                    – that's why we are in <span>team</span> with you!</h1>
                            ) : ('')}


                            <p>{t('contact.subtitle')}</p>
                        </div>
                        <div className="contact-box-right">
                            <div className="contact-form">
                                <Input placeholder={t('contact.username')} value={initialState?.username}
                                       onChange={e => setInitialState({...initialState, username: e.target.value})}/>
                                <Input placeholder={"+998"}
                                       value={initialState?.tell}
                                       type={'tell'}
                                       onChange={e => {
                                           const formattedValue = e.target.value.replace(/\D/g, '');
                                           let formattedNumber = '+998';
                                           if (formattedValue.length > 3) {
                                               formattedNumber += ' ' + formattedValue.substring(3, 5);
                                           }
                                           if (formattedValue.length > 5) {
                                               formattedNumber += ' ' + formattedValue.substring(5, 8);
                                           }
                                           if (formattedValue.length > 8) {
                                               formattedNumber += ' ' + formattedValue.substring(8, 10);
                                           }
                                           if (formattedValue.length > 10) {
                                               formattedNumber += ' ' + formattedValue.substring(10, 12);
                                           }
                                           setInitialState({...initialState, tell: formattedNumber});
                                       }}
                                />
                                <button onClick={checkForm} disabled={disabled}>{t('contact.send')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'footer'}>
                <Footer/>
            </section>

        </>
    );
};

export default Home;