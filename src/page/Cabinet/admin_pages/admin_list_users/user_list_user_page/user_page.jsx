import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Table, Typography, Button, DatePicker, Drawer, notification} from 'antd';
import style from "../../../user_pages/year_history/year_history_user.module.css";
import './user_page.css';
import {useParams} from "react-router-dom";
import {Year_historyAPI} from "../../../user_pages/year_history/YearUserAPI.js";
import {CreateItemProduct, DeleteItemProduct, UpdateItemProduct} from "./userPageAPI.js";
import moment from "moment";
import $API from "../../../../../utils/http.js";
import FilterTableUserPage from "../../../../../component/filterTable/filterTableUserPage.jsx";

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
    const inputNode = inputType === 'number' ? <InputNumber/> :
        dataIndex === 'status' ? (
            <select value={record[dataIndex]} style={{width: "100px"}}>
                <option value="">Статус</option>
                <option value="На складе Китая">На складе Китая</option>
                <option value="На складе Узбекистана">На складе Узбекистана</option>
                <option value="в пути">В пути</option>
                <option value="Ожидающий">Ожидающий</option>
                <option value="Завершен">Завершен</option>
            </select>
        ) : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[{required: false, message: `Please Input ${title}!`}]}
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
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const {id} = useParams();
    const [newProduct, setNewProduct] = useState({date: "", user_uuid: id});
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [createOpen, setCreateOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filtrData, setFiltrData] = useState({title: "", status: "", places: ""});

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
            const newData = [...filteredProducts];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});

                const updatedItem = {
                    ...item,
                    ...row,
                };
                const response = await UpdateItemProduct(updatedItem);
                if (response.status === 200) {
                    setProducts(newData);
                    setFilteredProducts(newData);
                    setEditingKey('');
                    notification.success({
                        message: 'Успех',
                        description: 'Продукт успешно обновлен.',
                    });
                } else {
                    notification.error({
                        message: 'Ошибка',
                        description: 'Не удалось сохранить изменения.',
                    });
                }
            } else {
                newData.push(row);
                setProducts(newData);
                setFilteredProducts(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            notification.error({
                message: 'Ошибка',
                description: 'Не удалось сохранить изменения.',
            });
        }
    };

    const deleteRow = async (key) => {
        const newData = products.filter(item => item.id !== key);
        const response = await DeleteItemProduct(id, key);
        if (response.status === 204) {
            setProducts(newData);
            setFilteredProducts(newData);
            setEditingKey('');
            notification.success({
                message: 'Продукт успешно удален.',
            });
        } else {
            notification.error({
                message: 'Ошибка',
                description: 'Не удалось удалить продукт.',
            });
        }
    };


    const handleCreate = async () => {
        if (newProduct.title && newProduct.status) {
            const productWithFormattedDate = {
                ...newProduct,
                date: newProduct.date ? moment(newProduct.date).toISOString() : new Date().toISOString(),
            };

            const response = await CreateItemProduct(productWithFormattedDate);
            if (response.status === 201) {
                const newProductWithId = {
                    id: products.length ? Math.max(products.map(p => p.id)) + 1 : 1,
                    ...productWithFormattedDate,
                };

                setProducts([...products, newProductWithId]);
                setFilteredProducts([...products, newProductWithId]);
                setNewProduct({status: "", user_uuid: id});
                setCreateOpen(false); // Close the drawer after creating the product
                notification.success({
                    message: "успешно добавлено",
                });
            }
        } else {
            notification.error({
                message: 'Ошибка',
                description: 'Пожалуйста, заполните все обязательные поля.',
            });
        }
    };

    const handleExport = async () => {
        if (!id) return;
        try {
            const res = await $API.get(`/product/download-excel-filter/${id}/`, {
                params: {
                    year: new Date().getFullYear(),
                },
                responseType: 'blob',
            });

            const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Yearly_Report_${new Date().getFullYear()}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            notification.success({
                message: "файл Excel скачан",
            });
        } catch (e) {
            console.error('Error downloading file:', e);
            notification.error({
                message: "Ошибка",
                description: "Не удалось скачать файл Excel.",
            });
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        {title: 'товар ID', dataIndex: 'id', key: 'id', editable: true},
        {title: 'наименование', dataIndex: 'title', key: 'title', editable: true},
        {title: 'места', dataIndex: 'places', key: 'places', editable: true},
        {title: 'вид', dataIndex: 'view', key: 'view', editable: true},
        {title: 'куб', dataIndex: 'cube', key: 'cube', editable: true},
        {title: 'кг', dataIndex: 'kg', key: 'kg', editable: true},
        {title: 'куб/кг', dataIndex: 'cube_kg', key: 'cube_kg', editable: true},
        {title: 'цена', dataIndex: 'price', key: 'price', editable: true},
        {title: 'оплата', dataIndex: 'payment', key: 'payment', editable: true},
        {title: 'долг клиента', dataIndex: 'debt', key: 'debt', editable: true},
        {title: 'откуда', dataIndex: 'where_from', key: 'where_from', editable: true},
        {
            title: 'дата',
            dataIndex: 'date',
            key: 'date',
            render: (date, record) => {
                const editable = isEditing(record);
                return editable ? <DatePicker
                    format="YYYY-MM-DD"
                    value={date ? moment(date) : null}
                /> : new Date(date).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
            },
            editable: true
        },
        {title: 'машина', dataIndex: 'transport', key: 'transport', editable: true},
        {title: 'Текущее местоположение', dataIndex: 'current_place', key: 'current_place', editable: true},
        {title: 'Status', dataIndex: 'status', key: 'status', editable: true},
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
                            style={{marginRight: 8}}
                        >
                            Save <br/>
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a style={{color: 'red'}}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit <br/>
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.id)}>
                            <a style={{color: 'red'}}>Delete</a>
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
            const res = await Year_historyAPI(id, page, filtrData);
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
                // Retry with page 1
                const retryRes = await Year_historyAPI(id, 1, filtrData);
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

    useEffect(() => {
        if (id) {
            fetchProducts(pagination.current);
        }
    }, [id, pagination.current, filtrData]);
    return (
        <div className={style.products_table}>
            <FilterTableUserPage
                setFiltrData={setFiltrData}
            />

            <div className={style.download_excel_btn}>
                <Button type="primary" onClick={() => setCreateOpen(true)} style={{width: "170px", height: "45px"}}>
                    Create
                </Button>

                <div className="excel_userPage_btn" style={{display: "flex", justifyContent: "flex-end"}}>
                    <button onClick={handleExport}>
                        Скачать в формате Excel
                    </button>
                </div>
            </div>

            <Drawer className="create_form_userPage" open={createOpen} width={720} onClose={() => setCreateOpen(false)}>
                <Input placeholder={'наименование'} name="title" value={newProduct?.title}
                       onChange={handleInputChange}/>
                <Input placeholder={'места'} name="places" value={newProduct?.places} onChange={handleInputChange}/>
                <Input placeholder={'вид'} name="view" value={newProduct?.view} onChange={handleInputChange}/>
                <Input placeholder={'куб'} name="cube" value={newProduct?.cube} onChange={handleInputChange}/>
                <Input placeholder={'кг'} name="kg" value={newProduct?.kg} onChange={handleInputChange}/>
                <Input placeholder={'куб/кг'} name="cube_kg" value={newProduct?.cube_kg} onChange={handleInputChange}/>
                <Input placeholder={'цена'} name="price" value={newProduct?.price} onChange={handleInputChange}/>
                <Input placeholder={'оплата'} name="payment" value={newProduct?.payment} onChange={handleInputChange}/>
                <Input placeholder={'долг клиента'} name="debt" value={newProduct?.debt} onChange={handleInputChange}/>
                <Input placeholder={'откуда'} name="where_from" value={newProduct?.where_from}
                       onChange={handleInputChange}/>
                <Input placeholder={'машина'} name="transport" value={newProduct?.transport}
                       onChange={handleInputChange}/>
                <Input placeholder={'Текущее местоположение'} name="current_place" value={newProduct.current_place}
                       onChange={handleInputChange}/>
                <DatePicker
                    style={{width: '48%', marginLeft: "5px"}}
                    format="YYYY-MM-DD"
                    onChange={(date) => setNewProduct(prev => ({
                        ...prev,
                        date: date ? date.toISOString() : null,
                    }))}
                />
                <select name="status" value={newProduct?.status} onChange={handleInputChange}>
                    <option value="">Status</option>
                    <option value="На складе Китая">На складе Китая</option>
                    <option value="На складе Узбекистана">На складе Узбекистана</option>
                    <option value="в пути">В пути</option>
                    <option value="Ожидающий">Ожидающий</option>
                    <option value="Завершен">Завершен</option>
                </select>
                <Button type="primary" onClick={handleCreate}>
                    Создать
                </Button>
            </Drawer>

            <Form form={form} component={false}>
                <Table
                    components={{body: {cell: EditableCell}}}
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
