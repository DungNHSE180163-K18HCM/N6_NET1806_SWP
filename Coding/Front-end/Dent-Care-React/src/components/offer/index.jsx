import React from 'react'
import { Link } from 'react-router-dom'

function Offer() {
  return (
    
    <>

      <div className="container-fluid bg-offer my-5 py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
              <div className="offer-text text-center rounded p-5">
                <h1 className="display-5 text-white">Save 30% On Your First Dental Checkup</h1>
                <p className="text-white mb-4">We're excited to introduce our First Dental Checkup Package, an exclusive offer designed to provide new patients with a comprehensive introduction to our high-quality dental care services at a special rate. This package includes everything you need for a thorough initial assessment and a healthy start to your dental journey with us</p>
                <Link to={'/appointment'}  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Appointment</Link>
                        <Link to={'/contact'}  className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>

  )
}

export default Offer