import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
const Hero = () => {

  const {userInfo} = useSelector((state)=> state.authReducer)

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>

        {userInfo ? 
        <>
<Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'> Hello {userInfo.firstName + " " + userInfo.lastName}</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
        </Card>
        </>
         : 
        
        <>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Family Space</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
            <Button variant='primary'  className='me-3'>
              Sign In
            </Button>
            </LinkContainer>

            <LinkContainer to='/register-family'>
            <Button variant='secondary' >
              Create Family
            </Button>
            </LinkContainer>
          </div>
        </Card>
        </>}
        
      </Container>
    </div>
  );
};

export default Hero;