import React from 'react';
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
import {ArrowRightOutlined} from "@ant-design/icons";


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
                            src="https://assets-global.website-files.com/626c0bf09f5203e8159eaaeb/6377b4b730f6adad87e0e3c6_1.jpg"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://corp.uzairways.com/sites/default/files/inline-images/img_8296_0.jpg"/>
                    </SwiperSlide>
                </Swiper>


                <div className="container">
                    <div className="header_content">
                        <h1>Delivering technology</h1>
                        <p>Il software basato su intelligenza artificiale che ottimizza le operazioni di trasporto
                            consegnando oggi le soluzioni di domani.
                        </p>

                        <a href="#" className={"btn"}>
                            <p>Contact</p>
                            <span className="arrowBtn"><ArrowRightOutlined/></span></a>
                    </div>
                </div>

            </div>

            <div style={{marginTop: "2000px"}}></div>
        </div>
    );
};

export default Home;