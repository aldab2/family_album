import React from 'react';
import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer';
import { Form,Button,Col,Row } from "react-bootstrap";
import {useLoginMutation} from '../slices/usersApiSlice'
import { setCredentials } from "../slices/authSlice";
import {toast}  from 'react-toastify'
import Loader from '../components/Loader'
import { RootState } from '../store';

const LoginScreen = () =>{
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login,{isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state:RootState)=> state.authReducer);

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await login({userName,password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
        }
        catch(err:any){
            toast.error(err?.data?.message || err.error);
        }
    }
    
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email' >
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Enter Username' 
                    value={userName} 
                    onChange={(e)=>setUserName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group className='my-2' controlId='password' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Enter Password' 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {isLoading ? <Loader></Loader> : <></>}

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>

                <Row className="py-3">
                <Col>
                New Family? <Link to='/register-family'>Create Family</Link>
                </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;