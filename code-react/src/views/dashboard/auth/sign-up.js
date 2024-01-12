import React, { useEffect, useState } from 'react'
import {Row,Col,Container,Form,Button,Image} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'


//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
// import 'swiper/components/navigation/navigation.scss';

//img
import logo from '../../../assets/images/logo-full.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterFamilyMutation } from '../../../store/slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../../../store/slices/authSlice';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
   const [spaceName, setSpaceName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');    
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [acceptTerms,setAcceptTerms] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=> state.authReducer);

    const [registerFamily,{isLoading}] = useRegisterFamilyMutation();


    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])




    const submitHandler = async(e) => {
        e.preventDefault();
        
        if(password !== passwordConfirmation){
            toast.error("Passwords do not match");
        
        }
        else {
            try {
                const res = await registerFamily({spaceName,firstName,lastName,userName,password,email,gender,dateOfBirth}).unwrap();
                const user = res.familyMembers[0]
                console.log(user);
                dispatch(setCredentials({...user}));
                navigate('/');
            } catch (err) {

                toast.error(err?.data?.message || err.error);
                
            }
        }
        // Here you would handle the submission, e.g. sending data to the backend
    }

    const handleTermsChange = (e) => {
      setAcceptTerms(e.target.checked);
  }
   return (
      <>
         <section className="sign-in-page">
            <div id="container-inside">
                  <div id="circle-small"></div>
                  <div id="circle-medium"></div>
                  <div id="circle-large"></div>
                  <div id="circle-xlarge"></div>
                  <div id="circle-xxlarge"></div>
            </div>
            <Container className="p-0">
               <Row className="no-gutters">
                  <Col md="6" className="text-center pt-5">
                     <div className="sign-in-detail text-white">
                           <Link className="sign-in-logo mb-5" to="#"><Image src={logo} className="img-fluid" alt="logo"/></Link>
                           <div className="sign-slider overflow-hidden">
                              <Swiper 
                                 spaceBetween={30} 
                                 centeredSlides={true} 
                                 autoplay={{
                                    "delay": 2000,
                                    "disableOnInteraction": false }}    
                                 className="list-inline m-0 p-0 ">
                                 <SwiperSlide>
                                    <Image src={login1} className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Find new friends</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <Image src={login2} className="img-fluid mb-4" alt="logo"/> 
                                    <h4 className="mb-1 text-white">Connect with the world</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <Image src={login3} className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Create new events</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                 </SwiperSlide>
                              </Swiper>
                           </div>
                     </div>
                  </Col>
                  <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
                     <div className="sign-in-from">
                        <h1 className="mb-0">Create Family</h1>
                        <Form className="mt-4" onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='spaceName' >
                    <Form.Label>Space Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Space Name' 
                        value={spaceName} 
                        onChange={(e) => setSpaceName(e.target.value)}
                    />
                </Form.Group>

                <Row>
        <Col md={6}>
            <Form.Group className='my-2' controlId='firstName' >
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter First Name' 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>
        </Col>
        <Col md={6}>
            <Form.Group className='my-2' controlId='lastName' >
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter Last Name' 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>
        </Col>
    </Row>
                  <Row>
                  <Col md={6}>
                  <Form.Group className='my-2' controlId='userName' >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Username' 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                  </Col>
                  <Col md={6}>
                  <Form.Group className='my-2' controlId='email' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>                   
                  </Col>
                  </Row>

                  <Row>
                  <Col md={6}>
                  <Form.Group className='my-2' controlId='password' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                  </Col>
                  <Col md={6}>
                  <Form.Group className='my-2' controlId='passwordConfirm' >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password Again' 
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </Form.Group>

                  </Col>
                  </Row>
                <Row>
        <Col md={6}>
            <Form.Group className='my-2' controlId='gender'>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Control>
            </Form.Group>
        </Col>
        <Col md={6}>
            <Form.Group className='my-2' controlId='dateOfBirth' >
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control 
                    type='date' 
                    value={dateOfBirth} 
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </Form.Group>
        </Col>
    </Row>
                           <div className="d-inline-block w-100">
                              <Form.Check className="d-inline-block mt-2 pt-1">
                                    <Form.Check.Input type="checkbox" className="me-2" id="customCheck1" onChange={handleTermsChange}  checked={acceptTerms}/>
                                    <Form.Check.Label>I accept <Link to="#">Terms and Conditions</Link></Form.Check.Label>
                              </Form.Check>
                              <Button type="submit"  disabled={!acceptTerms} className="btn-primary float-end ">Sign Up</Button>
                           </div>
                           <div className="sign-info">
                              <span className="dark-color d-inline-block line-height-2">Already Have Account ? <Link to="/auth/sign-in">Log In</Link></span>
                        
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

export default SignUp
