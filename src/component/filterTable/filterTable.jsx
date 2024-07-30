import React, { useState } from 'react';
import style from "./filterTable.module.css";

const FilterTable = ({ products, onFilterChange }) => {
    const [filterValues, setFilterValues] = useState({
        id: '',
        titleProduct: '',
        status: ''
    });

    const handleFilter = () => {
        let filteredData = products;

        // Filter by ID
        if (filterValues.id !== '') {
            filteredData = filteredData.filter(item => item.id === parseInt(filterValues.id));
        }

        // Filter by TitleProduct (наименование)
        if (filterValues.titleProduct !== '') {
            filteredData = filteredData.filter(item => item.titleProduct.toLowerCase().includes(filterValues.titleProduct.toLowerCase()));
        }

        // Filter by Status
        if (filterValues.status !== '') {
            filteredData = filteredData.filter(item => item.status === filterValues.status);
        }

        // Send the filtered data back to the parent component
        onFilterChange(filteredData);
    };

    const handleIdChange = (e) => {
        setFilterValues({ ...filterValues, id: e.target.value });
    };

    const handleTitleProductChange = (e) => {
        setFilterValues({ ...filterValues, titleProduct: e.target.value });
    };

    const handleStatusChange = (e) => {
        setFilterValues({ ...filterValues, status: e.target.value });
    };

    const handleClearFilter = () => {
        setFilterValues({
            id: '',
            titleProduct: '',
            status: ''
        });
        onFilterChange(products);
    };

    return (
        <div className={style.filterBox}>
            <div className={style.filterBox_panel}>
                <div className={style.filterBox_item} onClick={handleFilter}>
                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.75 10C16.1348 10 20.5 7.98528 20.5 5.5C20.5 3.01472 16.1348 1 10.75 1C5.36522 1 1 3.01472 1 5.5C1 7.98528 5.36522 10 10.75 10Z" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 5.5C1.00253 10.0155 4.10614 13.938 8.5 14.979V21.25C8.5 22.4926 9.50736 23.5 10.75 23.5C11.9926 23.5 13 22.4926 13 21.25V14.979C17.3939 13.938 20.4975 10.0155 20.5 5.5" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={style.filterBox_item}>
                    <input type="number" placeholder="ID" value={filterValues.id} onChange={handleIdChange} />
                </div>
                <div className={style.filterBox_item}>
                    <input type="text" placeholder="Наименование" value={filterValues.titleProduct} onChange={handleTitleProductChange} />
                </div>
                <div className={style.filterBox_item}>
                    <select value={filterValues.status} onChange={handleStatusChange}>
                        <option value="">Статус</option>
                        <option value="на складе Китая">на складе Китая</option>
                        <option value="на складе Узбекистана">на складе Узбекистана</option>
                        <option value="в пути">в пути</option>
                        <option value="Ожидающий">Ожидающий</option>
                        <option value="Завершен">Завершен</option>
                    </select>
                </div>
                <div className={style.filterBox_item} onClick={handleClearFilter}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3.75V0.75L5.25 4.5L9 8.25V5.25C11.4825 5.25 13.5 7.2675 13.5 9.75C13.5 12.2325 11.4825 14.25 9 14.25C6.5175 14.25 4.5 12.2325 4.5 9.75H3C3 13.065 5.685 15.75 9 15.75C12.315 15.75 15 13.065 15 9.75C15 6.435 12.315 3.75 9 3.75Z" fill="#FF4141"/>
                    </svg>
                    Очистить
                </div>
            </div>
        </div>
    );
};

export default FilterTable;
