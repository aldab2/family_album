import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css'

import logo from '../../../assets/images/tmp-logo.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../../store/slices/usersApiSlice';
import { setCredentials } from '../../../store/slices/authSlice';
import { toast } from 'react-toastify';

SwiperCore.use([Navigation, Autoplay]);

const SignIn = () => {
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [login, { isLoading }] = useLoginMutation();
   const { userInfo } = useSelector(state => state.authReducer) || {};

   useEffect(() => {
      if (userInfo) {
         navigate('/');
      }
      console.log(userInfo);
   }, [navigate, userInfo]);

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const res = await login({ userName, password }).unwrap();
         dispatch(setCredentials({ ...res }));
         navigate('/');
      } catch (err) {
         toast.error(err?.data?.message || err.error);
      }
   }

   return (
      <>
         <section className="sign-in-page">
            <Container className="p-0">
               <Row className="no-gutters">
                  <Col md="6" className="d-none d-md-block text-center pt-5">
                     <div className="sign-in-detail text-white">
                        <Link className="sign-in-logo mb-5" to="#">
                           {/* <Image src={logo} className="img-fluid large-logo" alt="logo" /> */}
                        </Link>
                        <div className="sign-slider overflow-hidden ">
                           <Swiper
                              spaceBetween={30}
                              centeredSlides={true}
                              autoplay={{
                                 "delay": 2000,
                                 "disableOnInteraction": false
                              }}
                              className="list-inline m-0 p-0">
                              <SwiperSlide>
                                 <Image src={login1} className="img-fluid mb-4 " alt="logo" />
                                 <h4 className="mb-1 text-white">Preserve Family Memories</h4>
                                 <p>A platform dedicated to safeguarding precious family moments for generations to explore.</p>
                              </SwiperSlide>
                              <SwiperSlide>
                                 <Image src={login2} className="img-fluid mb-4" alt="logo" />
                                 <h4 className="mb-1 text-white">All Memories Together</h4>
                                 <p>Join us to create a shared space where every picture and story brings your family closer.</p>
                              </SwiperSlide>
                              <SwiperSlide>
                                 <Image src={login3} className="img-fluid mb-4" alt="logo" />
                                 <h4 className="mb-1 text-white">Connect with Other Families</h4>
                                 <p>Explore the joys of family connections, where every member's story is a thread in the fabric of our community.</p>
                              </SwiperSlide>
                           </Swiper>
                        </div>
                     </div>
                  </Col>
                  <Col md="6" className="bg-white pt-5 pb-lg-0 pb-5">
                     <div className="sign-in-from">
                        <h1 className="mb-0">Sign in</h1>
                        <p>Enter your username and password.</p>
                        <Form className="mt-4" onSubmit={submitHandler}>
                           <Form.Group className="form-group">
                              <Form.Label>Username</Form.Label>
                              <Form.Control
                                 type="text"
                                 className="mb-0"
                                 id="exampleInputUsername"
                                 placeholder="Enter Username"
                                 value={userName}
                                 onChange={(e) => setUserName(e.target.value)}
                              />
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Link to="#" className="float-end">Forgot password?</Link>
                              <Form.Control
                                 type="password"
                                 className="mb-0"
                                 id="exampleInputPassword1"
                                 placeholder="Password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                              />
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              <Form.Check className="d-inline-block mt-2 pt-1">
                                 <Form.Check.Input type="checkbox" className="me-2" id="customCheck11" />
                                 <Form.Check.Label>Remember Me</Form.Check.Label>
                              </Form.Check>
                              <Button variant="primary" type="submit" className="float-end">Sign in</Button>
                           </div>
                           <div className="sign-info">
                              <span className="dark-color d-inline-block line-height-2">Don't have an account? <Link to="/auth/sign-up">Sign up</Link></span>
                           </div>
                        </Form>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      </>
   )
}

export default SignIn;
