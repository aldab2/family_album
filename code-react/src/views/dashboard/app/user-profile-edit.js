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

                          {family?.familyMembers?.map((member) => <FamilyMember key={member.id} member={member} updateUser={updateUser} deleteUser = {deleteUser} family={family} onSetFamily={setFamily} viewOnly={familyId? true:false}/>)}
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