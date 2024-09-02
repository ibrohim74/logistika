import React, { useEffect, useState } from 'react';
import {Form, Input, InputNumber, Popconfirm, Table, Typography, Button, DatePicker} from 'antd';
import FilterTable from "../../../../../component/filterTable/filterTable.jsx";
import style from "../../../user_pages/year_history/year_history_user.module.css";
import * as XLSX from 'xlsx';
import './user_page.css';
import { useParams } from "react-router-dom";
import { Year_historyAPI } from "../../../user_pages/year_history/YearUserAPI.js";
import {UpdateItemProduct} from "./userPageAPI.js";
import moment from "moment";
import $API from "../../../../../utils/http.js";

// Function to get the current month's name
const getCurrentMonthName = () => {
    const monthNames = [
        "январь", "февраль", "март", "апрель", "май", "июнь",
        "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
    ];
    const currentMonthIndex = new Date().getMonth();
    return monthNames[currentMonthIndex];
};

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> :
        dataIndex === 'status' ? (
            <select value={record[dataIndex]} style={{ width: "100px" }}>
                <option value="">Статус</option>
                <option value="на складе Китая">на складе Китая</option>
                <option value="на складе Узбекистана">на складе Узбекистана</option>
                <option value="в пути">в пути</option>
                <option value="Ожидающий">Ожидающий</option>
                <option value="Завершен">Завершен</option>
            </select>
        ) : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please Input ${title}!` }]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const UserPage = () => {
    const [form] = Form.useForm();
    const [products, setProducts] = useState([]);  // Initialize as an empty array
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [newProduct, setNewProduct] = useState({
        titleProduct: '',
        places: '',
        view: '',
        cube: '',
        kg: '',
        cube_kg: '',
        price: '',
        payment: '',
        debt: '',
        where: '',
        date: '',
        transport: '',
        current_place: '',
        status: '',
    });
    const { id } = useParams();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...products];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });

                // Ensure the updated object has all necessary fields
                const updatedItem = { ...item, ...row };
                UpdateItemProduct(updatedItem).then((r) => {
                    console.log(r);
                    setProducts(newData);
                    setFilteredProducts(newData);
                    setEditingKey('');
                });

            } else {
                newData.push(row);
                setProducts(newData);
                setFilteredProducts(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const deleteRow = (key) => {
        const newData = products.filter(item => item.id !== key);
        setProducts(newData);
        setFilteredProducts(newData);
        setEditingKey('');
    };

    const handleFilterChange = (filteredData) => {
        setFilteredProducts(filteredData);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const headers = jsonData[0];
                const rows = jsonData.slice(1).map((row) => {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = row[index];
                    });
                    return obj;
                });

                const mappedRows = rows.map((row, index) => ({
                    id: row['товар ID'] || index + 1,  // Default to index + 1 if no ID
                    titleProduct: row['наименование'] || ``,
                    places: row['места'] || '',
                    view: row['вид'] || '',
                    cube: row['куб'] || '',
                    kg: row['кг'] || '',
                    cube_kg: row['куб/кг'] || '',
                    price: row['цена'] || '',
                    payment: row['оплата'] || '',
                    debt: row['долг клиента'] || '',
                    where: row['откуда'] || '',
                    date: row['дата'] || '',
                    transport: row['машина'] || '',
                    current_place: row['Текущее местоположение'] || '',
                    status: row['Status'] || '',
                }));

                setProducts(mappedRows);
                setFilteredProducts(mappedRows);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleCreate = () => {
        const newProductWithId = {
            id: products.length ? Math.max(products.map(p => p.id)) + 1 : 1,
            ...newProduct,
        };

        setProducts([...products, newProductWithId]);
        setFilteredProducts([...products, newProductWithId]);
        setNewProduct({
            titleProduct: '',
            places: '',
            view: '',
            cube: '',
            kg: '',
            cube_kg: '',
            price: '',
            payment: '',
            debt: '',
            where: '',
            date: '',
            transport: '',
            current_place: '',
            status: '',
        });
    };

    const handleExport = async () => {
        if (!id) return; // Ensure UUID is present
        try {
            const res = await $API.get(`/product/download-excel-filter/`, {
                params: {
                    year: new Date().getFullYear(),
                    uuid:id, // Passing the UUID parameter
                },
                responseType: 'blob',
            });

            const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Monthly_Report_${uuid}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (e) {
            console.error('Error downloading file:', e);
            api.error({
                message: "Error",
                description: "Failed to download the Excel file.",
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        { title: 'товар ID', dataIndex: 'id', key: 'id', editable: true },
        { title: 'наименование', dataIndex: 'title', key: 'title', editable: true },
        { title: 'места', dataIndex: 'places', key: 'places', editable: true },
        { title: 'вид', dataIndex: 'view', key: 'view', editable: true },
        { title: 'куб', dataIndex: 'cube', key: 'cube', editable: true },
        { title: 'кг', dataIndex: 'kg', key: 'kg', editable: true },
        { title: 'куб/кг', dataIndex: 'cube_kg', key: 'cube_kg', editable: true },
        { title: 'цена', dataIndex: 'price', key: 'price', editable: true },
        { title: 'оплата', dataIndex: 'payment', key: 'payment', editable: true },
        { title: 'долг клиента', dataIndex: 'debt', key: 'debt', editable: true },
        { title: 'откуда', dataIndex: 'where_from', key: 'where_from', editable: true },
        {
            title: 'дата',
            dataIndex: 'date',
            key: 'date',
            render: (date,record) => {
                const editable = isEditing(record);
                console.log(editable)
                return editable ? <DatePicker
                    format="YYYY-MM-DD"
                    value={date ? moment(date) : null}
                /> : new Date(date).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
              },
            editable: true
        },
        { title: 'машина', dataIndex: 'transport', key: 'transport', editable: true },
        { title: 'Текущее местоположение', dataIndex: 'current_place', key: 'current_place', editable: true },
        { title: 'Status', dataIndex: 'status', key: 'status', editable: true },
        {
            title: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Typography.Link>
                        <br />
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a style={{ color: 'red' }}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <br />
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.id)}>
                            <a style={{ color: 'red' }}>Delete</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'status' ? 'text' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await Year_historyAPI(id, page);
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

    const handleTableChange = (page) => {
        fetchProducts(page);
    };

    useEffect(() => {
        if (id) {
            fetchProducts(pagination.current);
        }
    }, [id, pagination.current]);

    return (
        <div className={style.products_table}>
            <FilterTable
                products={products}
                type={'user_year'}
                onFilterChange={handleFilterChange}
                uuid={id} // Pass uuid for API filtering
            />

            <div className={style.download_excel_btn} style={{ justifyContent: "flex-end" }}>
                <button onClick={handleExport}>
                    Скачать в формате Excel
                </button>
                <label className={"fileUploadLabel"}>
                    Загрузить Excel
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className={"fileUpload"}
                    />
                </label>
            </div>

            <div className="create_form_userPage">
                <Input placeholder={'наименование'} name="titleProduct" value={newProduct.titleProduct} onChange={handleInputChange} />
                <Input placeholder={'места'} name="places" value={newProduct.places} onChange={handleInputChange} />
                <Input placeholder={'вид'} name="view" value={newProduct.view} onChange={handleInputChange} />
                <Input placeholder={'куб'} name="cube" value={newProduct.cube} onChange={handleInputChange} />
                <Input placeholder={'кг'} name="kg" value={newProduct.kg} onChange={handleInputChange} />
                <Input placeholder={'куб/кг'} name="cube_kg" value={newProduct.cube_kg} onChange={handleInputChange} />
                <Input placeholder={'цена'} name="price" value={newProduct.price} onChange={handleInputChange} />
                <Input placeholder={'оплата'} name="payment" value={newProduct.payment} onChange={handleInputChange} />
                <Input placeholder={'долг клиента'} name="debt" value={newProduct.debt} onChange={handleInputChange} />
                <Input placeholder={'откуда'} name="where" value={newProduct.where} onChange={handleInputChange} />
                <Input placeholder={'дата'} name="date" value={newProduct.date} onChange={handleInputChange} />
                <Input placeholder={'машина'} name="transport" value={newProduct.transport} onChange={handleInputChange} />
                <Input placeholder={'Текущее местоположение'} name="current_place" value={newProduct.current_place} onChange={handleInputChange} />
                <select
                    name="status"
                    value={newProduct.status}
                    onChange={handleInputChange}
                >
                    <option value="">Status</option>
                    <option value="на складе Китая">на складе Китая</option>
                    <option value="на складе Узбекистана">на складе Узбекистана</option>
                    <option value="в пути">в пути</option>
                    <option value="Ожидающий">Ожидающий</option>
                    <option value="Завершен">Завершен</option>
                </select>
                <Button type="primary" onClick={handleCreate}>
                    Создать
                </Button>
            </div>

            <Form form={form} component={false}>
                <Table
                    components={{ body: { cell: EditableCell } }}
                    bordered
                    dataSource={filteredProducts}
                    columns={mergedColumns}
                    rowClassName="editable-row"
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
            </Form>
        </div>
    );
};

export default UserPage;
