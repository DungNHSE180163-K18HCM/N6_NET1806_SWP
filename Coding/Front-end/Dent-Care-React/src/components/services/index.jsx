import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Pagination } from 'antd';
import useServices from '../../callApi/services';

function Services() {
    const { service, setService } = useServices();
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setData(service);
    }, [service]);

    const handleSearch = (values) => {
        setData(service.filter(s => s.name.toLowerCase().includes(values.keyword.toLowerCase())));
        setCurrentPage(1); // Reset to first page after search
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 14, offset: 6 },
        },
    };

    return (
        <>
            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                    <Form {...formItemLayout} onFinish={handleSearch}>
                        <Form.Item label="keyword" name="keyword">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className='btn btn-primary'
                                style={{ padding: '0px 80px', borderRadius: '4px' }}
                            >
                                Search
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row">
                        {currentData.map((item, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="price-item pb-4">
                                    <Link to={`/service/${item.id}`}>
                                        <div className="position-relative">
                                            <img className="img-fluid rounded-top" src={`/${item?.name}.jpg`} alt="" />
                                            <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                                <h2 className="text-primary m-0">${item?.price}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                                        <Link to={`/service/${item.id}`}>
                                            <h4>{item?.name}</h4>
                                            <hr className="text-primary w-50 mx-auto mt-0" />
                                            <div className="d-flex justify-content-between mb-3">
                                                <span>Modern Equipment</span>
                                                <i className="fa fa-check text-primary pt-1" />
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                                <span>Professional Dentist</span>
                                                <i className="fa fa-check text-primary pt-1" />
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>24/7 Call Support</span>
                                                <i className="fa fa-check text-primary pt-1" />
                                            </div>
                                        </Link>
                                        <Link to={`/service/${item.id}`} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                    className='d-flex justify-content-center mt-5'
                        current={currentPage}
                        total={data.length}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
}

export default Services;
