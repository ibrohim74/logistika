import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    nav: {
                        home: "Home",
                        about: "About us",
                        services: "services",
                        contact: "contact",
                        login: "Login",
                    },
                    home_header: {
                        p: "Reliable, urgent, fast transportation of goods at competitive prices from China to Uzbekistan - containers (whole and combined), trucks, consolidation by rail and road",
                        contact: "Contact"
                    },
                    about: {
                        title: "You will receive the best service and quality on the growing market at prices that will turn delivery investments into a powerful asset for your business.",
                        i1: "Your container or consolidated cargo will be delivered on time every time",
                        i2: "Securing consolidated cargo",
                        i3: "Delivery of containers to the sender's warehouse: 40HQ; 45 HQ",
                        i4: "Full transparency of all operations and contracts",
                        i5: "The entire process will be monitored by our team of professionals",
                        i6: "Photo report of the loading process",
                        i7: "Daily updates on the location of your cargo",
                    },
                    priceCalc: {
                        transport: {
                            title: "Select Transport*",
                            item1: "Rail Transport",
                            item2: "Road Transport",
                        },
                        nameProduct: "Cargo Name*",
                        weight: "Weight (in kilograms)*",
                        cube: "Volume (cubic meters)*",
                        where: "From (country)*",
                        where2: "To (country)*",
                        username: "Your Name*",
                        tell: "Enter Phone Number",
                        getCalc: "GET QUOTE"
                    },
                    aboutCompany: {
                        titleP: "At UzLeader logistics, we pay special attention to each of your projects, ensuring attention to detail and an individual approach. With us, you get the most optimal delivery conditions and solutions that meet your needs.",
                        card1: {
                            title: "Logistics and Delivery Experts",
                            description: "Our team consists of professionals who specialize in handling cargo of various types and sizes. With our experience and knowledge, we offer the best solutions in international logistics and cargo delivery."
                        },
                        card2: {
                            title: "Customized Logistics Solutions",
                            description: "We provide comprehensive logistics solutions tailored to your needs. Our goal is to ensure reliable and efficient delivery of your cargo, using an individual approach to each project."
                        },
                        card3: {
                            title: "Reliability and Efficiency",
                            description: "UzLeader logistics is your reliable partner in logistics. We strive to offer the best conditions for each client, guaranteeing timely and safe delivery of your cargo."
                        },

                        chart: {
                            i1: "satisfied clients",
                            i2: "completed orders",
                            i3: "chose to work with us on a permanent basis",
                            i4: "successful years in the market",
                            year: "year"
                        }


                    },
                    contact: {
                        subtitle: "UzLeader Cargo will detail every step of the partnership and help you make a decision.",
                        username: "Your name",
                        send: "Send"
                    },
                    footer: {
                        title: "For questions, call us or write via Telegram. We are working every day from 10:00 AM to 6:00 PM.",
                        mail: "send a message by email",
                        call: "call now"
                    },
                    errors: {
                        name_empty: "Enter your name",
                        name_error: "The name must be at least 3 letters long",
                        tell_error: "Invalid phone number",
                        product_name_empty: "Enter the name of the product",
                        weight_error: "Weight must be greater than 0",
                        cube_error: "Cube must be greater than 0",
                        where_empty: "Enter the origin location",
                        where2_empty: "Enter the destination location",
                        server_error: "An error occurred on the server",
                        success: "Sent successfully"
                    }


                }
            },
            uz: {
                translation: {
                    nav: {
                        home: "Bosh sahifa",
                        about: "Biz haqimizda",
                        services: "xizmatlar",
                        contact: "Aloqa",
                        login: "Kirish",
                    },
                    home_header: {
                        p: "Yuklarni ishonchli, tezkor, raqobatbardosh narxlarda Xitoydan O'zbekistonga tez tashib kelish- konteynerlar (butun va terma),yuk mashinalari, temir va avto yo'llari bo’yicha konsolidatsiya",
                        contact: "Aloqa"
                    },
                    about: {
                        title: "Siz o'sib borayotgan bozorda eng yaxshi xizmat va sifatni olasiz, bu sizning biznesingiz uchun etkazib berish xarajatlarini qudratli aktivga aylantiradi.",
                        i1: "Sizning konteyneringiz yoki yig‘ma yukingiz har safar o‘z vaqtida yetkazib beriladi",
                        i2: "Yig‘ma yuklarni mustahkamlash",
                        i3: "Jo‘natuvchining omboriga konteynerlar yetkazib berish: 40HQ; 45 HQ",
                        i4: "Barcha operatsiyalar va shartnomalarning to‘liq shaffofligi",
                        i5: "Butun jarayon bizning professional jamoamiz tomonidan kuzatib boriladi",
                        i6: "Yuklash jarayonidan foto hisobot",
                        i7: "Yukingizning joylashuvi haqida kundalik ma’lumot",
                    },
                    priceCalc: {
                        transport: {
                            title: "Transportni tanlang*",
                            item1: "Temir yo'l transporti",
                            item2: "Avtomobil transporti",
                        },
                        nameProduct: "Yukning nomi*",
                        weight: "Og'irligi (kilogrammda)*",
                        cube: "Hajmi (kub metrda)*",
                        where: "Qayerdan (mamlakat)*",
                        where2: "Qayerga (mamlakat)*",
                        username: "Sizning ismingiz*",
                        tell: "Telefon raqamingizni kiriting",
                        getCalc: "HISOB KITOBNI OLISH"
                    },
                    aboutCompany: {
                        titleP: "UzLeader logistics'da biz har bir loyihangizga alohida e'tibor beramiz, tafsilotlarga e'tibor va individual yondashuvni ta'minlaymiz. Biz bilan siz eng maqbul yetkazib berish sharoitlari va ehtiyojlaringizga mos keladigan yechimlarni olasiz.",
                        card1: {
                            title: "Logistika va Yetkazib Berish Mutaxassislari",
                            description: "Bizning jamoamiz turli xil va o‘lchamdagi yuklar bilan ishlashda ixtisoslashgan mutaxassislardan iborat. Tajribamiz va bilimlarimiz tufayli biz xalqaro logistika va yuk tashish sohasida eng yaxshi yechimlarni taklif etamiz."
                        },
                        card2: {
                            title: "Individual Logistika Yechimlari",
                            description: "Biz sizning ehtiyojlaringizga moslashgan kompleks logistik yechimlarni taqdim etamiz. Bizning maqsadimiz – har bir loyihaga individual yondashuvdan foydalanib, yukingizni ishonchli va samarali yetkazib berishni ta'minlash."
                        },
                        card3: {
                            title: "Ishonchlilik va Samaradorlik",
                            description: "UzLeader logistics – bu logistikadagi ishonchli hamkoringiz. Biz har bir mijoz uchun eng yaxshi sharoitlarni taklif qilishga intilamiz, yukingizning o‘z vaqtida va xavfsiz yetkazib berilishini kafolatlaymiz."
                        },

                        chart: {
                            i1: "qoniqqan mijozlar",
                            i2: "bajarilgan buyurtmalar",
                            i3: "biz bilan doimiy hamkorlikni tanlaganlar",
                            i4: "bozorda muvaffaqiyatli faoliyat",
                            year: "yil"
                        }


                    },
                    contact: {
                        subtitle: "UzLeader Cargo – sizga hamkorlikning har bir bosqichini batafsil tushuntirib beradi va qaror qabul qilishingizda yordam beradi.",
                        username: "Ismingiz",
                        send: "Yuborish"
                    },
                    footer: {
                        title: "Savollar bo'lsa, telefon orqali qo'ng'iroq qiling yoki Telegram orqali yozing. Biz har kuni soat 10:00 dan 18:00 gacha ishlaymiz.",
                        mail: "Mail yuborish",
                        call: "Hozir qo'ng'iroq qiling"
                    },
                    errors: {
                        name_empty: "Ismingizni kiriting",
                        name_error: "Ism kamida 3 harfdan iborat bo'lishi kerak",
                        tell_error: "Noto'g'ri telefon raqami",
                        product_name_empty: "Mahsulot nomini kiriting",
                        weight_error: "Og'irlik 0 dan katta bo'lishi kerak",
                        cube_error: "Hajm 0 dan katta bo'lishi kerak",
                        where_empty: "Jo'natish joyini kiriting",
                        where2_empty: "Manzilni kiriting",
                        server_error: "Serverda xatolik yuz berdi",
                        success: "Muvaffaqiyatli yuborildi"
                    }

                }
            },
            ru: {
                translation: {
                    nav: {
                        home: "Главная",
                        about: "О нас",
                        services: "УСЛУГИ",
                        contact: "Контакты",
                        login: "Логин",
                    },
                    home_header: {
                        p: "Надежная, срочная, быстрая перевозка грузов по выгодным ценам из Китая в Узбекистан – контейнеры (целые и сборные), фуры, консолидация по железной и автодорогам.",
                        contact: "Контакты"
                    },
                    about: {
                        title: "Вы получите лучший сервис и качество на растущем рынке по ценам, которые превратят вложения на доставку в мощный актив вашего бизнеса.",
                        i1: "Ваш контейнер или сборный груз будут доставлены вовремя каждый раз",
                        i2: "Крепление сборных грузов",
                        i3: "Подача контейнеров на склад отправителя: 40HQ; 45 HQ",
                        i4: "Полная прозрачность всех операций и договоров",
                        i5: "Весь процесс будет сопровождаться нашей командой профессионалов",
                        i6: "Фотоотчет с погрузки",
                        i7: "Ежедневное информирование о местонахождении Вашего груза",
                    },
                    priceCalc: {
                        transport: {
                            title: "Выбрать транспорт*",
                            item1: "Железнодорожные перевозки",
                            item2: "Автомобильные перевозки",
                        },
                        nameProduct: "Наименование груза*",
                        weight: "Вес (в килограммах)*",
                        cube: "Объем (куб 3²)*",
                        where: "Откуда (страна)*",
                        where2: "Куда (страна)*",
                        username: "Ваше имя*",
                        tell: "Введите номер телефона",
                        getCalc: "ПОЛУЧИТЬ РАСЧЕТ"
                    },
                    aboutCompany: {
                        titleP: "В UzLeader logistics мы придаем особое значение каждому вашему проекту, обеспечивая внимание к деталям и индивидуальный подход. С нами вы получаете наиболее оптимальные условия доставки и решения, которые соответствуют вашим потребностям.",
                        card1: {
                            title: "Эксперты по Логистике и Доставке",
                            description: "Наша команда состоит из профессионалов, которые специализируются на работе с грузами различных видов и размеров. Благодаря нашему опыту и знаниям, мы предлагаем лучшие решения в области международной логистики и доставки грузов."
                        },
                        card2: {
                            title: "Индивидуальные Логистические Решения",
                            description: "Мы предоставляем комплексные логистические решения, адаптированные под ваши нужды. Наша цель – обеспечить надежную и эффективную доставку вашего груза, используя индивидуальный подход к каждому проекту."
                        },
                        card3: {
                            title: "Надежность и Эффективность",
                            description: "UzLeader logistics – это ваш надежный партнер в логистике. Мы стремимся предложить наилучшие условия для каждого клиента, гарантируя своевременную и безопасную доставку вашего груза."
                        },
                        chart: {
                            i1: "довольный клиенты",
                            i2: "выполненные заказы",
                            i3: "выбрали работу с нами на постоянной основе",
                            i4: "успешной работы на рынке",
                            year: "лет"
                        }
                    },
                    contact: {
                        subtitle: "UzLeader Cargo – детально расскажут каждом шаге партнёрства во всех деталях и помогут вам принять решение.",
                        username: "Ваше имя",
                        send: "отправить"
                    },
                    footer: {
                        title: "При вопросах – звоните по телефонам или напишите по телеграм Мы на связи каждый день с 10:00 до 18:00",
                        mail: "отправить сообщение по почте",
                        call: "позвонить сейчас"
                    },
                    errors: {
                        name_empty: "Введите ваше имя",
                        name_error: "Имя должно содержать не менее 3 букв",
                        tell_error: "Неверный номер телефона",
                        product_name_empty: "Введите название продукта",
                        weight_error: "Вес должен быть больше 0",
                        cube_error: "Объем должен быть больше 0",
                        where_empty: "Введите место отправления",
                        where2_empty: "Введите место назначения",
                        server_error: "Произошла ошибка на сервере",
                        success: "Отправлено успешно"
                    }

                }
            },
        },
    });

export default i18n;
