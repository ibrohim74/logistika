import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Table, Typography, Button, DatePicker, Drawer, notification} from 'antd';
import FilterTable from "../../../../../component/filterTable/filterTable.jsx";
import style from "../../../user_pages/year_history/year_history_user.module.css";
import * as XLSX from 'xlsx';
import './user_page.css';
import {useParams} from "react-router-dom";
import {Year_historyAPI} from "../../../user_pages/year_history/YearUserAPI.js";
import {CreateItemProduct, DeleteItemProduct, UpdateItemProduct} from "./userPageAPI.js";
import moment from "moment";
import $API from "../../../../../utils/http.js";


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
                <option value="На складе Китая">на складе Китая</option>
                <option value="На складе Узбекистана">на складе Узбекистана</option>
                <option value="в пути">в пути</option>
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
    const [products, setProducts] = useState([]);  // Initialize as an empty array
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const {id} = useParams();
    const [newProduct, setNewProduct] = useState({user:1});
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [createOpen, setCreateOpen] = useState(false);
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
                newData.splice(index, 1, {...item, ...row});

                // Ensure the updated object has all necessary fields
                const updatedItem = {...item, ...row};
                UpdateItemProduct(updatedItem).then((r) => {
                    if (r.status === 200){
                        setProducts(newData);
                        setFilteredProducts(newData);
                        setEditingKey('');
                        notification.success({
                            message: 'Успех',
                            description: 'Продукт успешно обновлен.',
                        });
                    }else {
                        notification.error({
                            message: 'Ошибка',
                            description: 'Не удалось сохранить изменения.',
                        });
                    }

                });

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


    const deleteRow = (key) => {
        const newData = products.filter(item => item.id !== key);
        DeleteItemProduct(id, key).then(r =>{
            if (r.status === 204) {
                setProducts(newData);
                setFilteredProducts(newData);
                setEditingKey('');
                notification.success({
                    message: 'Успех',
                    description: 'Продукт успешно delete.',
                });
            }else {
                notification.error({
                    message: 'Ошибка',
                    description: 'Не удалось delete.',
                });
            }
        })
    };

    const handleFilterChange = (filteredData) => {
        setFilteredProducts(filteredData);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        try {
            const res = await $API.post("/product/upload-excel/", file)
        } catch (e) {
            console.log(e)
        }
    };

    const handleCreate = () => {
        if (newProduct.title) {
            if (newProduct.status) {
                // Format the date to ISO 8601 before creating
                const productWithFormattedDate = {
                    ...newProduct,
                    date: newProduct.date ? moment(newProduct.date).toISOString() : null, // Convert to ISO 8601 format
                };

                CreateItemProduct(productWithFormattedDate).then(r => {
                    if (r.status === 201) {
                        const newProductWithId = {
                            id: products.length ? Math.max(products.map(p => p.id)) + 1 : 1,
                            ...productWithFormattedDate,
                        };

                        setProducts([...products, newProductWithId]);
                        setFilteredProducts([...products, newProductWithId]);
                        setNewProduct({ status: "", user: id });
                    }
                });
            } else {
                console.log('status');
            }
        } else {
            console.log('title');
        }
    };


    const handleExport = async () => {
        if (!id) return; // Ensure UUID is present
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
            link.download = `Monthly_Report_${id}.xlsx`;
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
        const {name, value} = e.target;
        console.log(name)
        console.log(value)
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
                            Save
                        </Typography.Link>
                        <br/>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a style={{color: 'red'}}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <br/>
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
            const res = await Year_historyAPI(id, page);
            if (res.status === 200) {
                console.log(res)
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
    console.log(newProduct)
    return (
        <div className={style.products_table}>
            <FilterTable
                products={products}
                type={'user_year'}
                onFilterChange={handleFilterChange}
                uuid={id} // Pass uuid for API filtering
            />

            <div className={style.download_excel_btn}>
                <Button type="primary" onClick={() => setCreateOpen(true)}
                        style={{width: "170px", height: "45px"}}
                >
                    Create
                </Button>

                <div className="excel_userPage_btn" style={{display: "flex", justifyContent: "flex-end"}}>
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
                <Input placeholder={'откуда'} name="where_from" value={newProduct?.where_from} onChange={handleInputChange}/>

                <Input placeholder={'машина'} name="transport" value={newProduct?.transport}
                       onChange={handleInputChange}/>
                <Input placeholder={'Текущее местоположение'} name="current_place" value={newProduct.current_place}
                       onChange={handleInputChange}/>
                <DatePicker
                    style={{width:'48%', marginLeft:"5px"}}
                    format="YYYY-MM-DD"
                    onChange={(date) => setNewProduct(prev => ({
                        ...prev,
                        date: date ? date.toISOString() : null,  // Convert to ISO 8601 format
                    }))}
                />

                <select
                    name="status"
                    value={newProduct?.status}
                    onChange={handleInputChange}
                >
                    <option value="">Status</option>
                    <option value="На складе Китая">на складе Китая</option>
                    <option value="На складе Узбекистана">на складе Узбекистана</option>
                    <option value="в пути">в пути</option>
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
