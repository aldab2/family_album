import { Container, Card, Button } from 'react-bootstrap';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
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
<h1>Welcome back, {userInfo.firstName + " " +userInfo.lastName}!</h1>
      <p>Explore what's new in your Family Space.</p>
      
      <div className="mt-4">
        
        <h2>Family Album Gellery Here</h2>
        
      </div>
        </Card>
        </>
         : 
        
        <>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
        <h1>Welcome to Family Space</h1>
      <p className="lead">
        Your private family hub in the digital world.
      </p>

      <p>
        In an era where social media connects billions globally, Family Space offers a unique, 
        family-centered environment. Share texts, photos, and videos securely and privately within 
        your family circle.
      </p>

      <p>
        Designed with families in mind, Family Space allows parents to maintain oversight while 
        children engage in a controlled and safe digital space. Our platform is responsive and 
        inclusive, adapting seamlessly to various devices, ensuring a comfortable experience for 
        all family members.
      </p>
      <p className="mt-4 text-muted">
        Join Family Space today and start creating your private family hub.
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