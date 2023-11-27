import { Navbar, Nav, Container, NavDropdown, Badge, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {clearCredentials} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useGetFamilyMembersQuery, useGetUserInfoQuery,useDeleteUserMutation } from '../slices/profileApiSlice';
import {toast}  from 'react-toastify'


const ProfileScreen = () => {
    const [user,setUser] = useState('');
    const [familyMembers,setFamilyMembers] = useState([]);
    const [spaceInfo , setSpaceInfo] = useState('');

    const {userInfo} = useSelector((state)=> state.authReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data:fetchedUser,isLoading:isGetUserLoading,} = useGetUserInfoQuery();
    const  {data:fetchedFamilyMember, isLoading:isgetFamilyMembersLoading, refetch:refetchFamily}  = useGetFamilyMembersQuery();
    const [deleteUser, {isLoading:isDeleteUserLoading}] = useDeleteUserMutation();

    useEffect(()=>{
        if(fetchedUser){
            setUser(fetchedUser);
        }
        if(fetchedFamilyMember){

            setSpaceInfo(fetchedFamilyMember);
            setFamilyMembers(fetchedFamilyMember.familyMembers);
        }
       
    },[fetchedUser,fetchedFamilyMember])

    const handleDelete = async (userName)=>{
        try {
            
            const res = await deleteUser({userName}).unwrap();
            refetchFamily();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            
        }

    }

    const formatDate = (dateString) => {
        if(dateString){

            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        }
        return null
      };

  return (

    <>
    <Row className="mb-4">
        <Col>
          <h2>Logged In User Information</h2>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Username:</strong> {user.userName}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {formatDate(user?.dateOfBirth)}</p>
          <p><strong>Space Name:</strong> {spaceInfo.spaceName}</p>
        </Col>
      </Row>
      <h2>Family Members</h2>
    <ListGroup>
      {familyMembers.map((member, index) => (
        <ListGroup.Item key={index}>
          <Row className="align-items-center">
            <Col xs={8} md={10}>
              <div><strong>Name:</strong> {member.firstName} {member.lastName}</div>
              <div><strong>Username:</strong> {member.userName}</div>
              <div><strong>Role:</strong> {member.role}</div>
              <div><strong>Email:</strong> {member.email}</div>
              <div><strong>Gender:</strong> {member.gender}</div>
              <div><strong>Date of Birth:</strong> {formatDate(member.dateOfBirth)}</div>
            </Col>
            <Col xs={4} md={2} className="text-right">
              <Button variant="primary" size="sm" className="me-2">Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(member.userName)}>Delete</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
    </>
  )
}

export default ProfileScreen