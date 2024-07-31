import React, {useState} from 'react';
import './home.css'
import {Input, Select, Typography} from "antd";
import {useTranslation} from "react-i18next";

const PriceCalc = () => {
    const [initialState, setInitialState] = useState({
        transport: "poyezd"
    })
    const {t} = useTranslation();
    const langStorage = window.localStorage.getItem('i18nextLng')
    const handleChangeTransport = (val) => {
        setInitialState({...initialState, transport: val})
    }
    console.log(initialState)
    return (
        <div className={'calc'} style={{marginTop: "50px"}}>
            <div className="container">
                <div className="calc-box">
                    {langStorage === 'ru' || langStorage === "ru-RU" ? (
                        <h1>Узнайте
                            <span>стоимость доставки</span> за минуту
                            <br/> с консультантами <span>Thompson Cargo</span>
                        </h1>
                    ) : ('')}
                    {langStorage === 'uz' || langStorage === "uz-UZ" ? (
                        <h1><span>Thompson Cargo </span>
                            konsultantlari <span>bilan </span> <br/>
                            bir daqiqada <span>yetkazib berish</span> narxini
                            bilib oling
                        </h1>
                    ) : ('')}
                    {langStorage === 'en' || langStorage === "en-EN" ? (
                        <h1>
                            <span>Find out </span>
                            the delivery cost in <br/> <span>one minute </span>
                            with <span>Thompson Cargo</span> consultants
                        </h1>
                    ) : ('')}

                    <form>
                        <div className="box-input">
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.transport.title")}</Typography.Title>
                                <Select
                                    defaultValue={initialState?.transport}
                                    style={{width: '100%', height: "50px"}}
                                    onChange={handleChangeTransport}
                                    options={[
                                        {value: 'poyezd', label: t("priceCalc.transport.item1")},
                                        {value: 'truck', label: t("priceCalc.transport.item2")},
                                    ]}
                                />
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.nameProduct")}</Typography.Title>
                                <Input placeholder={t("priceCalc.nameProduct")}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.weight")}</Typography.Title>
                                <Input placeholder={t("priceCalc.weight")}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.cube")}</Typography.Title>
                                <Input placeholder={t("priceCalc.cube")}/>
                            </div>

                        </div>
                        <div className="box-input">
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.where")}</Typography.Title>
                                <Input placeholder={t("priceCalc.where")}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.where2")}</Typography.Title>
                                <Input placeholder={t("priceCalc.where2")}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.username")}</Typography.Title>
                                <Input placeholder={t("priceCalc.username")}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.tell")}</Typography.Title>
                                <Input placeholder={"+998"}
                                       value={initialState?.contact}
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
                                           setInitialState({...initialState, contact: formattedNumber});
                                       }}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="priceCalc-send">
                        <button>
                            {t("priceCalc.getCalc")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCalc;