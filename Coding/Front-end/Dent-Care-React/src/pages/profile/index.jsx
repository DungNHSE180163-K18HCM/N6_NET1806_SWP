import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

export default function PersonalProfile() {

    const user = useSelector(selectUser);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    return (
        <section className="vh-100" >
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100" style={{ backgroundColor: '#EEF9FF' }}>
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                    <MDBTypography tag="h5">{user.fullName}</MDBTypography>
                                    <MDBCardText>Web Designer</MDBCardText>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        {/* <MDBTypography tag="h6">Information</MDBTypography> */}
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Password</MDBTypography>
                                                {/* <MDBCardText className="text-muted">info@example.com</MDBCardText> */}
                                                <input
                                                    type={passwordVisible ? 'text' : 'password'}
                                                    className="form-control text-muted"
                                                    value="info@example.com"
                                                    readOnly
                                                />
                                                
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                    <MDBBtn color="link" onClick={togglePasswordVisibility} style={{marginTop: '25px'}}>
                                                        {passwordVisible ? 'Hide' : 'Show'}
                                                    </MDBBtn>
                                                </MDBCol>
                                            {/* <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol> */}
                                        </MDBRow>
                                        <hr className="mt-0 mb-4" />

                                        <div className="d-flex justify-content-start">
                                            <i class="fa-solid fa-wallet" style={{color: '#06A3DA'}}></i>
                                            <MDBCardText className="text-muted" style={{marginLeft:'10px', marginTop:'-5px'}}>100,000 VND</MDBCardText>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}