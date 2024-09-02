import React, { useEffect, useState } from 'react';
import style from './year_history_user.module.css';
import FilterTable from "../../../../component/filterTable/filterTable.jsx";
import { Table } from "antd";
import * as XLSX from 'xlsx';
import { Excel } from "antd-table-saveas-excel";
import { Year_historyAPI } from "./YearUserAPI.js"; // Assuming you have an API module for year history
import $API from "../../../../utils/http.js";

// Function to get the current year
const getCurrentYear = () => new Date().getFullYear();

// Columns configuration for the Table
const columns = [
    { title: 'товар ID', dataIndex: 'id', key: 'id' },
    { title: 'наименование', dataIndex: 'title', key: 'title' },
    { title: 'места', dataIndex: 'places', key: 'places' },
    { title: 'вид', dataIndex: 'view', key: 'view' },
    { title: 'куб', dataIndex: 'cube', key: 'cube' },
    { title: 'кг', dataIndex: 'kg', key: 'kg' },
    { title: 'куб/кг', dataIndex: 'cube_kg', key: 'cube_kg' },
    { title: 'цена', dataIndex: 'price', key: 'price' },
    { title: 'оплата', dataIndex: 'payment', key: 'payment' },
    { title: 'долг клиента', dataIndex: 'debt', key: 'debt' },
    { title: 'откуда', dataIndex: 'where_from', key: 'where_from' },
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
    { title: 'машина', dataIndex: 'transport', key: 'transport' },
    { title: 'Текущее местоположение', dataIndex: 'current_place', key: 'current_place' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
];

const YearHistoryUser = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({ username: "", role: "", uuid: "" });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);

    // Fetching products data with pagination
    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await Year_historyAPI(user.uuid, page); // Make sure you have this API function
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
        } finally {
            setLoading(false);
        }
    };

    // Handling filter change
    const handleFilterChange = (filteredData) => {
        setFilteredProducts(filteredData);
    };

    // Handling table pagination changes
    const handleTableChange = (pagination) => {
        fetchProducts(pagination.current);
    };

    useEffect(() => {
        // Fetching user data
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
        // Fetch products when user data is loaded
        if (user.uuid) {
            fetchProducts(pagination.current);
        }
    }, [user.uuid]);

    return (
        <div className={style.products_table}>
            <FilterTable
                products={products}
                type={'user_year'}
                onFilterChange={handleFilterChange}
                uuid={user.uuid} // Pass uuid for API filtering
            />

            <div className={style.download_excel_btn}>
                <h1>данные за {getCurrentYear()} год</h1>
                <button onClick={() => {
                    const excel = new Excel();
                    excel
                        .addSheet('Yearly Data')
                        .addColumns(columns)
                        .addDataSource(filteredProducts, { str2Percent: true })
                        .saveAs(`${user.username}-${getCurrentYear()}.xlsx`);
                }}>
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
                loading={loading}
            />
        </div>
    );
};

export default YearHistoryUser;
