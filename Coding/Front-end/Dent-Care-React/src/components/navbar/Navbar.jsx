import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../../redux/features/counterSlice';
import './style.css'


function Navbar() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token", user.token);
    dispatch(logout());
  };

  return (

    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
      <Link to={"/"} className="navbar-brand p-0">
        <h1 className="m-0 text-primary"><i className="fa fa-tooth me-2" />DentCare</h1>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <Link to={"/"} className="nav-item nav-link">Home</Link>
          <Link to={"/clinic"} className="nav-item nav-link">Clinic</Link>
          <Link to={"/services"} className="nav-item nav-link">Services</Link>
          <Link to={"/team"} className="nav-item nav-link">Dentists</Link>
          <Link to={"/contact"} className="nav-item nav-link">Contact</Link>
          {user && user?.role !== 'STAFF' ? (
            <div className="nav-item dropdown">
              <Link to={"/"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
              <div className="dropdown-menu m-0">
                {user?.role === 'DENTIST' ? (
                  <Link to={"/dentist-schedule"} className="dropdown-item">Schedule</Link>
                ) : (<Link to={"/patient"} className="dropdown-item">Schedule</Link>)}
                {user?.role === 'DENTIST' ? (
                  <Link to={"/view-record"} className="dropdown-item">Record</Link>
                ) : (<Link to={"/patient-app-record"} className="dropdown-item">Record</Link>)}
                {user?.role === 'DENTIST' ? (
                  <Link to={"/day-off"} className="dropdown-item">Day Off</Link>
                ) : ""}
              </div>
            </div>
          ) : (
            <div className="nav-item dropdown">
            <Link to={"/"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
            <div className="dropdown-menu m-0">
              {user?.role === 'STAFF' ? (
                <Link to={"/check-in"} className="dropdown-item">Check In</Link>
              ) : ""}
              {user?.role === 'STAFF' ? (
                <Link to={"/check-in-history"} className="dropdown-item">History</Link>
              ) : ""}
            </div>
          </div>
          )}


        </div>

        {/* <form action>
          <input type="text" className="nav-input" />
          <button type="button" className="btn text-dark" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fa-solid fa-magnifying-glass fs-5" /></button>
        </form> */}

        {user ? (
          <div className="navbar-nav py-0" style={{ marginRight: '80px', marginLeft: '20px' }}>
            <div className="d-flex justify-content-center align-items-center nav-item dropdown">
              <img src="/logo.png" alt="User" className="header__navbar-user-img dropdown-toggle" data-bs-toggle="dropdown" />
              <div className="dropdown-menu m-0">
                <Link to={"/profile"} className="dropdown-item">Profile</Link>
                <Link to={"/schedule"} className="dropdown-item">Schedule</Link>
                <Link to={"/login"} className="dropdown-item" onClick={handleLogout}>Log out</Link>
              </div>
            </div>
          </div>
        ) : (
          <Link to={"/login"} className="btn btn-primary py-2 px-4 ms-3">Log In</Link>
        )}

      </div>
    </nav>



  )
}

export default Navbar