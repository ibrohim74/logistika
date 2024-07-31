import React, {Suspense, useState} from 'react';
import "./home.css"
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import {EffectFade, Navigation, Pagination, Autoplay} from 'swiper/modules';
import Navbar from "../../component/navbar/navbar.jsx";
import {ArrowRightOutlined, EnterOutlined} from "@ant-design/icons";
import PriceCalc from "./priceCalc.jsx";
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";

import mapPhoto from '../../assets/pngegg.png'
import {Input} from "antd";

const Home = () => {
    const [initialState , setInitialState] = useState({})
    return (
        <div>
            <Navbar/>
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
                        <h1>Thompson Cargo</h1>
                        <p>Надежная, срочная, быстрая перевозка грузов по выгодным ценам из Китая в Узбекистан –
                            контейнеры (целые и сборные), фуры, консолидация по железной и автодорогам
                        </p>

                        <a href="#" className={"btn"}>
                            <p>Контакты</p>
                            <span className="arrowBtn"><ArrowRightOutlined/></span></a>
                    </div>
                </div>

            </div>

            <section className={" about"}>
                <div className="container">
                    <h1>ВЫ ПОЛУЧИТЕ <span>ЛУЧШИЙ</span> СЕРВИС И КАЧЕСТВО, ЧТО ЕСТЬ НА РАСТУЩЕМ РЫНКЕ ПО ЦЕНАМ, КОТОРЫЕ
                        ПРЕВРАТЯТ
                        ВЛОЖЕНИЯ НА <span>ДОСТАВКУ</span> – В МОЩНЫЙ АКТИВ ВАШЕГО БИЗНЕСА.</h1>

                    <div className="about-list">
                        <ul>
                            <li><EnterOutlined/>Ваш контейнер или сборный груз будут доставлены вовремя каждый раз</li>
                            <li><EnterOutlined/>Крепление сборных грузов</li>
                            <li><EnterOutlined/>Подача контейнеров на склад отправителя: 40HQ; 45 HQ</li>
                            <li><EnterOutlined/>Полная прозрачность всех операций и договоров</li>

                        </ul>
                        <ul>
                            <li><EnterOutlined/>Весь процесс будет сопровождаться нашей командой профессионалов</li>
                            <li><EnterOutlined/>Фотоотчет с погрузки</li>
                            <li><EnterOutlined/>Ежедневное информирование о местонахождении Вашего груза</li>
                        </ul>
                    </div>
                </div>

            </section>

            <PriceCalc/>

            <section className={' car'}>
                <div className="car-opacity"></div>
                <div className="container">
                    <div className="car-title">
                        <h1>ВЫ ВИДИТЕ <span>ПОЛНОЕ СОПРОВОЖДЕНИЕ</span> ДОСТАВКИ – С ТОЧКИ А ДО ТОЧКИ B. КАК
                            ГРУЗЫ <span>БЕРЕЖНО РАЗМЕЩЕНЫ</span> НА
                            ФУРАХ
                            И КАК ОТБЫВАЮТ СО СКЛАДА В СТРОГОМ СООТВЕТСТВИИ СО СТАНДАРТАМИ ISO – 9000.</h1>
                    </div>
                </div>
            </section>
            <section className={'aboutCompany'}>
                <div className="container">
                    <div className="aboutCompany-title">
                        <h1>Ваш <span>Проект</span> – Наш <span>Приоритет</span></h1>
                        <p>В Thompson Company мы придаем особое значение каждому вашему проекту, обеспечивая внимание к
                            деталям и индивидуальный подход. С нами вы получаете наиболее оптимальные условия доставки и
                            решения, которые соответствуют вашим потребностям.</p>
                    </div>
                    <div className="aboutCompany-box">
                        <div className="box">
                            <span></span>
                            <div className="content">
                                <h2>Эксперты по Логистике и Доставке</h2>
                                <p>Наша команда состоит из профессионалов, которые специализируются на работе с грузами
                                    различных видов и размеров. Благодаря нашему опыту и знаниям, мы предлагаем лучшие
                                    решения в области международной логистики и доставки грузов.</p>

                            </div>
                        </div>
                        <div className="box">
                            <span></span>
                            <div className="content">
                                <h2> Индивидуальные Логистические Решения</h2>
                                <p>Мы предоставляем комплексные логистические решения, адаптированные под ваши нужды.
                                    Наша цель – обеспечить надежную и эффективную доставку вашего груза, используя
                                    индивидуальный подход к каждому проекту.</p>
                            </div>
                        </div>
                        <div className="box">
                            <span></span>
                            <div className="content">
                                <h2>Надежность и Эффективность</h2>
                                <p>Thompson Company – это ваш надежный партнер в логистике. Мы стремимся предложить
                                    наилучшие условия для каждого клиента, гарантируя своевременную и безопасную
                                    доставку вашего груза.</p>
                            </div>
                        </div>
                    </div>
                    <div className="aboutCompany-chart">
                       <div className="aboutCompany-chart-item">
                           <h1>100</h1>
                          <p>довольный клиенты</p>
                       </div>
                        <div className="aboutCompany-chart-item">
                           <h1>100</h1>
                            <p>выполненные заказы</p>

                        </div>
                        <div className="aboutCompany-chart-item">
                           <h1>70%</h1>
                            <p>выбрали работу с нами на постоянной основе</p>

                        </div>
                        <div className="aboutCompany-chart-item">
                           <h1>10 лет</h1>
                            <p>успешной работы на рынке</p>
                       </div>
                    </div>
                </div>
            </section>

            <section className="contact">
                <div className="container">
                    <div className="contact-box">
                        <div className="contact-box-left">
                            <h1><span>Стремитесь</span>, чтобы ваш бизнес  <span>приносил</span> высокий результат <span>24/7</span> –для этого мы с вами в <span>команде!</span></h1>
                            <p>UzLeader Cargo – детально расскажут каждом шаге партнёрства во всех деталях и помогут вам принять решение.</p>
                        </div>
                        <div className="contact-box-right">
                            <div className="contact-form">
                                <Input placeholder={'Ваше имя'}/>
                                <Input placeholder={"+998"}
                                       value={initialState?.tellNumber}
                                       type={'tell'}
                                       onChange={e => {
                                           const formattedValue = e.target.value.replace(/\D/g, ''); // faqat raqamlarni qabul qilish
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
                                           setInitialState({...initialState, tellNumber: formattedNumber});
                                       }}
                                />
                                <button>отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;