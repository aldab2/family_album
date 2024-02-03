import React from 'react'
import {Container, Row, Col, Card, Tab, Form, Button, Nav} from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetUserInfoQuery, useUpdateUserMutation } from '../../../store/slices/profileApiSlice';



const familyMembers = {
    id: "65a9328c79bd3261ba6ac4ac",
    spaceName: "Gashlan",
    Members: [
        {
            id: "65a9328c79bd3261ba6ac4aa",
            firstName: "Ayman",
            lastName: "Gashlan",
            userName: "gashlan",
            email: "agashlan1991@gmail.com",
            gender: "male",
            dateOfBirth: "1991-05-22T00:00:00.000Z",
            active: true,
            activationCode: "15550",
            role: "parent",
            family: "65a9328c79bd3261ba6ac4ac",
            createdAt: "2024-01-18T14:15:40.345Z",
            updatedAt: "2024-02-01T06:03:42.512Z"
        },
        {
            id: "65bb5c5bcb6c4397255aef3a",
            firstName: "XYZ",
            lastName: "ASD",
            userName: "admin2",
            email: "asd@asd.com",
            gender: "female",
            dateOfBirth: "2024-05-05T00:00:00.000Z",
            active: false,
            activationCode: "62896",
            role: "parent",
            family: "65a9328c79bd3261ba6ac4ac",
            createdAt: "2024-02-01T08:54:51.435Z",
            updatedAt: "2024-02-01T08:54:51.435Z"
        }
    ],
    createdAt: "2024-01-18T14:15:40.448Z",
    updatedAt: "2024-02-01T08:54:51.528Z"
}





const UserProfileEdit =() =>{
    
    const { data: userInfo, refetch } = useGetUserInfoQuery();
    
    // const { userInfo } = useSelector((state) => state.authReducer);
    // const { userInfo } = useSelector(state => state.userReducer) || {};
    console.log("userinfo=", userInfo)

    const [userInput, setUserInput] = useState({...userInfo});
    const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
    
    // useEffect(() => {
    //     console.log(userInfo, userInput)
    //     // setUserInput({...userInfo});
            
    // }, [userInfo, userInput]);

    useEffect(() => {
        if (userInfo) {
            console.log("UserInfo updated:", userInfo);
            setUserInput({ ...userInfo });
        }
    }, [userInfo]); // Remove 'userInput' from dependency array
    

  return(
      <>
        <Container>
            <Tab.Container defaultActiveKey="first">
          <Row>
              <Col lg="12">
                  <Card>
                      <Card.Body className="p-0">
                          <div>
                              <Nav as="ul" variant="pills" className="iq-edit-profile row">
                                  <Nav.Item as="li" className="col-md-3 p-0">
                                      <Nav.Link  eventKey="first" role="button">
                                          Personal Information
                                      </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item as="li" className="col-md-3 p-0">
                                      <Nav.Link eventKey="second" role="button">
                                          Change Password
                                      </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item as="li" className="col-md-3 p-0">
                                      <Nav.Link  eventKey="third" role="button">
                                          FamilyMember
                                      </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item as="li" className="col-md-3 p-0">
                                      <Nav.Link eventKey="fourth" role="button">
                                          Manage Contact
                                      </Nav.Link>
                                  </Nav.Item>
                              </Nav>
                          </div>
                      </Card.Body>
                  </Card>
              </Col>
              <Col lg={12}>
                  {/* <div className="iq-edit-list-data"> */}
                      <Tab.Content>
                          <UserInfo userInput = {userInput} userInfo={userInfo} onUserInput={setUserInput} updateUser={updateUser} refetch = {refetch}/>

                          <ChangePassword />

                          {familyMembers.Members.map((member) => <FamilyMember key={member.id} member={member} />)}


                          <ManageContact />   
                                               
                      </Tab.Content>
                  {/* </div> */}
              </Col>
          </Row>
          </Tab.Container>
        </Container>
      </>
  )

}


