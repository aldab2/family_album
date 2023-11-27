// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {clearCredentials} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const { userInfo } = useSelector((state) => state.authReducer);
  const [logoutApiCall, {isLoading}] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async ()=>{
    try{
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate('/');
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Family Space</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.userName } id='username'>

                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        <FaUser /> Profile
                      </NavDropdown.Item>
                    </LinkContainer>

                    
                      <NavDropdown.Item onClick={logoutHandler}>
                        <FaSignOutAlt /> Logout
                      </NavDropdown.Item>

                  </NavDropdown>




                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/register-family'>
                    <Nav.Link >
                      <FaSignOutAlt /> Create Family
                    </Nav.Link>

                  </LinkContainer>
                </>
              )}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;