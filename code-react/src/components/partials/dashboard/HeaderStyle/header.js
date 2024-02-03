import React, { useEffect, useState } from "react";
import {
  Dropdown,
  Nav,
  Form,
  Card,
  Container,
  Image,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//image
import user1 from "../../../../assets/images/user/1.jpg";
import user2 from "../../../../assets/images/user/02.jpg";
import user3 from "../../../../assets/images/user/03.jpg";
import user4 from "../../../../assets/images/user/04.jpg";
import user5 from "../../../../assets/images/user/05.jpg";
import user6 from "../../../../assets/images/page-img/19.jpg";
import user7 from "../../../../assets/images/page-img/18.jpg";
import user8 from "../../../../assets/images/page-img/20.jpg";
import user9 from "../../../../assets/images/page-img/21.jpg";
import user10 from "../../../../assets/images/page-img/22.jpg";
import user11 from "../../../../assets/images/page-img/23.jpg";
import user12 from "../../../../assets/images/page-img/24.jpg";
import user13 from "../../../../assets/images/page-img/09.jpg";
import user14 from "../../../../assets/images/page-img/03.jpg";
import user15 from "../../../../assets/images/page-img/02.jpg";
import user16 from "../../../../assets/images/page-img/01.jpg";
//Componets
import CustomToggle from "../../../dropdowns";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../../store/slices/usersApiSlice";
import { clearCredentials } from "../../../../store/slices/authSlice";
// import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

const Header = () => {
  
  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  const [show, setShow] = useState(false);
  const {userInfo} = useSelector((state)=> state.authReducer);
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(clearCredentials());
      navigate('/auth/sign-in');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div className="iq-top-navbar">
        <Nav
          expand="lg"
          variant="light"
          className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0"
        >
          <Container fluid className="navbar-inner">
            <div className="d-flex align-items-center gap-3  pb-2 pb-lg-0">
             
              <Link
                to="/"
                className="d-flex align-items-center gap-2 iq-header-logo"
              >
                <svg
                  width="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z"
                    fill="currentColor"
                  />
                </svg>

                <h3
                  className="logo-title d-none d-sm-block"
                  data-setting="app_name"
                >
                  Family Space
                </h3>
              </Link>
              <Link
              to="#"
              className="sidebar-toggle"
              data-toggle="sidebar"
              data-active="true"
              onClick={minisidebar}
            >
              <div className="icon material-symbols-outlined iq-burger-menu">
                menu
              </div>
            </Link>
            </div>

            <ul className="navbar-nav navbar-list">
              <Nav.Item as="li">
                <Link to="/" className="d-flex align-items-center">
                  <i className="material-symbols-outlined">home</i>
                  <span className="mobile-text d-none ms-3">Home</span>
                </Link>
              </Nav.Item>

              <Dropdown as="li" className="nav-item ">
                <Dropdown.Toggle
                  href="#"
                  as={CustomToggle}
                  variant="search-toggle d-flex align-items-center"
                >
                  <i className="material-symbols-outlined">notifications</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sub-drop">
                  <Card className="shadow-none m-0">
                    <Card.Header className="d-flex justify-content-between bg-primary">
                      <div className="header-title bg-primary">
                        <h5 className="mb-0 text-white ">All Notifications</h5>
                      </div>
                      <small className="badge  bg-light text-dark">4</small>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user1}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Emma Watson Bni</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">95 MB</p>
                              <small className="float-right font-size-12">
                                Just Now
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user2}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">New customer is join</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                5 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user3}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Two customer is left</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                2 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <Image
                              className="avatar-40 rounded"
                              src={user4}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="w-100 ms-3">
                            <h6 className="mb-0 ">New Mail from Fenny</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                3 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>
            
              <Dropdown as="li" className="nav-item user-dropdown">
                <Dropdown.Toggle
                  href="#"
                  as={CustomToggle}
                  variant="d-flex align-items-center"
                >
                  {/* <Image
                    src={user1}
                    className="img-fluid rounded-circle me-3"
                    alt="user"
                    loading="lazy"
                  /> */}
                  <div className="caption d-none d-lg-block">
                    <h6 className="mb-0 line-height">{userInfo.firstName + " " + userInfo.lastName}</h6>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sub-drop caption-menu">
                  <Card className="shadow-none m-0">
                    <Card.Header>
                      <div className="header-title">
                        <h5 className="mb-0 ">{"Hello " + userInfo.firstName + " " + userInfo.lastName}</h5>
                      </div>
                    </Card.Header>
                    <Card.Body className="p-0 ">
                      <div className="d-flex align-items-center iq-sub-card border-0">
                        <span className="material-symbols-outlined">
                          line_style
                        </span>
                        <div className="ms-3">
                          <Link to="/dashboard/app/profile" className="mb-0 h6">
                            My Profile
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center iq-sub-card border-0">
                        <span className="material-symbols-outlined">
                          edit_note
                        </span>
                        <div className="ms-3">
                          <Link to="/dashboard/app/user-profile-edit" className="mb-0 h6">
                            Edit Profile
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center iq-sub-card border-0">
                        <span className="material-symbols-outlined">
                          manage_accounts
                        </span>
                        <div className="ms-3">
                          <Link
                            to="/dashboard/app/user-account-setting"
                            className="mb-0 h6"
                          >
                            Account settings
                          </Link>
                        </div>
                      </div>

                      <div className="d-flex align-items-center iq-sub-card">
                        <span className="material-symbols-outlined">login</span>
                        <div className="ms-3" onClick={logoutHandler}>
                         {/*  <Link to="/auth/sign-in" className="mb-0 h6">
                            Sign out
                          </Link> */}
                          Sign out
                        </div>
                      </div>

                      
                    </Card.Body>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>

              {/*  <Nav.Item as="li" className="d-lg-none">
              <Link
                to="/dashboard/app/profile"
                className="dropdown-toggle d-flex align-items-center"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="mobile-text  ms-3">Profile</span>
              </Link>
      </Nav.Item>*/}
            </ul>
          </Container>
        </Nav>
      </div>
    </>
  );
};

export default Header;
