import { useState } from "react";
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col, Row } from "react-bootstrap";

const RegisterScreen = () =>{
    const [spaceName, setSpaceName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');    
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');


    const submitHandler = async(e) => {
        e.preventDefault();
        console.log('submit');
        // Here you would handle the submission, e.g. sending data to the backend
    }
    
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='spaceName' >
                    <Form.Label>Space Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Space Name' 
                        value={spaceName} 
                        onChange={(e) => setSpaceName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId='firstName' >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter First Name' 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId='lastName' >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Last Name' 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId='userName' >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Username' 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId='email' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className='my-2' controlId='password' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId='password' >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password Again' 
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId='gender'>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='dateOfBirth' >
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        type='date' 
                        value={dateOfBirth} 
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </Form.Group>

                <Button   type='submit' variant='primary' className='justify-content-center mt-3'>
                    Create Family!
                </Button>

                <Row className="py-3">
                <Col>
                Already a family member? <Link to='/login'>Sign In</Link>
                </Col>
                </Row>

            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;
