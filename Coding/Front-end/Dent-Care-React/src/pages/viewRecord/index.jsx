import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../config/axios'
import useClinics from '../../callApi/clinic';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { Button, Modal } from 'antd';
import HeroHeader from '../../components/hero-header';

function ViewRecord() {



    return (

        <>

            <HeroHeader content={'Record'} />

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5 d-flex justify-content-center">
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                            <Link to={`/record`} className="team-item">
                                <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                    <img style={{ height: '311.8px' }} className="img-fluid rounded-top w-100" src={`/Create Record.avif`} alt />
                                    <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                        <Link to={`/record`} className="btn btn-primary py-2 px-3">CREATE</Link>

                                    </div>
                                </div>
                                <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                    <h4 className="mb-2"></h4>
                                    <p className="text-primary mb-0"></p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                            <Link to={`/record-dentist`}  className="team-item">
                                <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                    <img className="img-fluid rounded-top w-100" src={`/View Record.avif`} alt />
                                    <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                        <Link to={`/record-dentist`} className="btn btn-primary py-2 px-3">VIEW</Link>

                                    </div>
                                </div>
                                <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                    <h4 className="mb-2"></h4>
                                    <p className="text-primary mb-0"></p>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default ViewRecord