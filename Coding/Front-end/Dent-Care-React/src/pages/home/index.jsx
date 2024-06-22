import React from 'react'
import Carousel from '../../components/carousel'
import Services from '../../components/services'
import Offer from '../../components/offer'
import Team from '../../components/team'
import About from '../../components/about'
import Appointment from '../../components/appointment'
import Clinic from '../../components/clinic'
import ServicesItem from '../../components/services-item'

function HomePage() {
  return (
    <>
        <Carousel/>
        <About/>
        <ServicesItem/>
        <Offer/>
        <Clinic/>
    </>
  )
}

export default HomePage