function UserInfo({ userInput, onUserInput, userInfo, updateUser, refetch}){
    const [isEditMode, setIsEditMode] = useState(false);
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
      };

    const handleCancel = () => {
        // Reset userInput to the original userInfo values
        onUserInput({ ...userInfo });
        setIsEditMode(false);
      };
    
    // function getChangedData(original, updated) {
    //     const changes = {};
    //     Object.keys(updated).forEach(key => {
    //         // Check if the property exists in the original data and if it has changed
    //         if (original[key] !== updated[key]) {
    //             changes[key] = updated[key];
    //         }
    //     });
    //     return changes;
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.role === 'parent' && userInput.role !== 'parent') {
            toast.error('Parent role cannot be changed.');
            return;
        }

        // const changed = getChangedData(userInfo, userInput);
        // Construct the payload with currentUserName and the updated fields
        const payload = {
            ...userInput, // Spread the updated userInput fields
            currentUserName: userInfo.userName, // Include the original userName to find the user
        };
        console.log("Updating user with payload:", payload);
    
        try {
            await updateUser(payload).unwrap();
            toast.success('User updated successfully!');
            refetch();
            setIsEditMode(false); // Exit edit mode on successful update
        } catch (err) {
            toast.error(`Update failed: ${err.data?.message || 'Unknown error'}`);
        }
    };


    return (
        <Tab.Pane eventKey="first" className="fade show">
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="card-title">Personal Information</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-end">
                        <Button type="button" className="btn btn-primary me-2" onClick={toggleEditMode}>Edit</Button>
                        </div>
                            
                            <Row className="align-items-center">
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor="fname"  className="form-label">First Name:</Form.Label>
                                    <Form.Control type="text" className="form-control" id="fname" readOnly={!isEditMode} value={userInput.firstName || ""} onChange={(e) => onUserInput({...userInput, firstName: e.target.value})}/>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor="lname" className="form-label">Last Name:</Form.Label>
                                    <Form.Control type="text" className="form-control" id="lname" readOnly={!isEditMode} value={userInput.lastName || ""} onChange={(e) => onUserInput({...userInput, lastName: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor="uname" className="form-label">User Name:</Form.Label>
                                    <Form.Control type="text" className="form-control" id="uname" readOnly={!isEditMode} value={userInput.userName || ""} onChange={(e) => onUserInput({...userInput, userName: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor="cname" className="form-label">Email:</Form.Label>
                                    <Form.Control type="text" className="form-control" id="cname" readOnly={!isEditMode} value={userInput.email || ""} onChange={(e) => onUserInput({...userInput, email: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label className="form-label d-block">Gender:</Form.Label>
                                    <Form.Check className="form-check form-check-inline">
                                <Form.Check.Input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="gender" 
                                    id="genderMale" 
                                    value="male" 
                                    checked={userInput.gender === "male"} 
                                    onChange={(e) => onUserInput({...userInput, gender: e.target.value})}
                                    disabled={!isEditMode}
                                />
                                <Form.Check.Label className="form-check-label" htmlFor="genderMale">Male</Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                <Form.Check.Input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="gender" 
                                    id="genderFemale" 
                                    value="female" 
                                    checked={userInput.gender === "female"} 
                                    onChange={(e) => onUserInput({...userInput, gender: e.target.value})}
                                    disabled={!isEditMode}
                                />
                                <Form.Check.Label className="form-check-label" htmlFor="genderFemale">Female</Form.Check.Label>
                                </Form.Check>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor="dob" className="form-label">Date Of Birth:</Form.Label>
                                    <Form.Control className="form-control" id="dob" readOnly={!isEditMode} value={userInput.dateOfBirth || ""} onChange={(e) => onUserInput({...userInput, dateOfBirth: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor="role" className="form-label">Role:</Form.Label>
                                    <Form.Select 
                                        id="role" 
                                        value={userInput.role || ""} 
                                        onChange={(e) => onUserInput({...userInput, role: e.target.value})}
                                        disabled={!isEditMode}
                                    >
                                        <option value="parent">parent</option>
                                        <option value="adult">adult</option>
                                        <option value="child">child</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor="family" className="form-label">Family:</Form.Label>
                                    <Form.Control className="form-control" id="family" readOnly={!isEditMode} value={userInput.family || ""} onChange={(e) => onUserInput({...userInput, family: e.target.value})} />
                                </Form.Group>
                                
                            </Row>
                            {isEditMode && (
                            <>
                                <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                <Button type="button" className="btn bg-soft-danger" onClick={handleCancel}>Cancel</Button>
                            </>
                            )}
                    </Form>
                </Card.Body>
            </Card>
        </Tab.Pane>
    )
}



function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Simple validation
        if (newPassword !== verifyPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        else if (newPassword.length < 8){
            toast.error('Passwords must be at least 8 characters long');
            return;
        }

        // TODO: Submit the new password to the server
        toast.success('Password updated successfully');
        // You would typically send a request to your server here
    };
    return(
        <Tab.Pane eventKey="second" className="fade show">
                              <Card>
                                  <Card.Header className="d-flex justify-content-between">
                                  <div className="iq-header-title">
                                      <h4 className="card-title">Change Password</h4>
                                  </div>
                                  </Card.Header>
                                  <Card.Body>
                                    <Form onSubmit={handleSubmit} >
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="cpass" className="form-label">Current Password:</Form.Label>
                                            {/* <Link to="#" className="float-end">Forgot Password</Link> */}
                                            <Form.Control type="Password" className="form-control" id="cpass" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="npass" className="form-label">New Password:</Form.Label>
                                            <Form.Control type="Password" className="form-control" id="npass" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="vpass" className="form-label">Verify Password:</Form.Label>
                                            <Form.Control type="Password" className="form-control" id="vpass" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>
                                        </Form.Group>
                                        <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                        <Button type="reset" className="btn bg-soft-danger" onClick={() => {setCurrentPassword(''); setNewPassword(''); setVerifyPassword('');}}>Reset</Button>
                                    </Form>
                                  </Card.Body>
                              </Card>
                          </Tab.Pane>
    )
}


function FamilyMember({member}){
    return (
        <Tab.Pane eventKey="third" className="fade show">
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="card-title">Personal Information</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <div className="d-flex justify-content-end">
                            <Button type="edit" className="btn btn-primary me-2">Edit</Button>
                        </div>
                            
                            <Row className="align-items-center">
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor={member.id+"fname"}  className="form-label">First Name:</Form.Label>
                                    <Form.Control type="text" className="form-control" id={member.id+"fname"} value={member.firstName}  />
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor={member.id+"lname"} className="form-label">Last Name:</Form.Label>
                                    <Form.Control type="text" className="form-control" id={member.id+"lname"} value={member.lastName}/>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor={member.id+"uname"} className="form-label">User Name:</Form.Label>
                                    <Form.Control type="text" className="form-control" id={member.id+"uname"} value={member.userName}/>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor={member.id+"cname"} className="form-label">Email:</Form.Label>
                                    <Form.Control type="text" className="form-control" id={member.id+"cname"} value={member.email}/>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label className="form-label d-block">Gender:</Form.Label>
                                    <Form.Check className="form-check form-check-inline">
                                        <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id={member.id+"inlineRadio10"} defaultValue="option1"/>
                                        <Form.Check.Label className="form-check-label" htmlFor={member.id+"inlineRadio10"}> Male</Form.Check.Label>
                                    </Form.Check>
                                    <Form.Check className="form-check form-check-inline">
                                        <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id={member.id+"inlineRadio11"} defaultValue="option1"/>
                                        <Form.Check.Label className="form-check-label" htmlFor={member.id+"inlineRadio11"}>Female</Form.Check.Label>
                                    </Form.Check>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor={member.id+"dob"} className="form-label">Date Of Birth:</Form.Label>
                                    <Form.Control className="form-control" id={member.id+"dob"} value={member.dateOfBirth}/>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor={member.id+"role"} className="form-label">Role:</Form.Label>
                                    <Form.Control className="form-control" id={member.id+"role"} value={member.role}/>
                                </Form.Group>
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label htmlFor={member.id+"family"} className="form-label">Family:</Form.Label>
                                    <Form.Control className="form-control" id={member.id+"family"} value={member.family}/>
                                </Form.Group>
                                
                            </Row>
                            <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                            <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Tab.Pane>
    )
}


function ManageContact(){
    return (
        <Tab.Pane eventKey="fourth" className="fade show">
                              <Card>
                                  <Card.Header className="d-flex justify-content-between">
                                  <div className="header-title">
                                      <h4 className="card-title">Manage Contact</h4>
                                  </div>
                                  </Card.Header>
                                  <Card.Body>
                                      <Form>
                                          <Form.Group className="form-group">
                                              <Form.Label htmlFor="cno"  className="form-label">Contact Number:</Form.Label>
                                              <Form.Control type="text" className="form-control" id="cno" defaultValue="001 2536 123 458"/>
                                          </Form.Group>
                                          <Form.Group className="form-group">
                                              <Form.Label htmlFor="email"  className="form-label">Email:</Form.Label>
                                              <Form.Control type="text" className="form-control" id="email" defaultValue="Bnijone@demo.com"/>
                                          </Form.Group>
                                          <Form.Group className="form-group">
                                              <Form.Label htmlFor="url"  className="form-label">Url:</Form.Label>
                                              <Form.Control type="text" className="form-control" id="url" defaultValue="https://getbootstrap.com"/>
                                          </Form.Group>
                                          <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                          <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                      </Form>
                                  </Card.Body>
                              </Card>
                          </Tab.Pane>
    )
}
export default UserProfileEdit;