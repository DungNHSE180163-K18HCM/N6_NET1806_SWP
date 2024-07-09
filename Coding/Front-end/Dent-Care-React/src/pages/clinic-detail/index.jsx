import React from 'react'
import HeroHeader from '../../components/hero-header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useServicesByClinicID from '../../callApi/serByCli'
import useClinicDetail from '../../callApi/clinicDetail'
import useDentistsByClinic from '../../callApi/denByCli'
import Offer from '../../components/offer'
import ScrollToTop from '../../components/scrollToTop'

function ClinicDetailPage() {
  const { id } = useParams()
  const { clinic } = useClinicDetail();
  const { service } = useServicesByClinicID();
  const { dentist } = useDentistsByClinic();
  const navigate = useNavigate();

  return (
    <>
      <HeroHeader content={`${clinic.clinicName}`} />

      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row">
            {service.map((item, index) => (
              <div key={index} className="col-md-3">
                <div className="price-item pb-4">
                  <Link to={`/service/${item.id}`}>
                    <div className="position-relative">
                      <img className="img-fluid rounded-top" src={`/${item?.name}.jpg`} alt={item?.name} />
                      <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                        <h2 className="text-primary m-0">${item?.price}</h2>
                      </div>
                    </div>
                  </Link>
                  <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                    <Link to={'/'}>
                      <h4>{item?.name}</h4>
                      <hr className="text-primary w-50 mx-auto mt-0" />
                      <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                      <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                      <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                    </Link>
                    <span onClick={() => navigate(`/clinic/${id}/service/${item.id}`)} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Offer />

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
              item?.status !== 'INACTIVE' && (
                <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s" key={index}>
                  <Link to={`/dentist/${item.id}`} onClick={ScrollToTop} className="team-item">
                    <div className="position-relative rounded-top" style={{ zIndex: 1 }}>
                      <img className="img-fluid rounded-top w-100" src={`/${item?.fullName}.jpg`} alt={item?.fullName} />
                      <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
                        <Link to={'/appointment'} className="btn btn-primary py-2 px-3">Appointment</Link>
                      </div>
                    </div>
                    <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                      <h4 className="mb-2">{item?.fullName}</h4>
                      <p className="text-primary mb-0">{item?.phone}</p>
                    </div>
                  </Link>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ClinicDetailPage
