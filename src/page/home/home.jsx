import React, {Suspense} from 'react';
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
import {Car} from "../../component/Scene";


const Home = () => {
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
                            src="https://assets-global.website-files.com/626c0bf09f5203e8159eaaeb/6377b4b730f6adad87e0e3c6_1.jpg" loading={"lazy"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://corp.uzairways.com/sites/default/files/inline-images/img_8296_0.jpg" loading={"lazy"}/>
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
                <div className="container">
                    <h1>ВЫ ВИДИТЕ <span>ПОЛНОЕ СОПРОВОЖДЕНИЕ</span> ДОСТАВКИ – С ТОЧКИ А ДО ТОЧКИ B. КАК ГРУЗЫ <span>БЕРЕЖНО РАЗМЕЩЕНЫ</span> НА
                        ФУРАХ
                        И КАК ОТБЫВАЮТ СО СКЛАДА В СТРОГОМ СООТВЕТСТВИИ СО СТАНДАРТАМИ ISO – 9000.</h1>

                    {/*<Canvas className={'canvas'}>*/}
                    {/*    <ambientLight/>*/}
                    {/*    <spotLight intensity={0.9} angle={0.1} penumber={1} position={[10, 15, 10]} castShadow/>*/}
                    {/*    <Suspense fallback={'loading'}>*/}
                    {/*        <Car/>*/}
                    {/*    </Suspense>*/}

                    {/*    <OrbitControls*/}
                    {/*        enablePan={false}*/}
                    {/*        enableZoom={false}*/}
                    {/*        enableDamping={true}*/}
                    {/*        autoRotate={true}*/}
                    {/*        minPolarAngle={Math.PI / 2} // Vertikal harakatni faqat x o'qi bo'yicha cheklash*/}
                    {/*        maxPolarAngle={Math.PI / 2}/>*/}
                    {/*</Canvas>*/}
                </div>
            </section>
        </div>
    );
};

export default Home;