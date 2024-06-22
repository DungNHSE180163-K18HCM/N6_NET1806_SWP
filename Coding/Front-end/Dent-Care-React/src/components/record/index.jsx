import React from 'react'
import HeroHeader from '../hero-header'
import './style.css'

function Record() {
  return (
    <>
    
        <HeroHeader content="Record"/>

        <div>
            <div className="container container-custom mb-5 wow zoomIn" data-wow-delay="0.1s">
                <div className="row row-custom">
                <div className="col-md-12 text-center fw-bold h5">Basic Information</div>
                </div>
                <div className="row row-custom">
                <div className="col-md-6 col-border">
                    <label className="w-100 ps-2">Patient Name</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3 col-border">
                    <label className="w-100 ps-2">Date of Birth</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3">
                    <label className="w-100 ps-2">Email</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-9 col-border">
                    <label className="w-100 ps-2">Address</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3">
                    <label className="w-100 ps-2">Contact Number</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12 text-center fw-bold h5">Dental History</div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12">
                    <label className="w-100 ps-2">Reason for Today's Visit</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-6 col-border">
                    <label className="w-100 ps-2">Former Dentist Name</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3 col-border">
                    <label className="w-100 ps-2">Email</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3">
                    <label className="w-100 ps-2">Contact Number</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-3 col-border">
                    <label className="w-100 ps-2">Date of Last Dental Care</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3 col-border">
                    <label className="w-100 ps-2">Date of Last Dental X-rays</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3 col-border">
                    <label className="w-100 ps-2">Flossing Frequency</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3">
                    <label className="w-100 ps-2">Brushing Frequency</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12">
                    <label className="w-100 ps-2">Select any of the following problems you have or have had</label>
                    <div className="checkbox-group w-100 ps-2">
                    <label><input type="checkbox" defaultChecked /> Bad Breath</label>
                    <label><input type="checkbox" /> Grinding Teeth</label>
                    <label><input type="checkbox" /> Sensitivity to Hot</label>
                    <label><input type="checkbox" defaultChecked /> Bleeding Gums</label>
                    <label><input type="checkbox" /> Loose Teeth or Broken Fillings</label>
                    <label><input type="checkbox" /> Sensitivity to Sweets</label>
                    <label><input type="checkbox" defaultChecked /> Clicking or Popping Jaw</label>
                    <label><input type="checkbox" /> Periodontal Treatment</label>
                    <label><input type="checkbox" /> Sensitivity when Biting</label>
                    <label><input type="checkbox" defaultChecked /> Food Collection Between Teeth</label>
                    <label><input type="checkbox" defaultChecked /> Sensitivity to Cold</label>
                    <label><input type="checkbox" /> Sores or Grow row-customths in Your Mouth</label>
                    </div>
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12 text-center">Medical History</div>
                </div>
                <div className="row row-custom">
                <div className="col-md-6 col-border">
                    <label className="w-100 ps-2">Physician Name</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3 col-border">
                    <label className="w-100 ps-2">Email</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3">
                    <label className="w-100 ps-2">Date of Last Visit</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12">
                    <div className="d-inline-block mx-5">
                    <label>Have you ever had a blood transfusion?</label>
                    <label className="mx-2"><input type="checkbox" /> yes</label>
                    <label className="mx-2"><input type="checkbox" /> no</label>
                    </div>
                    <label> If yes, what was the approximate date: <input type="text" className="border-0 bg-light " /></label>
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12">
                    <div className="d-inline-block mx-5">
                    <label className="ps-2">Are you pregnant? </label>
                    <label className="mx-2"><input type="checkbox" /> yes</label>
                    <label className="mx-2"><input type="checkbox" /> no</label>
                    </div>
                    <div className="d-inline-block mx-5">
                    <label className="ps-2">Nursing? </label>
                    <label className="mx-2"><input type="checkbox" /> yes</label>
                    <label className="mx-2"><input type="checkbox" /> no</label>
                    </div>
                    <div className="d-inline-block mx-5">
                    <label className="ps-2">Taking birth control pills? </label>
                    <label className="mx-2"><input type="checkbox" /> yes</label>
                    <label className="mx-2"><input type="checkbox" /> no</label>
                    </div>
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12">
                    <label className="w-100 ps-2">Select any of the following that you have or have had</label>
                    <div className="checkbox-group w-100 ps-2">
                    <label><input type="checkbox" /> Anemia</label>
                    <label><input type="checkbox" /> Cortisone Treatments</label>
                    <label><input type="checkbox" /> Hepatitis</label>
                    <label><input type="checkbox" defaultChecked /> Arthritis, Rheumatism</label>
                    <label><input type="checkbox" /> Persistent Cough</label>
                    <label><input type="checkbox" /> High Blood Pressure</label>
                    <label><input type="checkbox" /> Artificial Heart Valves</label>
                    <label><input type="checkbox" /> Cough Up Blood</label>
                    <label><input type="checkbox" /> HIV/AIDS</label>
                    <label><input type="checkbox" /> Artificial Joints</label>
                    <label><input type="checkbox" /> Diabetes</label>
                    <label><input type="checkbox" /> Jaw Pain</label>
                    <label><input type="checkbox" defaultChecked /> Asthma</label>
                    <label><input type="checkbox" /> Epilepsy</label>
                    <label><input type="checkbox" /> Kidney Disease</label>
                    <label><input type="checkbox" /> Back Problems</label>
                    <label><input type="checkbox" /> Fainting</label>
                    <label><input type="checkbox" /> Liver Disease</label>
                    <label><input type="checkbox" /> Blood Disease</label>
                    <label><input type="checkbox" /> Glaucoma</label>
                    <label><input type="checkbox" /> Mitral Valve Prolapse</label>
                    <label><input type="checkbox" /> Cancer</label>
                    <label><input type="checkbox" /> Headaches</label>
                    <label><input type="checkbox" /> Pacemaker</label>
                    <label><input type="checkbox" /> Chemical Dependency</label>
                    <label><input type="checkbox" /> Heart Murmur</label>
                    <label><input type="checkbox" /> Radiation Treatment</label>
                    <label><input type="checkbox" /> Chemotherapy</label>
                    <label><input type="checkbox" /> Heart Problems</label>
                    <label><input type="checkbox" /> Respiratory Disease</label>
                    <label><input type="checkbox" /> Circulatory Problems</label>
                    <label><input type="checkbox" /> Hemophilia</label>
                    <label><input type="checkbox" /> Rheumatic Fever</label>
                    <label><input type="checkbox" /> Scarlet Fever</label>
                    <label><input type="checkbox" /> Shortness of Breath</label>
                    <label><input type="checkbox" /> Skin Rash</label>
                    <label><input type="checkbox" /> Stroke</label>
                    <label><input type="checkbox" /> Swelling of Feet or Ankles</label>
                    <label><input type="checkbox" /> Thyroid Problems</label>
                    <label><input type="checkbox" /> Tobacco Habit</label>
                    <label><input type="checkbox" /> Tonsillitis</label>
                    <label><input type="checkbox" /> Tuberculosis</label>
                    <label><input type="checkbox" /> Ulcer</label>
                    <label><input type="checkbox" /> Venereal Disease</label>
                    </div>
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12">
                    <label className="w-100 ps-2">List any other serious illnesses or operation that you have or have had</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
                <div className="row row-custom">
                <div className="col-md-12 px-2 fw-bold">All the answers given to the above questions are answered accurately to the best of my knoweledge. I understand that any inaccurate information can be dangerous to me (or patient's) health.</div>
                </div>
                <div className="row row-custom last-row">
                <div className="col-md-9 col-border">
                    <label className="w-100 ps-2">Signature of Patient, Parent, Guardian or Personal Reprensentative</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                <div className="col-md-3">
                    <label className="w-100 ps-2">Date</label>
                    <input type="text" className="w-100 border-0 bg-light ps-2" />
                </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <a href="index.html" className="btn btn-primary py-md-3 px-md-5 me-3 wow fadeInUp" data-wow-delay="0.6s">Submit</a>
            </div>
        </div>

    
    </>
  )
}

export default Record