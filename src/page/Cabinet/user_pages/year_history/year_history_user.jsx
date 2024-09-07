import React, {useEffect, useState} from 'react';
import style from './year_history_user.module.css';
import {notification, Table} from "antd";

import {Year_historyAPI} from "./YearUserAPI.js";
import $API from "../../../../utils/http.js";
import FilterTableUserPage from "../../../../component/filterTable/filterTableUserPage.jsx";

const getCurrentYear = () => new Date().getFullYear();


const columns = [
    {title: 'товар ID', dataIndex: 'id', key: 'id'},
    {title: 'наименование', dataIndex: 'title', key: 'title'},
    {title: 'места', dataIndex: 'places', key: 'places'},
    {title: 'вид', dataIndex: 'view', key: 'view'},
    {title: 'куб', dataIndex: 'cube', key: 'cube'},
    {title: 'кг', dataIndex: 'kg', key: 'kg'},
    {title: 'куб/кг', dataIndex: 'cube_kg', key: 'cube_kg'},
    {title: 'цена', dataIndex: 'price', key: 'price'},
    {title: 'оплата', dataIndex: 'payment', key: 'payment'},
    {title: 'долг клиента', dataIndex: 'debt', key: 'debt'},
    {title: 'откуда', dataIndex: 'where_from', key: 'where_from'},
    {
        title: 'дата',
        dataIndex: 'date',
        key: 'date',
        render: (date) => new Date(date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }),
    },
    {title: 'машина', dataIndex: 'transport', key: 'transport'},
    {title: 'Текущее местоположение', dataIndex: 'current_place', key: 'current_place'},
    {title: 'Status', dataIndex: 'status', key: 'status'},
];

const YearHistoryUser = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({username: "", role: "", uuid: ""});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [filtrData, setFiltrData] = useState({title: "", status: "", places: ""})

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await Year_historyAPI(user.uuid, page, filtrData);
            if (res.status === 200) {
                setProducts(res.data.results);
                setFilteredProducts(res.data.results);
                setPagination(prev => ({
                    ...prev,
                    total: res.data.count,
                    current: page,
                }));
            } else {
                console.error('Unexpected response status:', res.status);
            }
        } catch (e) {
            console.error('Error fetching products data:', e);
            if (e?.response?.status === 404) {

                const retryRes = await Year_historyAPI(user.uuid, 1, filtrData);
                if (retryRes.status === 200) {
                    setProducts(retryRes.data.results);
                    setFilteredProducts(retryRes.data.results);
                    setPagination(prev => ({
                        ...prev,
                        total: retryRes.data.count,
                        current: 1,
                    }));
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (page) => {
        fetchProducts(page);
    };

    const handleExport = async () => {
        if (!user.uuid) return;
        try {
            const res = await $API.get(`/product/download-excel-filter/${user.uuid}/`, {
                params: {
                    year: new Date().getFullYear(),
                },
                responseType: 'blob',
            });

            const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Year_Report_${new Date().getFullYear()}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (e) {
            console.error('Error downloading file:', e);
            notification.error({
                message: "Ошибка",
                description: "Не удалось скачать файл Excel.",
            });
        }
    };


    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await $API.get('/auth/user-info/');
                setUser({username: res.data.username, role: res.data.role, uuid: res.data.uuid});
            } catch (e) {
                console.error('Error fetching user data:', e);
            }
        };
        getUserData();
    }, []);

    useEffect(() => {

        if (user.uuid) {
            fetchProducts(pagination.current);
        }
    }, [user.uuid, filtrData]);

    return (
        <div className={style.products_table}>
            <FilterTableUserPage
                setFiltrData={setFiltrData}
            />

            <div className={style.download_excel_btn}>
                <h1>данные за {getCurrentYear()} год</h1>
                <button onClick={handleExport}>
                    скачать в формате excel
                </button>
            </div>

            <Table
                columns={columns}
                style={{marginTop: "30px"}}
                dataSource={filteredProducts}
                rowKey="id"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    onChange: handleTableChange,
                }}
                scroll={{
                    x: 1300,
                }}
                loading={loading}
            />
        </div>
    );
};

export default YearHistoryUser;
