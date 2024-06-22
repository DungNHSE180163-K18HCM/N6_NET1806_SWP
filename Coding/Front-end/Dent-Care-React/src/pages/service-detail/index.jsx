import React from 'react'
import About from '../../components/about'
import useServiceDetail from '../../callApi/serviceDetail';
import HeroHeader from '../../components/hero-header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Offer from '../../components/offer';
import useClinicByServicesID from '../../callApi/cliBySer';
import ScrollToTop from '../../components/scrollToTop';

function ServiceDetailPage() {

  const { sid } = useParams()

    const { service } = useServiceDetail();

    const { clinic} = useClinicByServicesID();

    const navigate = useNavigate();


    return (
        <>
            <HeroHeader content={`${service.name}`} />


            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                            <div className="section-title bg-light rounded h-100 p-5">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                                <h1 className="display-6 mb-4">Cutting-edge equipment ensures optimal treatment</h1>
                                <Link to={'/appointment'} className="btn btn-primary py-3 px-5">Appointment</Link>
                            </div>
                        </div>


                        {clinic.map((item, index) => (

                            <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                                {/* <Link to={`/dentistByClinic/${item.id}`} onClick={ScrollToTop} className="team-item">
                                    <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                        <img className="img-fluid rounded-top w-100" src={`/${item?.clinicName}.jpg`} alt />
                                        <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-twitter fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-instagram fw-normal" /></a>
                                        </div>
                                    </div>
                                    <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 className="mb-2">{item?.clinicName}</h4>
                                        <p className="text-primary mb-0">{item?.address}</p>
                                    </div>
                                </Link> */}
                                <div  onClick={() => navigate(`/service/${sid}/clinic/${item.id}`)} className="team-item">
                                    <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                        <img className="img-fluid rounded-top w-100" src={`/${item?.clinicName}.jpg`} alt />
                                        <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-twitter fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
                                            <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-instagram fw-normal" /></a>
                                        </div>
                                    </div>
                                    <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 className="mb-2">{item?.clinicName}</h4>
                                        <p className="text-primary mb-0">{item?.address}</p>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>

            <Offer/>
            

            <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <div className="section-title mb-4">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Description</h5>
                                <h1 className="display-5 mb-0">What is Ceramic Tooth? Is Ceramic Tooth Good?</h1>
                            </div>
                            <h4 className="text-body fst-italic mb-4">At DentCare, we are dedicated to providing exceptional dental care in a warm and welcoming environment</h4>
                            <p className="mb-4">{service.description}</p>
                            <div className="row g-3">
                                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />Award Winning</h5>
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />Professional Staff</h5>
                                </div>
                                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />24/7 Opened</h5>
                                    <h5 className="mb-3"><i className="fa fa-check-circle text-primary me-3" />Fair Prices</h5>
                                </div>
                            </div>
                            <Link to={'/appointment'} className="btn btn-primary py-3 px-5 mt-4 wow zoomIn" data-wow-delay="0.6s">Make Appointment</Link>
                        </div>
                        <div className="col-lg-5" style={{ minHeight: 500 }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src={`/${service.name}.jpg`} style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ServiceDetailPage