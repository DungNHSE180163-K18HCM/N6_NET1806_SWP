import React from 'react'
import HeroHeader from '../hero-header'
import useDentistDetail from '../../callApi/dentistDetail';
import { Link, useParams } from 'react-router-dom';
import useServiceByDentistID from '../../callApi/serByDen';
import useQualification from '../../callApi/qualification';

function Dentist() {

    const { did } = useParams();

    const { dentist } = useDentistDetail();

    const { service } = useServiceByDentistID();

    const { qualification } = useQualification(did);


    return (
        <>

            <HeroHeader content={'Dentist Information'} />

            <main className="pt-4" style={{ backgroundColor: '#fff', fontSize: 20, overflow: 'hidden' }}>
                <div className="container mt-5 pb-5 ">
                    {/*Grid row*/}
                    <div className="row pt-5 bg-light" style={{ borderRadius: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)' }}>
                        {/*Grid column*/}
                        <div className="col-md-6 mb-4">
                            <img src={`/${dentist.fullName}.jpg`} className="img-fluid" alt style={{ width: 500 }} />
                        </div>
                        {/*Grid column*/}
                        {/*Grid column*/}
                        <div className="col-md-6 mb-4">
                            {/*Content*/}
                            <div className="p-4">
                                <div className="mb-3">
                                    <a href style={{ textDecoration: 'none' }}>
                                        <span className="badge bg-info me-3">Enthusiastic</span>
                                    </a>
                                    <a href>
                                        <span className="badge bg-secondary me-1">Careful</span>
                                    </a>
                                </div>
                                <p style={{ fontSize: 30 }}>{dentist.fullName}</p>
                                <div className="d-flex" style={{ margin: '10px 0' }}>
                                    <p style={{ marginRight: 20, width: 150 }}>Role</p>
                                    <p style={{ marginRight: 20, width: 150 }}>{dentist.role}</p>
                                </div>
                                <div className="d-flex" style={{ margin: '10px 0' }}>
                                    <p style={{ marginRight: 20, width: 150 }}>Phone</p>
                                    <p style={{ marginRight: 20, width: 150 }}>{dentist.phone}</p>
                                </div>
                            </div>
                            {/*Content*/}
                        </div>
                        {/*Grid column*/}
                    </div>

                    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="container">
                            <div className="row">
                                {service.map((item, index) => (

                                    item?.status !== 'INACTIVE' ? (
                                        <div className="col-md-3">
                                            <div className="price-item pb-4">
                                                <Link to={`/dentist/${did}/service/${item.id}`}>
                                                    <div className="position-relative">
                                                        <img className="img-fluid rounded-top" src={`/${item?.serviceDetail.name}.jpg`} alt />
                                                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                                                            <h2 className="text-primary m-0">${item?.serviceDetail.price}</h2>
                                                        </div>
                                                    </div>
                                                </Link><div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">

                                                    <Link to={`/dentist/${did}/service/${item.id}`}>
                                                        <h4>{item?.serviceDetail.name}</h4>
                                                        <hr className="text-primary w-50 mx-auto mt-0" />
                                                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                                                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                                                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                                                    </Link>

                                                    <Link to={`/dentist/${did}/service/${item.id}`} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ""

                                ))}
                            </div>
                        </div>
                    </div>


                    {/*Grid row*/}
                    <div className="row bg-light" style={{ backgroundColor: '#fff', marginTop: 20, borderRadius: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)', fontSize: 15, padding: 20 }}>

                        {qualification.map((item, index) => (

                            item.qualificationEnum !== 'EXPIRED' ? (
                                <div className="card rounded-3 mb-4">
                                <div className="card-body p-1">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img src={`/${item.institution}.jpg`} className="img-fluid rounded-3"/>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">{item.name}</p>
                                            <p><span className="text-muted">{item.institution}</span></p>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-1 offset-lg-1">
                                            <h5 className="mb-0">{item.yearObtained}</h5>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-4">
                                            <p className="lead fw-normal mb-2">{item.description}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            ):""
                        ))}

                    </div>
                </div>
            </main>


        </>
    )
}

export default Dentist