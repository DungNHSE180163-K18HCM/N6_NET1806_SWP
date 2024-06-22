import React from 'react'
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Footer() {



  const onFinish = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (

    <>
      {/* <div className="container-fluid position-relative pt-5 wow fadeInUp" data-wow-delay="0.1s" style={{zIndex: 1, top: 100}}>
        <div className="container">
          <div className="bg-primary p-5">
            <form className="mx-auto" style={{maxWidth: 600}}>
              <div className="input-group">
                <input type="text" className="form-control border-white p-3" placeholder="Your Email" />
                <Link to={'/signup'} className="btn btn-dark px-4" style={{paddingTop:'15px'}}>Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      <div className="container-fluid position-relative pt-5" style={{ zIndex: 1, top: 100 }}>
        <div className="container">
          <div className="bg-primary p-5">
            <Form
              name="basic"
              wrapperCol={{ span: 24 }}
              style={{ maxWidth: 600, margin: '0 auto', display: 'flex' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                style={{flexGrow: '1'}}
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },

                ]}
              >
                <Input placeholder="Your Email" className="border-white p-3" style={{borderRadius : 'unset'}} />
              </Form.Item>

              <Form.Item>
                <Button type="dark" onClick={handleSignUp} className="btn btn-dark px-4" style={{paddingTop: '15px', paddingBottom: '40px'}}>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>


      <div>
        <div className="container-fluid bg-dark text-light py-5 wow fadeInUp" data-wow-delay="0.3s" style={{ marginTop: 20 }}>
          <div className="container pt-5">
            <div className="row g-5 pt-4">
              <div className="col-lg-3 col-md-6">
                <h3 className="text-white mb-4">Quick Links</h3>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Home</a>
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />About Us</a>
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Our Services</a>
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Latest Blog</a>
                  <a className="text-light" href="#"><i className="bi bi-arrow-right text-primary me-2" />Contact Us</a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h3 className="text-white mb-4">Popular Links</h3>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Home</a>
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />About Us</a>
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Our Services</a>
                  <a className="text-light mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Latest Blog</a>
                  <a className="text-light" href="#"><i className="bi bi-arrow-right text-primary me-2" />Contact Us</a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h3 className="text-white mb-4">Get In Touch</h3>
                <p className="mb-2"><i className="bi bi-geo-alt text-primary me-2" />Lot E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi Minh City, Vietnam</p>
                <p className="mb-2"><i className="bi bi-envelope-open text-primary me-2" />dentcare@fpt.edu.vn</p>
                <p className="mb-0"><i className="bi bi-telephone text-primary me-2" />+012 345 67890</p>
              </div>
              <div className="col-lg-3 col-md-6">
                <h3 className="text-white mb-4">Follow Us</h3>
                <div className="d-flex">
                  <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#"><i className="fab fa-twitter fw-normal" /></a>
                  <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#"><i className="fab fa-facebook-f fw-normal" /></a>
                  <a className="btn btn-lg btn-primary btn-lg-square rounded me-2" href="#"><i className="fab fa-linkedin-in fw-normal" /></a>
                  <a className="btn btn-lg btn-primary btn-lg-square rounded" href="#"><i className="fab fa-instagram fw-normal" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded back-to-top"><i class="fa-solid fa-arrow-up"></i></a>


    </>






  )
}

export default Footer