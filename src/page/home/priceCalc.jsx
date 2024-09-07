import React, { useState } from 'react';
import './home.css';
import { Input, message, Select, Typography } from "antd";
import { useTranslation } from "react-i18next";
import axios from "axios";

const PriceCalc = () => {
    const [initialState, setInitialState] = useState({
        transport: "poyezd",
        username: "",
        tell: "",
        nameProduct: "",
        weight: "",
        cube: "",
        where: "",
        where2: ""
    });
    const { t } = useTranslation();
    const langStorage = window.localStorage.getItem('i18nextLng');
    const [messageApi, contextHolder] = message.useMessage();
    const [disabled, setDisabled] = useState(false);

    const handleChangeTransport = (val) => {
        setInitialState({ ...initialState, transport: val });
    };

    const checkForm = () => {
        setDisabled(true);
        const hasNumber = /\d/;

        // Validate username
        if (!initialState.username || initialState.username.trim().length === 0) {
            messageApi.open({
                type: 'error',
                content: t('errors.name_empty'),
            });
            setDisabled(false);
            return;
        }

        if (initialState.username.trim().length <= 3 || hasNumber.test(initialState.username)) {
            messageApi.open({
                type: 'error',
                content: t('errors.name_error'),
            });
            setDisabled(false);
            return;
        }

        // Validate phone number
        if (!initialState.tell || initialState.tell.trim().length < 17) {
            messageApi.open({
                type: 'error',
                content: t('errors.tell_error'),
            });
            setDisabled(false);
            return;
        }

        // Validate name of the product
        if (!initialState.nameProduct || initialState.nameProduct.trim().length === 0) {
            messageApi.open({
                type: 'error',
                content: t('errors.product_name_empty'), // Add a corresponding translation key
            });
            setDisabled(false);
            return;
        }

        // Validate weight
        if (!initialState.weight || initialState.weight <= 0) {
            messageApi.open({
                type: 'error',
                content: t('errors.weight_error'), // Add a corresponding translation key
            });
            setDisabled(false);
            return;
        }

        // Validate cube
        if (!initialState.cube || initialState.cube <= 0) {
            messageApi.open({
                type: 'error',
                content: t('errors.cube_error'), // Add a corresponding translation key
            });
            setDisabled(false);
            return;
        }

        // Validate origin location
        if (!initialState.where || initialState.where.trim().length === 0) {
            messageApi.open({
                type: 'error',
                content: t('errors.where_empty'), // Add a corresponding translation key
            });
            setDisabled(false);
            return;
        }

        // Validate destination location
        if (!initialState.where2 || initialState.where2.trim().length === 0) {
            messageApi.open({
                type: 'error',
                content: t('errors.where2_empty'), // Add a corresponding translation key
            });
            setDisabled(false);
            return;
        }

        // Prepare the message to send
        let msg = `<b>Новое сообщение  </b> \n`;
        msg += `\n имя: ${initialState.username}\n`;
        msg += `\n телефон: ${initialState.tell}\n`;
        msg += `\n Наименование груза: ${initialState.nameProduct}\n`;
        msg += `\n транспорт: ${initialState.transport}\n`;
        msg += `\n Вес (в килограммах): ${initialState.weight} кг\n`;
        msg += `\n Объем (куб 3²): ${initialState.cube} куб 3²\n`;
        msg += `\n Откуда (страна): ${initialState.where}\n`;
        msg += `\n Куда (страна): ${initialState.where2}\n`;

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
                        setInitialState({
                            transport: "poyezd",
                            username: "",
                            tell: "",
                            nameProduct: "",
                            weight: "",
                            cube: "",
                            where: "",
                            where2: ""
                        });
                        setDisabled(false);
                    }, 5000);
                }
            });
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: t('errors.server_error'),
            });
            setDisabled(false);
        }
    };

    return (
        <div className={'calc'} style={{ marginTop: "50px" }}>
            {contextHolder}
            <div className="container">
                <div className="calc-box">
                    {langStorage === 'ru' || langStorage === "ru-RU" ? (
                        <h1>Узнайте
                            <span>стоимость доставки</span> за минуту
                            <br /> с консультантами <span>UzLeader logistics</span>
                        </h1>
                    ) : ('')}
                    {langStorage === 'uz' || langStorage === "uz-UZ" ? (
                        <h1><span>UzLeader logistics</span>
                            konsultantlari <span>bilan </span> <br />
                            bir daqiqada <span>yetkazib berish</span> narxini
                            bilib oling
                        </h1>
                    ) : ('')}
                    {langStorage === 'en' || langStorage === "en-EN" ? (
                        <h1>
                            <span>Find out </span>
                            the delivery cost in <br /> <span>one minute </span>
                            with <span>UzLeader logistics</span> consultants
                        </h1>
                    ) : ('')}

                    <form>
                        <div className="box-input">
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.transport.title")}</Typography.Title>
                                <Select
                                    defaultValue={initialState?.transport}
                                    style={{ width: '100%', height: "50px" }}
                                    onChange={handleChangeTransport}
                                    options={[
                                        { value: 'poyezd', label: t("priceCalc.transport.item1") },
                                        { value: 'truck', label: t("priceCalc.transport.item2") },
                                    ]}
                                />
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.nameProduct")}</Typography.Title>
                                <Input placeholder={t("priceCalc.nameProduct")}
                                       value={initialState?.nameProduct}
                                       onChange={e => setInitialState({ ...initialState, nameProduct: e.target.value })}
                                />
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.weight")}</Typography.Title>
                                <Input placeholder={t("priceCalc.weight")}
                                       type="number"
                                       value={initialState?.weight}
                                       onChange={e => setInitialState({ ...initialState, weight: e.target.value })} />

                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.cube")}</Typography.Title>
                                <Input placeholder={t("priceCalc.cube")}
                                       type="number"
                                       value={initialState?.cube}
                                       onChange={e => setInitialState({ ...initialState, cube: e.target.value })}
                                />
                            </div>

                        </div>
                        <div className="box-input">
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.where")}</Typography.Title>
                                <Input placeholder={t("priceCalc.where")}
                                       value={initialState?.where}
                                       onChange={e => setInitialState({ ...initialState, where: e.target.value })}
                                />
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.where2")}</Typography.Title>
                                <Input placeholder={t("priceCalc.where2")}
                                       value={initialState?.where2}
                                       onChange={e => setInitialState({ ...initialState, where2: e.target.value })}
                                />
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.username")}</Typography.Title>
                                <Input placeholder={t("priceCalc.username")}
                                       value={initialState?.username}
                                       onChange={e => setInitialState({ ...initialState, username: e.target.value })}
                                />
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>{t("priceCalc.tell")}</Typography.Title>
                                <Input placeholder={"+998"}
                                       value={initialState?.tell}
                                       type={'tell'}
                                       onChange={e => {
                                           const formattedValue = e.target.value.replace(/\D/g, ''); // Accept only numbers
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
                                           setInitialState({ ...initialState, tell: formattedNumber });
                                       }}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="priceCalc-send">
                        <button onClick={checkForm} disabled={disabled}>
                            {t("priceCalc.getCalc")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCalc;
