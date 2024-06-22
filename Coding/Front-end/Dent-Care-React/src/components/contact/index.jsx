import React from 'react'
import HeroHeader from '../hero-header'

function Contact() {
  return (
    <>
    
        <HeroHeader content="Contact Us"/>

        <div className="container-fluid py-5">
            <div className="container">
                <div className="row g-5">
                <div className="col-xl-4 col-lg-6 wow slideInUp" data-wow-delay="0.1s">
                    <div className="bg-light rounded h-100 p-5">
                    <div className="section-title">
                        <h5 className="position-relative d-inline-block text-primary text-uppercase">Contact Us</h5>
                        <h1 className="display-6 mb-4">Feel Free To Contact Us</h1>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt fs-1 text-primary me-3" />
                        <div className="text-start">
                        <h5 className="mb-0">Our Office</h5>
                        <span>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000, Vietnam</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-envelope-open fs-1 text-primary me-3" />
                        <div className="text-start">
                        <h5 className="mb-0">Email Us</h5>
                        <span>dentcare@fpt.edu.vn</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-phone-vibrate fs-1 text-primary me-3" />
                        <div className="text-start">
                        <h5 className="mb-0">Call Us</h5>
                        <span>+012 345 6789</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 wow slideInUp" data-wow-delay="0.3s">
                    <form>
                    <div className="row g-3">
                        <div className="col-12">
                        <input type="text" className="form-control border-0 bg-light px-4" placeholder="Your Name" style={{height: 55}} />
                        </div>
                        <div className="col-12">
                        <input type="email" className="form-control border-0 bg-light px-4" placeholder="Your Email" style={{height: 55}} />
                        </div>
                        <div className="col-12">
                        <input type="text" className="form-control border-0 bg-light px-4" placeholder="Subject" style={{height: 55}} />
                        </div>
                        <div className="col-12">
                        <textarea className="form-control border-0 bg-light px-4 py-3" rows={5} placeholder="Message" defaultValue={""} />
                        </div>
                        <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-xl-4 col-lg-12 wow slideInUp" data-wow-delay="0.6s">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370124!2d106.80730807480579!3d10.841127589311634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1716970645783!5m2!1sen!2s" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                </div>
            </div>
        </div>



    
    </>
  )
}

export default Contact