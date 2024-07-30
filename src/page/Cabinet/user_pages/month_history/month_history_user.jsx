import React, { useEffect, useState } from 'react';
import style from './month_history_user.module.css';
import FilterTable from "../../../../component/filterTable/filterTable.jsx";
import { Table } from "antd";
import * as XLSX from 'xlsx';
import { Excel } from "antd-table-saveas-excel";

// Function to get the current month's name
const getCurrentMonthName = () => {
    const monthNames = [
        "январь", "февраль", "март", "апрель", "май", "июнь",
        "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
    ];
    const currentMonthIndex = new Date().getMonth();
    return monthNames[currentMonthIndex];
};

// Columns configuration for the Table
const columns = [
    { title: 'товар ID', dataIndex: 'id', key: 'id' },
    { title: 'наименование', dataIndex: 'titleProduct', key: 'titleProduct' },
    { title: 'места', dataIndex: 'places', key: 'places' },
    { title: 'вид', dataIndex: 'view', key: 'view' },
    { title: 'куб', dataIndex: 'cube', key: 'cube' },
    { title: 'кг', dataIndex: 'kg', key: 'kg' },
    { title: 'куб/кг', dataIndex: 'cube_kg', key: 'cube_kg' },
    { title: 'цена', dataIndex: 'price', key: 'price' },
    { title: 'оплата', dataIndex: 'payment', key: 'payment' },
    { title: 'долг клиента', dataIndex: 'debt', key: 'debt' },
    { title: 'откуда', dataIndex: 'where', key: 'where' },
    { title: 'дата', dataIndex: 'date', key: 'date' },
    { title: 'машина', dataIndex: 'transport', key: 'transport' },
    { title: 'Текущее местоположение', dataIndex: 'current_place', key: 'current_place' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
];

const generateDummyData = (numItems) => {
    // Generates dummy data for testing
    return Array.from({ length: numItems }, (_, index) => ({
        id: index + 1,
        titleProduct: `Product ${index + 1}`,
        places: `${index * 10}`,
        view: "K",
        cube: `${index + 5}`,
        kg: `${(index + 1) * 100}`,
        cube_kg: "0.01",
        price: `${(index + 1) * 1000}`,
        payment: index % 2 === 0 ? "Paid" : "Unpaid",
        debt: `${index * 50}`,
        where: "Location " + (index + 1),
        date: new Date().toLocaleDateString(),
        transport: index % 2 === 0 ? "Truck" : "Van",
        current_place: index % 2 === 0 ? "Китая" : "Кыргызстан",
        status: index % 2 === 0 ? "Завершен" : "на складе Китая",
    }));
};

const MonthHistoryUser = () => {
    const [products, setProducts] = useState(generateDummyData(10));
    const [user, setUser] = useState({ username: "", role: "" });
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleFilterChange = (filteredData) => {
        setFilteredProducts(filteredData);
    };

    useEffect(() => {
        const userDataString = window.localStorage.getItem('user');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setUser({
                    username: userData.username || "",
                    role: userData.role || ""
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    return (
        <div className={style.products_table}>
            <FilterTable
                products={products}
                onFilterChange={handleFilterChange}
            />

            <div className={style.download_excel_btn}>
                <h1>{getCurrentMonthName()}</h1>
                <button onClick={() => {
                    const excel = new Excel();
                    excel
                        .addSheet('test')
                        .addColumns(columns)
                        .addDataSource(products, { str2Percent: true })
                        .saveAs(`${user?.username}-${getCurrentMonthName()}.xlsx`);
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
                    pageSize: 10, // Number of items per page
                    showSizeChanger: true, // Allow changing page size
                    pageSizeOptions: ['10', '20', '30', '50'] // Options for page size
                }}
            />
        </div>
    );
};

export default MonthHistoryUser;
