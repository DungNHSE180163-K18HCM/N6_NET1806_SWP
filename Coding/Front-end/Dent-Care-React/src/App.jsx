import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/login';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import HomePage from './pages/home';
import Layout from './components/layout';
import ServicesPage from './pages/services';
import ContactPage from './pages/contact';
import DentistPage from './pages/dentist';
import TeamPage from './pages/team';
import AppointmentPage from './pages/appointment';
import RecordPage from './pages/record';
import SignupPage from './pages/signup';
import SchedulePage from './pages/schedule';
import Dashboard from './pages/dashboard';
import Category from './components/category';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPage from './pages/forgot-password';
import ResetPage from './pages/reset-password';
import Information from './components/information';
import ClinicDetailPage from './pages/clinic-detail';
import ClinicPage from './pages/clinics';
import ServiceDetailPage from './pages/service-detail';
import DentistByClinic from './pages/teamByClinic';
import PersonalProfile from './pages/profile';

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/services',
          element: <ServicesPage />
        },
        {
          path: '/contact',
          element: <ContactPage />
        },
        {
          path: '/dentist/:id',
          element: <DentistPage />
        },
        {
          path: '/team',
          element: <TeamPage />
        },
        {
          path: '/appointment',
          element: <AppointmentPage />
        },
        {
          path: '/record',
          element: <RecordPage />
        },
        {
          path: '/schedule',
          element: <SchedulePage />
        },
        {
          path: 'clinic/:id/service/:sid',
          element: <DentistByClinic />
        },
        {
          path: 'service/:sid/clinic/:id',
          element: <DentistByClinic />
        },
        {
          path: 'clinic/:id/service/:sid/dentist/:did',
          element: <AppointmentPage />
        },
        {
          path: 'clinic/:id/service/:sid/dentist',
          element: <AppointmentPage />
        },
        {
          path: 'service/:sid/clinic/:id/dentist/:did',
          element: <AppointmentPage />
        },
        {
          path: '/clinic/:id',
          element: <ClinicDetailPage />
        },
        {
          path: '/clinic',
          element: <ClinicPage />
        },
        {
          path: '/service/:sid',
          element: <ServiceDetailPage />
        },
        {
          path: '/profile',
          element: <PersonalProfile />
        },
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: '/dashboard/category',
          element: <Category />,
        },
        {
          path: '/dashboard/information',
          element: <Information />,
        }
      ],
    },
    {
      path: '/forgot',
      element: <ForgotPage />
    },
    {
      path: '/reset',
      element: <ResetPage />
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
