import React from 'react'
import useClinicByServicesAndDentist from '../../callApi/cliByDenAndSer';
import { Link, useParams } from 'react-router-dom';

function ClinicByServiceAndDentistPage() {

    const { did, sid } = useParams()

    console.log(did, sid)

    const { clinic } = useClinicByServicesAndDentist(did, sid);
    console.log(clinic)

    return (
        <>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                            <div className="section-title bg-light rounded h-100 p-5">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                                <h1 className="display-6 mb-4">Cutting-edge equipment ensures optimal treatment</h1>
                            </div>
                        </div>

                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                            <Link to={`/dentist/${did}/service/${sid}/clinic/${clinic.id}`} className="team-item">
                                <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                    <img className="img-fluid rounded-top w-100" src={`/${clinic.clinicName}.jpg`} alt />
                                    <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-twitter fw-normal" /></a>
                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
                                        <a className="btn btn-primary btn-square m-1" href="#"><i className="fab fa-instagram fw-normal" /></a>
                                    </div>
                                </div>
                                <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                    <h4 className="mb-2">{clinic.clinicName}</h4>
                                    <p className="text-primary mb-0">{clinic.address}</p>
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ClinicByServiceAndDentistPage