import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from '../scrollToTop'
import useDentists from '../../callApi/dentists';
import { Button, Form, Input, Pagination } from 'antd';


function Team() {

    const { dentist } = useDentists();
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const total = data.filter(item => item.status !== 'INACTIVE');
    const itemsPerPage = 5;
    useEffect(() => {
        setData(dentist);
    }, [dentist]);
    console.log(total)
    const handleSearch = (values) => {
        setData(dentist.filter(s => s.fullName.toLowerCase().includes(values.keyword.toLowerCase())));
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
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                            <div className="section-title bg-light rounded h-100 p-5">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                                <h1 className="display-6 mb-4">Meet Our Certified &amp; Experienced Dentist</h1>
                            </div>
                        </div>
                        {currentData.map((item, index) => (

                            item?.status !== 'INACTIVE' ? (<div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                                <Link to={`/dentist/${item.id}`} onClick={ScrollToTop} className="team-item">
                                    <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                        <img width={300} height={400} className="rounded-top w-100" src={`/${item?.fullName}.jpg`} alt style={{objectFit: "cover"}} />
                                        <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <Link to={`/dentist/${item.id}`} className="btn btn-primary py-2 px-3">Appointment</Link>

                                        </div>
                                    </div>
                                    <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 className="mb-2">{item?.fullName}</h4>
                                        <p className="text-primary mb-0">{item?.phone}</p>
                                    </div>
                                </Link>
                            </div>) : ""

                        ))}
                    </div>
                        <Pagination
                            className='d-flex justify-content-center mt-5'
                            current={currentPage}
                            total={total?.length}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                            
                        />
                </div>
            </div>


        </>

    )
}

export default Team