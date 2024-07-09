import React, { useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import useServices from '../../callApi/services';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { Button, Form, Modal } from 'antd';

// Custom Next Arrow
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-next" onClick={onClick}>
            <i class="fa-solid fa-arrow-right"></i>
        </div>
    );
};

// Custom Previous Arrow
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-prev" onClick={onClick}>
            <i class="fa-solid fa-arrow-left"></i>
        </div>
    );
};



function ServicesItem() {

    const user = useSelector(selectUser)


    const { service } = useServices();

    const navigate = useNavigate();

    const show = () => {
        Modal.confirm({
            title: 'Info',
            content: 'Before booking service, you need log in',
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <Button
                        className='btn btn-primary'
                        style={{ borderRadius: '6px' }}
                        onClick={() => {
                            navigate('/login')
                            Modal.destroyAll(); // Close the modal
                        }}
                    >Log in</Button>
                    <CancelBtn />
                </>
            ),
        });
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (

        <>

           

            <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-5 me-5">
                            <div className="section-title mb-4">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Pricing Plan</h5>
                                <h1 className="display-5 mb-0 " >We Offer Fair Prices for Dental Treatment</h1>
                            </div>
                            <p className="mb-4">Don't wait to achieve the smile you deserve. Choose a plan and book your appointment today. Our friendly staff is here to assist you every step of the way.
                                For any inquiries or assistance, feel free to call us at +012 345 6789 or email us at dentcare@fpt.edu.vn</p>
                            <h5 className="text-uppercase text-body wow fadeInUp" data-wow-delay="0.3s">Call for Appointment</h5>
                            <h1 className="wow fadeInUp " data-wow-delay="0.6s">+012 345 6789</h1>
                        </div>


                        <div className="col-md-6">
                            <Slider {...settings}>
                                {service.map((item, index) => (

                                    <div className="col-md-3">
                                        {/* <div className="price-item pb-4">
                                            <Link to={`/service/${item.id}`}>
                                                <div className="position-relative">
                                                    <img className="img-fluid rounded-top" src={`/${item?.name}.jpg`} alt />
                                                    <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                                        <h2 className="text-primary m-0">${item?.price}</h2>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                                            
                                                <Link to={`/service/${item.id}`} >
                                                    <h4>{item?.name}</h4>
                                                    <hr className="text-primary w-50 mx-auto mt-0" />
                                                    <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                                                    <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                                                    <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                                                </Link>
                                            
                                                <Link to={`/service/${item.id}`} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">     
                                                    Appointment
                                                </Link>
                                            </div>
                                        </div> */}

                                        {user ? (
                                            <div className="price-item pb-4">
                                                <Link to={`/service/${item.id}`}>
                                                    <div className="position-relative">
                                                        <img className="img-fluid rounded-top" src={`/${item?.name}.jpg`} alt />
                                                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                                            <h2 className="text-primary m-0">${item?.price}</h2>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">

                                                    <Link to={`/service/${item.id}`} >
                                                        <h4>{item?.name}</h4>
                                                        <hr className="text-primary w-50 mx-auto mt-0" />
                                                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                                                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                                                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                                                    </Link>

                                                    <Link to={`/service/${item.id}`} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">
                                                        Appointment
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="price-item pb-4">
                                                <div onClick={show}>
                                                    <div className="position-relative">
                                                        <img className="img-fluid rounded-top" src={`/${item?.name}.jpg`} alt />
                                                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                                            <h2 className="text-primary m-0">${item?.price}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">

                                                    <div onClick={show} >
                                                        <h4>{item?.name}</h4>
                                                        <hr className="text-primary w-50 mx-auto mt-0" />
                                                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                                                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                                                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                                                    </div>

                                                    <div onClick={show} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">
                                                        Appointment
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                ))}
                            </Slider>
                        </div>



                    </div>
                </div>
            </div>





        </>
    )
}

export default ServicesItem