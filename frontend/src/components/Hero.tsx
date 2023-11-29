import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from '../store';



const Hero: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.authReducer);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        setSelectedFile(event.target.files[0]);
    }
};
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
          const response = await fetch('/api/post/mediaExample', {
              method: 'POST',
              body: formData,
          });
          const result = await response.json();
          console.log(result);
      } catch (error) {
          console.error('Error uploading file:', error);
      }
  }
};
  

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        {userInfo ? (
          <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <h1>Welcome back, {userInfo.firstName + " " + userInfo.lastName}!</h1>
            <p>Explore what's new in your Family Space.</p>
            <div className="mt-4">
              <h2>Family Album Gallery Here</h2>
              <form className='m-3' onSubmit={handleSubmit}>
              <input  type='file' onChange={handleFileChange}></input>
              <Button type='submit' >Send file</Button>
              </form>
            </div>
          </Card>
        ) : (
          <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <h1>Welcome to Family Space</h1>
            <p className="lead">
              Your private family hub in the digital world.
            </p>
            {/* ... rest of your JSX */}
            <div className='d-flex'>
              <LinkContainer to='/login'>
                <Button variant='primary' className='me-3'>
                  Sign In
                </Button>
              </LinkContainer>
              <LinkContainer to='/register-family'>
                <Button variant='secondary'>
                  Create Family
                </Button>
              </LinkContainer>
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Hero;
