import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';
import FilterTable from "../../../../../component/filterTable/filterTable.jsx";
import style from "../../../user_pages/year_history/year_history_user.module.css";
import * as XLSX from 'xlsx';
import { Excel } from "antd-table-saveas-excel";
import './user_page.css';

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
            <select defaultValue={record[dataIndex]} style={{ width: "100px" }}>
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
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
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
    const [products, setProducts] = useState(generateDummyData(10));
    const [user, setUser] = useState({ username: "", role: "" });
    const [filteredProducts, setFilteredProducts] = useState(products);
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

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            id: '',
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
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setProducts(newData);
                setFilteredProducts(newData);
                setEditingKey('');
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
                    id: row['товар ID'] || '',
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
            id: products.length + 1, // Simple ID generation
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

    const handleExport = () => {
        const excel = new Excel();
        excel
            .addSheet('Sheet1')
            .addColumns(columns.map(col => ({ title: col.title, dataIndex: col.dataIndex })))
            .addDataSource(products)
            .saveAs(`${user.username}-${getCurrentMonthName()}.xlsx`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        { title: 'товар ID', dataIndex: 'id', key: 'id', width: '8%', editable: true },
        { title: 'наименование', dataIndex: 'titleProduct', key: 'titleProduct', width: '10%', editable: true },
        { title: 'места', dataIndex: 'places', key: 'places', width: '8%', editable: true },
        { title: 'вид', dataIndex: 'view', key: 'view', width: '6%', editable: true },
        { title: 'куб', dataIndex: 'cube', key: 'cube', width: '8%', editable: true },
        { title: 'кг', dataIndex: 'kg', key: 'kg', width: '8%', editable: true },
        { title: 'куб/кг', dataIndex: 'cube_kg', key: 'cube_kg', width: '8%', editable: true },
        { title: 'цена', dataIndex: 'price', key: 'price', width: '10%', editable: true },
        { title: 'оплата', dataIndex: 'payment', key: 'payment', width: '10%', editable: true },
        { title: 'долг клиента', dataIndex: 'debt', key: 'debt', width: '8%', editable: true },
        { title: 'откуда', dataIndex: 'where', key: 'where', width: '10%', editable: true },
        { title: 'дата', dataIndex: 'date', key: 'date', width: '10%', editable: true },
        { title: 'машина', dataIndex: 'transport', key: 'transport', width: '10%', editable: true },
        { title: 'Текущее местоположение', dataIndex: 'current_place', key: 'current_place', width: '10%', editable: true },
        { title: 'Status', dataIndex: 'status', key: 'status', width: '10%', editable: true },
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
                            style={{
                                marginRight: 8,
                            }}
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
                inputType: col.dataIndex === 'status' ? 'text' : col.dataIndex === 'cube' ? 'text' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className={style.products_table}>
            <FilterTable
                products={products}
                onFilterChange={handleFilterChange}
            />

            <div className={style.download_excel_btn} style={{justifyContent:"flex-end"}}>
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
                    // style={{ width: "100%" }}
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
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    className={'userPage_table'}
                    bordered
                    dataSource={filteredProducts}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                        pageSize: 10, // Number of items per page
                        showSizeChanger: true, // Allow changing page size
                        pageSizeOptions: ['10', '20', '30', '50'] // Options for page size
                    }}
                />
            </Form>
        </div>
    );
};

export default UserPage;

const generateDummyData = (numItems) => {
    // Generates dummy data for testing
    return Array.from({ length: numItems }, (_, index) => ({
        id: index + 1,
        titleProduct: `tavar ${index + 1}`,
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
        current_place: "sad",
        status: index % 2 === 0 ? "Завершен" : "на складе Китая",
    }));
};
