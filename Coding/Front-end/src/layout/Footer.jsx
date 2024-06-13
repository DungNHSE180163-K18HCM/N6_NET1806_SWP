import React from "react";
import { Link } from "react-router-dom";
import { IoLogoFacebook } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "#4B4B4B", padding: "3rem 7rem" }}>
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <Row>
              <Col md={6} className="mb-4">
                <div className="d-flex flex-column gap-2">
                  <p className="text-white font-weight-bold h4">Jewelry Shop</p>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </Col>
              <Col md={6} className="mb-4">
                <div className="d-flex flex-column gap-2">
                  <p className="text-white font-weight-bold h4">Quick Link</p>
                  <div className="d-flex flex-column">
                    <Link className="text-white mb-1 text-decoration-none " to="/link-a">
                      Link A
                    </Link>
                    <Link className="text-white mb-1 text-decoration-none" to="/link-b">
                      Link B
                    </Link>
                    <Link className="text-white mb-1 text-decoration-none" to="/link-c">
                      Link C
                    </Link>
                    <Link className="text-white mb-1 text-decoration-none" to="/link-d">
                      Link D
                    </Link>
                    <Link className="text-white mb-1 text-decoration-none" to="/link-e">
                      Link E
                    </Link>
                  </div>
                </div>
              </Col>
              <Col md={12} className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <Col md={6} className="d-flex flex-column mb-4 mb-md-0">
                  <p className="text-white font-weight-bold h4">Social Media</p>
                  <div className="d-flex gap-3">
                    <IoLogoFacebook color="white" size={30} />
                    <FaInstagram color="white" size={30} />
                    <FaYoutube color="white" size={30} />
                  </div>
                </Col>
                <Col md={12}>
                <Button style={{borderRadius:25, }} variant="outline-light" className="border border-3 shadow-lg px-4 py-2  ">
                  Make your own jewelry
                </Button>
                </Col>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={6} className="mb-4">
                <div className="d-flex flex-column gap-2">
                  <p className="text-white font-weight-bold h4">Contact us</p>
                  <div className="d-flex flex-column">
                    <p className="text-white">Phone: 607-647-4949</p>
                    <p className="text-white">Gmail: placeholder@gmail.com</p>
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-4">
                <div className="d-flex flex-column gap-2">
                  <p className="text-white font-weight-bold h4">Address</p>
                  <div>
                    <p className="text-white">1771 Frosty Lane,</p>
                    <p className="text-white">Mcdonugh, </p>
                    <p className="text-white">New York 13801</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between text-white">
          <Col className="text-left">
            <p className="mb-0">&copy; jewelryshop.com 2024.</p>
          </Col>
          <Col className="d-flex justify-content-end gap-4">
            <p>Privacy Policy</p>
            <p>Return Policy</p>
            <p>Terms and service</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
