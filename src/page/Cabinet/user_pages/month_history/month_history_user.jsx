import React, { useEffect, useState } from 'react';
import style from './month_history_user.module.css';
import FilterTable from "../../../../component/filterTable/filterTable.jsx";
import { Table, notification } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { GetExcelAPI, Month_historyAPI } from "./MonthUserAPI.js";
import $API from "../../../../utils/http.js";

const getCurrentMonthName = () => {
    const monthNames = [
        "январь", "февраль", "март", "апрель", "май", "июнь",
        "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
    ];
    const currentMonthIndex = new Date().getMonth();
    return monthNames[currentMonthIndex];
};

const columns = [
    { title: 'товар ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: 'наименование', dataIndex: 'title', key: 'title', width: 200 },
    { title: 'места', dataIndex: 'places', key: 'places', width: 150 },
    { title: 'вид', dataIndex: 'view', key: 'view', width: 150 },
    { title: 'куб', dataIndex: 'cube', key: 'cube', width: 100 },
    { title: 'кг', dataIndex: 'kg', key: 'kg', width: 100 },
    { title: 'куб/кг', dataIndex: 'cube_kg', key: 'cube_kg', width: 120 },
    { title: 'цена', dataIndex: 'price', key: 'price', width: 120 },
    { title: 'оплата', dataIndex: 'payment', key: 'payment', width: 120 },
    { title: 'долг клиента', dataIndex: 'debt', key: 'debt', width: 150 },
    { title: 'откуда', dataIndex: 'where_from', key: 'where_from', width: 150 },
    {
        title: 'дата',
        dataIndex: 'date',
        key: 'date',
        width: 120,
        render: (date) => {
            const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            return formattedDate;
        },
    },
    { title: 'машина', dataIndex: 'transport', key: 'transport', width: 150 },
    { title: 'Текущее местоположение', dataIndex: 'current_place', key: 'current_place', width: 200 },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 120 },
];

const MonthHistoryUser = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({ username: "", role: "", uuid: "" });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();
    const [filtrData, setFiltrData] = useState({title:"" , status:""});

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await Month_historyAPI(user.uuid, page , filtrData );
            if (res.status === 200) {
                setProducts(res.data.results);
                setFilteredProducts(res.data.results);
                setPagination(prevPagination => ({
                    ...prevPagination,
                    total: res.data.count,
                    current: page,
                }));
            } else {
                console.error('Unexpected response status:', res.status);
            }
        } catch (e) {
            console.error('Error fetching products data:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (page) => {
        fetchProducts(page);
    };

    const downloadMonth = async (uuid) => {
        if (!uuid) return; // Ensure UUID is present
        try {
            const res = await $API.get(`/product/download-excel-filter/${uuid}/`, {
                params: { month: new Date().getMonth() + 1 }, // Assuming you want the current month
                responseType: 'blob',
            });

            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Monthly_Report_${new Date().getMonth() + 1}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (e) {
            api.error({
                message: "Error",
                description: "Failed to download the Excel file.",
            });
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await $API.get('/auth/user-info/');
                setUser({ username: res.data.username, role: res.data.role, uuid: res.data.uuid });
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
    }, [user.uuid , filtrData]);

    return (
        <div className={style.products_table}>
            {contextHolder}
            <FilterTable
                setFiltrData={setFiltrData}
            />

            <div className={style.download_excel_btn}>
                <h1>{getCurrentMonthName()}</h1>
                <button onClick={() => downloadMonth(user.uuid)}>
                    скачать в формате excel
                </button>
            </div>

            <Table
                columns={columns}
                style={{ marginTop: "30px" }}
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

export default MonthHistoryUser;
