import React from 'react'
import HeroHeader from '../../components/hero-header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ScrollToTop from '../../components/scrollToTop';
import useDentistsByClinicAndService from '../../callApi/dentByCliandSer';

function DentistByClinic() {

  const navigate = useNavigate();
  const {id,sid}= useParams();

    const { dentist} = useDentistsByClinicAndService();



  return (
    <>
    
        <HeroHeader content="Team"/>

        <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                            <div className="section-title bg-light rounded h-100 p-5">
                                <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                                <h1 className="display-6 mb-4">Meet Our Certified &amp; Experienced Dentist</h1>
                                {/* <Link to={'/appointment'} className="btn btn-primary py-3 px-5">Appointment</Link> */}
                                <span onClick={() => navigate(`/clinic/${id}/service/${sid}/dentist`)} className="btn btn-primary py-3 px-5">Appointment</span>
                            </div>
                        </div>
                        {dentist.map((item, index) => (

                            item?.status !== 'INACTIVE' ? (<div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                               <div className="team-item" onClick={() => navigate(`/clinic/${id}/service/${sid}/dentist/${item?.id}`)}>
                                    <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                                        <img width={300} height={400} className=" rounded-top w-100" src={`/${item?.fullName}.jpg`} alt />
                                        <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                                            {/* <Link to={'/appointment'} className="btn btn-primary py-2 px-3">Appointment</Link> */}
                                            <span onClick={() => navigate(`/clinic/${id}/service/${sid}/dentist/${item?.id}`)} className="btn btn-primary py-2 px-3">Appointment</span>

                                        </div>
                                    </div>
                                    <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                                        <h4 className="mb-2">{item?.fullName}</h4>
                                        <p className="text-primary mb-0">{item?.phone}</p>
                                    </div>
                                    </div>
                            </div>) : ""

                        ))}

                    </div>
                </div>
            </div>
    
    </>
  )
}

export default DentistByClinic