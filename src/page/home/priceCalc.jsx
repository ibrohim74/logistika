import React, {useState} from 'react';
import './home.css'
import {Input, Select, Typography} from "antd";

const PriceCalc = () => {
    const [initialState , setInitialState] = useState({
        transport:"poyezd"
    })
    const handleChangeTransport = (val) =>{
        setInitialState({...initialState , transport:val})
    }
    console.log(initialState)
    return (
        <div className={'calc'} style={{marginTop: "50px"}}>
            <div className="container">
                <div className="calc-box">
                    <h1>Узнайте <span>стоимость доставки</span> за минуту <br/> с консультантами <span>Thompson Cargo</span></h1>
                    <form>
                        <div className="box-input">
                            <div className="input">
                                <Typography.Title level={5}>Выбрать транспорт*</Typography.Title>
                                <Select
                                    defaultValue={initialState?.transport}
                                    style={{ width: '100%', height:"50px" }}
                                    onChange={handleChangeTransport}
                                    options={[
                                        { value: 'poyezd', label: 'Железнодорожные перевозки' },
                                        { value: 'truck', label: 'Автомобильные перевозки' },
                                    ]}
                                />
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>Наименование груза*</Typography.Title>
                                <Input placeholder="Наименование груза*"/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>Вес (в килограммах)*</Typography.Title>
                                <Input placeholder="Вес (в килограммах)*"/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>Объем (куб 3²)*</Typography.Title>
                                <Input placeholder={"Объем (куб 3²)*"}/>
                            </div>

                        </div>
                        <div className="box-input">
                            <div className="input">
                                <Typography.Title level={5}>Откуда (страна)*</Typography.Title>
                                <Input placeholder={"Откуда (страна)*"}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>Куда (страна)*</Typography.Title>
                                <Input placeholder={"Куда (страна)*"}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>Ваше имя*</Typography.Title>
                                <Input placeholder={"Ваше имя*"}/>
                            </div>
                            <div className="input">
                                <Typography.Title level={5}>Введите номер телефона</Typography.Title>
                                <Input placeholder={"+998"}
                                       value={initialState?.contact}
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
                            ПОЛУЧИТЬ РАСЧЕТ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCalc;