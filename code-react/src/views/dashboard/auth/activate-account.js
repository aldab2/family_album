import React, { useEffect, useState } from 'react'
import {Form,Row,Col,Container,Image,Button, Card} from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'


//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
// import 'swiper/components/navigation/navigation.scss';

//image
import mail from '../../../assets/images/login/mail.png'
import logo from '../../../assets/images/tmp-logo.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'
import { useDispatch, useSelector } from 'react-redux';
import { useActivateUserMutation, useLazySendVerificationCodeQuery } from '../../../store/slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../../../store/slices/authSlice';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);
const RESEND_TIMER_SECS = 5;
const ActivateAccount = () => {
    const [activationCode, setActivationCode] = useState('');
    const [timer, setTimer] = useState(RESEND_TIMER_SECS);
    const navigate = useNavigate();
   const dispatch = useDispatch();


   const { userInfo } = useSelector(state => state.authReducer) || {};

   const [activateUser, { isLoading: isActivatingUser,error:activateUserError }] = useActivateUserMutation();
   const [sendVerificationCode, { isLoading: isSendingVerificationCode,error:sendVerificationCodeError }] = useLazySendVerificationCodeQuery();
 

   useEffect(() => {
      if (userInfo && userInfo.active) {
         navigate('/')
      }
      else if (!userInfo){
        navigate('/auth/sign-in')
      }
      else {

        
        sendVerificationCode();

        
      }
   }, [navigate, userInfo])

   useEffect(()=>{
    if(sendVerificationCodeError){
    toast.error(sendVerificationCodeError.data?.message || sendVerificationCodeError.error)
    
    }
       
   },[sendVerificationCodeError])

   useEffect(()=>{
    if(activateUserError){
        toast.error(activateUserError.data?.message ||  activateUserError.error)
    }
    
   },[activateUserError])

   // Function to start the OTP send process and countdown
  const sendActivationCode = async () => {
    // Call your OTP sending function here
    setTimer(RESEND_TIMER_SECS);
    await sendVerificationCode();
    
  };

    // Effect hook to handle the countdown
    useEffect(() => {
        let interval = null;
    
        if (timer > 0) {
          interval = setInterval(() => {
            setTimer(timer - 1);
          }, 1000);
        }
    
        return () => clearInterval(interval);
      }, [timer]);


      const handleActivateButton = async()=>{

        try{
            const user = await activateUser({code:activationCode}).unwrap();
            dispatch(setCredentials({ ...user }))
        }
        catch(err){
            //toast.err(err)
        }
        

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
                                <Link className="sign-in-logo mb-5" to="#">
                                    <Image src={logo} className="img-fluid" alt="logo"/>
                                </Link>
                                <div className="sign-slider overflow-hidden ">
                                    <Swiper 
                                        spaceBetween={30} 
                                        centeredSlides={true} 
                                        autoplay={{
                                            "delay": 2000,
                                            "disableOnInteraction": false }}   
                                        className="list-inline m-0 p-0 ">
                                        <SwiperSlide>
                                            <Image src={login1} className="img-fluid mb-4" alt="logo"/>
                                            <h4 className="mb-1 text-white">Perserve Family Memories</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image src={login2} className="img-fluid mb-4" alt="logo"/> 
                                            <h4 className="mb-1 text-white">All Memories Together</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image src={login3} className="img-fluid mb-4" alt="logo"/>
                                            <h4 className="mb-1 text-white">Connect with Other Families</h4>
                                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </Col>
                        <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
                        <Card>
      <Card.Header className="d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">OTP Verification</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <p>Please enter the Activation code sent to your email.</p>
        

        {timer != 0 && <p>You can resend the code in {timer} seconds</p>}
        {timer == 0 && <p className="text-primary" style={{ cursor: 'pointer' }} onClick={sendActivationCode}>
              Resend Activation Code
            </p>}
        <Form>
          <Form.Group className="form-group">
            <Form.Label>Activation Code:</Form.Label>
            <Form.Control type="number" value={activationCode} onChange={(e) => setActivationCode(e.target.value)} maxLength="6" />
          </Form.Group>

          <Button variant="primary" onClick={() => handleActivateButton()} >Activate Account</Button>{' '}
          
          
        </Form>
      </Card.Body>
    </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ActivateAccount;
