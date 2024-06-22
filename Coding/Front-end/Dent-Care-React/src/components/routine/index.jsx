import React from 'react';
import HeroHeader from '../hero-header';
import "./routine_teeth.css";
function Routine() {
  return (
    <>
      <HeroHeader content="Routine" />
      
       
      

      <div className="container" id="contain1">
        <div className="row g-5">
          <h1>Aesthetics - The Solution for a Perfectly Beautiful Smile</h1>
          <div className="row" id="teeth">
            <h1>Dental Check-ups</h1>
            <div id="new-paragraph">
              <strong>Dental check-ups</strong> involve regular examinations of oral health, typically every 6 months. These check-ups help detect dental issues early on, allowing for timely treatment and preventing conditions from worsening, thus saving on treatment costs.
            </div>
            <h4>Benefits of Regular Dental Check-ups:</h4>
            <ul id="ul">
              <li><strong>Early detection of dental issues:</strong> Regular dental check-ups help identify problems like cavities, gum disease, oral infections, or mouth cancer in their early stages, making treatment easier and less costly.</li>
              <li><strong>Prevention of dental diseases:</strong> Early detection and timely treatment help prevent the progression of dental diseases, safeguarding oral health and overall well-being.</li>
              <li><strong>Cost savings in treatment:</strong> Early intervention helps avoid complications and reduces the need for expensive treatments.</li>
              <li><strong>Maintaining oral health:</strong> Regular dental check-ups contribute to maintaining healthy teeth and gums, promoting a beautiful smile and confident communication in daily life.</li>
            </ul>
            <img src="/carousel-2.jpg" alt="Dental Check-up" />
            <h1>Considerations for Dental Check-ups:</h1>
            <ul id="ul">
              <li><strong>Schedule appointments in advance:</strong> Pre-booking appointments saves waiting time.</li>
              <li><strong>Bring personal medical records:</strong> If available, bring your medical records for reference during the check-up.</li>
              <li><strong>Inform the dentist about medications:</strong> Some medications may affect dental treatment.</li>
              <li><strong>Maintain oral hygiene before check-ups:</strong> Ensuring clean teeth facilitates the dentist's examination.</li>
            </ul>
          </div>
          <h1>Kim Dental Clinic is among the first dental facilities in Vietnam to safely perform wisdom teeth extractions:</h1>
          <ul id="ul">
            <li>Our team of highly skilled and certified dentists conducts examinations, consultations, and extractions gently and accurately, ensuring comfort and confidence for patients.</li>
            <li>We utilize modern diagnostic and treatment technology such as X-ray machines, CT Cone Beam 3D imaging, and Piezotome technology for gentle, minimally invasive extractions with rapid recovery.</li>
            <li>Centralized sterilization system: All instruments are 100% sterilized, each patient receives a separate set of tools, and treatment rooms are private to prevent cross-infection.</li>
            <li>GCR (USA) and ISO 9001:2015 certified dental services: Convenient appointment scheduling across our nationwide network of over 30 Kim Dental Clinic branches; Dedicated and caring staff and comprehensive customer care management.</li>
          </ul>
          <div className="row" style={{ marginLeft: 15 }}>
            <div className="col-md-4">
              <img src="/Wisdom2.jpg" style={{ width: '100%', height: '100%' }} alt="Kim Dental Clinic" />
            </div>
            <div className="col-md-4">
              <img src="/Wisdom5.jpg" style={{ width: '100%', height: '100%' }} alt="Kim Dental Clinic" />
            </div>
            <div className="col-md-4">
              <img src="/Wisdom4.jpg" style={{ width: '100%', height: '100%' }} alt="Kim Dental Clinic" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Routine;
