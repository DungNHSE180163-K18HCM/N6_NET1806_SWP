import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from '../scrollToTop'
import useDentists from '../../callApi/dentists';


function Team() {

    const { dentist} = useDentists();

    return (

        <>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                            <div className="section-title bg-light rounded h-100 p-5">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                                <h1 className="display-6 mb-4">Meet Our Certified &amp; Experienced Dentist</h1>
                                <Link to={'/appointment'} className="btn btn-primary py-3 px-5">Appointment</Link>
                            </div>
                        </div>
                        {dentist.map((item, index) => (

                            item?.status !== 'INACTIVE' ? (<div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                                <Link to={`/dentist/${item.id}`} onClick={ScrollToTop} className="team-item">
                                    <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                        <img className="img-fluid rounded-top w-100" src={`/${item?.fullName}.jpg`} alt />
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
                </div>
            </div>


        </>

    )
}

export default Team