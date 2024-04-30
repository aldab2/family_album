import React from 'react'
import {Container, Row, Col, Card, Tab, Form, Button, Nav} from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserInfoQuery, useUpdateUserMutation, useDeleteUserMutation, useAddFamilyMemberMutation  } from '../../../store/slices/profileApiSlice';
import {useGetFamilyMembersQuery, useEditFamilyProfileMutation } from '../../../store/slices/profileApiSlice';
import { UserInfo } from './UserInfo';
import { ChangePassword } from './ChangePassword';
import { FamilyInfo } from './FamilyInfo';
import { FamilyMember } from './FamilyMember';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';





const UserProfileEdit =({}) =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const familyId = queryParams.get('familyId');
    
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const { data: userInfo, refetch } = useGetUserInfoQuery();
    const { data: familyQueryResult, isLoading, isError, error } = useGetFamilyMembersQuery(familyId || null);
    const [editFamilyProfile, { isLoading: isEditing }] = useEditFamilyProfileMutation();
    const [addFamilyMember, { isLoading: isAdding }] = useAddFamilyMemberMutation();
    


    // console.log("the Family: ", family)
    // const { userInfo } = useSelector((state) => state.authReducer);
    // const { userInfo } = useSelector(state => state.userReducer) || {};
    // console.log("userinfo=", userInfo)

    const [family, setFamily] = useState([])
    const [userInput, setUserInput] = useState({...userInfo});
    const [updateUser, { isLoading2, isSuccess2, isError2, error2 }] = useUpdateUserMutation();
    

    useEffect(() => {
        if (userInfo) {
            //console.log("UserInfo updated:", userInfo);
            setUserInput({ ...userInfo });
        }
    }, [userInfo]); // Remove 'userInput' from dependency array

    // Assuming FamilyMember component calls this function on delete
const handleDeleteFamilyMember = async (memberId) => {
    try {
        await deleteUser(memberId);
        // Assume delete was successful and update UI optimistically
        setFamily((currentFamily) => ({
            ...currentFamily,
            familyMembers: currentFamily.familyMembers.filter(m => m.id !== memberId)
        }));
    } catch (error) {
        // Handle error (e.g., show a message)
        console.error('Failed to delete family member:', error);
    }
}
const handleDelete = async (userNameToDelete) => {
    // Display a confirmation dialog to the user
    // const isConfirmed = window.confirm(`Are you sure you want to delete the user ${userNameToDelete}?`);
    // Proceed only if the user confirmed the action
    // if (isConfirmed) {
    // console.log("The user to delete is:", userNameToDelete);
    try {
        await deleteUser({ userName: userNameToDelete }).unwrap();
        toast.success("Family member deleted successfully");
        // onSetFamily((family) => ({
        //     ...family,
        //     familyMembers: family.familyMembers.filter((member) => member.userName !== userNameToDelete)
        //   }));
        setFamily((currentFamily) => ({
            ...currentFamily,
            familyMembers: currentFamily.familyMembers.filter(m => m.userName !== userNameToDelete)
        }));

    } catch (error) {
        console.log(error)
        toast.error(`Failed to delete family member: ${error.data?.message || 'An error occurred'}`);
    } finally {
        
        //setShowConfirm(false); // Ensure the modal is closed after operation
    }

    //else {
    //     // User clicked 'Cancel', do not proceed with deletion
    //     console.log("User deletion cancelled")
};

    
    useEffect(() => {
        if (familyQueryResult) {
            //console.log("UserInfo updated:", userInfo);
            setFamily({ ...familyQueryResult });
        }
    }, [familyQueryResult]); // Remove 'userInput' from dependency array
  return(
      <>
        <Container>
            <Tab.Container defaultActiveKey={family?"third":"first"}>
          <Row>
              <Col lg="12">
                  <Card>
                      <Card.Body className="p-0">
                          <div>
                              <Nav hidden={familyId!= null} as="ul" variant="pills" className="iq-edit-profile row">
                                  <Nav.Item as="li" className="col-sm p-0">
                                      <Nav.Link  eventKey="first" role="button">
                                          Personal Information
                                      </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item as="li" className="col-sm p-0">
                                      <Nav.Link eventKey="second" role="button">
                                          Change Password
                                      </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item as="li" className="col-sm p-0">
                                      <Nav.Link  eventKey="third" role="button">
                                          Family Profile
                                      </Nav.Link>
                                  </Nav.Item>
                                  {/* <Nav.Item as="li" className="col-md-3 p-0">
                                      <Nav.Link eventKey="fourth" role="button">
                                          Manage Contact
                                      </Nav.Link>
                                  </Nav.Item> */}
                              </Nav>
                          </div>
                      </Card.Body>
                  </Card>
              </Col>
              <Col lg={12}>
                  {/* <div className="iq-edit-list-data"> */}
                      <Tab.Content>
                        <Tab.Pane eventKey="first" className="fade show">
                            <UserInfo userInput = {userInput} userInfo={userInfo} onUserInput={setUserInput} updateUser={updateUser} refetch = {refetch}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second" className="fade show">
                            <ChangePassword />
                        </Tab.Pane>

                        
                        <Tab.Pane eventKey="third" className="fade show">
                        <FamilyInfo family= {family} onSetFamily = {setFamily} editFamilyProfile={editFamilyProfile} addFamilyMember ={addFamilyMember} viewOnly={familyId? true:false}  />

                          {family?.familyMembers?.map((member) => <FamilyMember key={member.id} member={member} updateUser={updateUser} deleteUser = { () => handleDelete(member.userName)} family={family} onSetFamily={setFamily} viewOnly={familyId? true:false}/>)}
                        </Tab.Pane>

                          {/* <ManageContact />    */}
                                               
                      </Tab.Content>
                  {/* </div> */}
              </Col>
          </Row>
          </Tab.Container>
        </Container>
      </>
  )

}



export default UserProfileEdit;