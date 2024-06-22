import React from 'react'
import HeroHeader from '../hero-header'
import './style.css'

function Schedule() {
  return (
    <>
        <HeroHeader content="Schedule"/>

        <div className="container mb-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="row">
            <div className="col-md-12">
            <div className="schedule-table">
                <table className="table bg-white">
                <thead>
                    <tr>
                    <th>Routine</th>
                    <th>10 am</th>
                    <th>11 am</th>
                    <th>03 pm</th>
                    <th>05 pm</th>
                    <th className="last">07 pm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="day">Sunday</td>
                    <td className="active">
                        <h4>Weight Loss</h4>
                        <p>10 am - 11 am</p>
                        <div className="hover">
                        <h4>Weight Loss</h4>
                        <p>10 am - 11 am</p>
                        <span>Wayne Ponce</span>
                        </div>
                    </td>
                    <td />
                    <td className="active">
                        <h4>Yoga</h4>
                        <p>03 pm - 04 pm</p>
                        <div className="hover">
                        <h4>Yoga</h4>
                        <p>03 pm - 04 pm</p>
                        <span>Francisco Watt</span>
                        </div>
                    </td>
                    <td className="active">
                        <h4>Boxing</h4>
                        <p>05 pm - 06 pm</p>
                        <div className="hover">
                        <h4>Boxing</h4>
                        <p>05 pm - 046am</p>
                        <span>Charles King</span>
                        </div>
                    </td>
                    <td />
                    </tr>
                    <tr>
                    <td className="day">Monday</td>
                    <td />
                    <td className="active">
                        <h4>Cycling</h4>
                        <p>11 am - 12 pm</p>
                        <div className="hover">
                        <h4>Cycling</h4>
                        <p>11 am - 12 pm</p>
                        <span>Tabitha Potter</span>
                        </div>
                    </td>
                    <td className="active">
                        <h4>Karate</h4>
                        <p>03 pm - 05 pm</p>
                        <div className="hover">
                        <h4>Karate</h4>
                        <p>03 pm - 05 pm</p>
                        <span>Lester Gray</span>
                        </div>
                    </td>
                    <td />
                    <td className="active">
                        <h4>Crossfit</h4>
                        <p>07 pm - 08 pm</p>
                        <div className="hover">
                        <h4>Crossfit</h4>
                        <p>07 pm - 08 pm</p>
                        <span>Candi Yip</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td className="day">Tuesday</td>
                    <td className="active">
                        <h4>Spinning</h4>
                        <p>10 am - 11 am</p>
                        <div className="hover">
                        <h4>Spinning</h4>
                        <p>10 am - 11 am</p>
                        <span>Mary Cass</span>
                        </div>
                    </td>
                    <td />
                    <td />
                    <td className="active">
                        <h4>Bootcamp</h4>
                        <p>05 pm - 06 pm</p>
                        <div className="hover">
                        <h4>Bootcamp</h4>
                        <p>05 pm - 06 pm</p>
                        <span>Brenda Mastropietro</span>
                        </div>
                    </td>
                    <td className="active">
                        <h4>Boxercise</h4>
                        <p>07 pm - 08 pm</p>
                        <div className="hover">
                        <h4>Boxercise</h4>
                        <p>07 pm - 08 pm</p>
                        <span>Marlene Bruce</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td className="day">Wednesday</td>
                    <td className="active">
                        <h4>Body Building</h4>
                        <p>10 am - 12 pm</p>
                        <div className="hover">
                        <h4>Body Building</h4>
                        <p>10 am - 12 pm</p>
                        <span>Brenda Hester</span>
                        </div>
                    </td>
                    <td />
                    <td className="active">
                        <h4>Dance</h4>
                        <p>03 pm - 05 pm</p>
                        <div className="hover">
                        <h4>Dance</h4>
                        <p>03 pm - 05 pm</p>
                        <span>Brian Ashworth</span>
                        </div>
                    </td>
                    <td />
                    <td className="active">
                        <h4>Health</h4>
                        <p>07 pm - 08 pm</p>
                        <div className="hover">
                        <h4>Health</h4>
                        <p>07 pm - 08 pm</p>
                        <span>Mark Croteau</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td className="day">Thursday</td>
                    <td />
                    <td className="active">
                        <h4>Bootcamp</h4>
                        <p>11 am - 12 pm</p>
                        <div className="hover">
                        <h4>Bootcamp</h4>
                        <p>1 am - 12 pm</p>
                        <span>Elisabeth Schreck</span>
                        </div>
                    </td>
                    <td />
                    <td className="active">
                        <h4>Boday Building</h4>
                        <p>05 pm - 06 pm</p>
                        <div className="hover">
                        <h4>Boday Building</h4>
                        <p>05 pm - 06 pm</p>
                        <span>Edward Garcia</span>
                        </div>
                    </td>
                    <td />
                    </tr>
                    <tr>
                    <td className="day">Friday</td>
                    <td className="active">
                        <h4>Racing</h4>
                        <p>10 am - 11 am</p>
                        <div className="hover">
                        <h4>Racing</h4>
                        <p>10 am - 11 am</p>
                        <span>Jackie Potts</span>
                        </div>
                    </td>
                    <td />
                    <td className="active">
                        <h4>Energy Blast</h4>
                        <p>03 pm - 05 pm</p>
                        <div className="hover">
                        <h4>Energy Blast</h4>
                        <p>03 pm - 05 pm</p>
                        <span>Travis Brown</span>
                        </div>
                    </td>
                    <td />
                    <td className="active">
                        <h4>Jumping</h4>
                        <p>07 pm - 08 pm</p>
                        <div className="hover">
                        <h4>Jumping</h4>
                        <p>07 pm - 08 pm</p>
                        <span>Benjamin Barnett</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td className="day">Satarday</td>
                    <td />
                    <td />
                    <td className="active">
                        <h4>Aerobics</h4>
                        <p>03 pm - 04 pm</p>
                        <div className="hover">
                        <h4>Aerobics</h4>
                        <p>03 pm - 04 pm</p>
                        <span>Andre Walls</span>
                        </div>
                    </td>
                    <td className="active">
                        <h4>Cycling</h4>
                        <p>05 pm - 06 pm</p>
                        <div className="hover">
                        <h4>Cycling</h4>
                        <p>05 pm - 06 pm</p>
                        <span>Margaret Thomas</span>
                        </div>
                    </td>
                    <td />
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>

    <div className="row  wow zoomIn" style={{margin: '20px 50px'}} data-wow-delay="0.6s"> 
    <div className="col-lg-12">
        <div className="row">
        <main className="col-lg-12 mb-5" style={{fontSize: 15, marginTop: 40}}>        
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Appointment Time</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Dentist</th>
                <th scope="col">Room</th>
                <td />
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>huan</td>
                <td>huan</td>
                <td>huan</td>
                <td>huan</td>
                <td>huan</td>
                <td>huan</td>
                <td className="d-flex">
                    <form action="MainController" className="mx-2">
                    <input type="hidden" name="action" defaultValue="delete" />
                    <input type="hidden" name="id" />
                    <input type="hidden" name="nextaction" defaultValue="deleteProduct" />
                    <input className="btn btn-primary py-2 px-4 ms-3" type="submit" defaultValue="Cancel" />
                    </form>
                </td>
                </tr>
            </tbody>
            </table>
        </main>
        </div></div></div>


    
    </>
  )
}

export default Schedule