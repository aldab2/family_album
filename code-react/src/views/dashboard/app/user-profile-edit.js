import React from 'react'
import {Container, Row, Col, Card, Tab, Form, Button, Nav} from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetUserInfoQuery, useUpdateUserMutation, useChangePasswordMutation, useDeleteUserMutation, useAddFamilyMemberMutation  } from '../../../store/slices/profileApiSlice';
import {useGetFamilyMembersQuery, useEditFamilyProfileMutation } from '../../../store/slices/profileApiSlice';
import ConfirmModal from './ConfirmModal';






const UserProfileEdit =() =>{

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const { data: userInfo, refetch } = useGetUserInfoQuery();
    const { data: family, isLoading, isError, error } = useGetFamilyMembersQuery();
    const [editFamilyProfile, { isLoading: isEditing }] = useEditFamilyProfileMutation();
    const [addFamilyMember, { isLoading: isAdding }] = useAddFamilyMemberMutation();

    // console.log("the Family: ", family)
    // const { userInfo } = useSelector((state) => state.authReducer);
    // const { userInfo } = useSelector(state => state.userReducer) || {};
    // console.log("userinfo=", userInfo)

    const [userInput, setUserInput] = useState({...userInfo});
    const [updateUser, { isLoading2, isSuccess2, isError2, error2 }] = useUpdateUserMutation();
    
    // useEffect(() => {
    //     console.log(userInfo, userInput)
    //     // setUserInput({...userInfo});
            
    // }, [userInfo, userInput]);

    useEffect(() => {
        if (userInfo) {
            //console.log("UserInfo updated:", userInfo);
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
                          <UserInfo userInput = {userInput} userInfo={userInfo} onUserInput={setUserInput} updateUser={updateUser} refetch = {refetch}/>

                          <ChangePassword />

                          <FamilyInfo family= {family} editFamilyProfile={editFamilyProfile} addFamilyMember ={addFamilyMember}  />

                          {family?.familyMembers?.map((member) => <FamilyMember key={member.id} member={member} updateUser={updateUser} deleteUser = {deleteUser} />)}


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
        // console.log("Updating user with payload:", payload);
    
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
                                    <Form.Label  className="form-label d-block">Gender:</Form.Label>
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
                                    <Form.Control className="form-control" id="dob" type = "date" readOnly={!isEditMode} value={userInput.dateOfBirth ? userInput.dateOfBirth.split('T')[0] : ''} onChange={(e) => onUserInput({...userInput, dateOfBirth: e.target.value})} />
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
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== verifyPassword) {
            toast.error('Passwords do not match!');
            return;
        } else if (newPassword.length < 8) {
            toast.error('Passwords must be at least 8 characters long');
            return;
        }

        try {
            // Call the mutation with the current and new password
            await changePassword({ currentPassword, newPassword }).unwrap();
            toast.success('Password updated successfully');
            // Clear the form fields
            setCurrentPassword('');
            setNewPassword('');
            setVerifyPassword('');
        } catch (error) {
            toast.error(`Password update failed: ${error.data?.message || 'An error occurred'}`);
        }
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






function FamilyInfo({ family, updateFamilyInfo, editFamilyProfile, addFamilyMember  }) {

    // Initialize state for edit mode and edited space name
    const [isEditMode, setIsEditMode] = useState(false);
    // Use a fallback for family object to prevent accessing properties of undefined
    const [editedSpaceName, setEditedSpaceName] = useState(family ? family.spaceName : '');
    // Conditional rendering based on whether the family object exists
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const [newMember, setNewMember] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        role: '',
        password: '',
        email: '',
        gender: '',
        dateOfBirth: '',
    });
    if (!family) {
        return (
            <Tab.Pane eventKey="third" className="fade show">
                <Card>
                    <Card.Body>Loading family information...</Card.Body>
                </Card>
            </Tab.Pane>
        );
    }

    // Extract and format creation and update dates
    const formattedCreatedAt = new Date(family.createdAt).toLocaleDateString("en-US");
    const formattedUpdatedAt = new Date(family.updatedAt).toLocaleDateString("en-US");

    const handleEdit = () => setIsEditMode(true);
    const handleSave = async () => {
        try {
            // Assuming your API expects an object with a 'spaceName' property
            await editFamilyProfile({ id: family.id, spaceName: editedSpaceName }).unwrap();
            toast.success('Family space name updated successfully!');
            setIsEditMode(false);
            // You might want to refetch family data here if it's being fetched in a parent component
        } catch (error) {
            toast.error(`Failed to update family space name: ${error.message}`);
        }
    };
    
    const handleCancel = () => {
        setEditedSpaceName(family.spaceName); // Reset to initial space name
        setIsEditMode(false);
    };
    
    const handleAddMemberShow = () => setShowAddMemberForm(true);
    const handleAddMemberHide = () => setShowAddMemberForm(false);
    const handleAddMemberChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
        console.log("to add", newMember)
    };
    const handleAddMemberSubmit = async (e) => {
        e.preventDefault(); // Prevent form from causing page reload
        try {
            // Adjust the payload as per your API's expectations
            await addFamilyMember({
                ...newMember,
            }).unwrap();
            toast.success('Family member added successfully!');
            handleAddMemberHide(); // Hide the add member form
            // Reset form fields after successful submission
            setNewMember({
                firstName: '',
                lastName: '',
                userName: '',
                role: '',
                password: '',
                email: '',
                gender: '',
                dateOfBirth: '',
            });
            // Optionally, refetch or update family members list here
        } catch (error) {
            toast.error(`Failed to add family member: ${error.data?.message || 'An error occurred'}`);
        }
    };

    return (
        <Tab.Pane eventKey="third" className="fade show">
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="card-title">Family Information</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <div className="mb-3">
                            <strong>ID:</strong> {family.id}
                        </div>
                        <div className="mb-3">
                            <strong>Space Name:</strong>
                            {isEditMode ? (
                                <input
                                    type="text"
                                    value={editedSpaceName}
                                    onChange={(e) => setEditedSpaceName(e.target.value)}
                                    className="form-control mt-2"
                                />
                            ) : (
                                ` ${family.spaceName}`
                            )}
                        </div>
                        <div className="mb-3">
                            <strong>Number of Users:</strong> {family.familyMembers ? family.familyMembers.length : "N/A"}
                        </div>
                        <div className="mb-3">
                            <strong>Created At:</strong> {formattedCreatedAt}
                        </div>
                        <div className="mb-3">
                            <strong>Updated At:</strong> {formattedUpdatedAt}
                        </div>
                        
                        <div className="d-flex justify-content-end">
                            {isEditMode ? (
                                <>
                                    <Button onClick={handleSave} className="btn btn-success me-2">Save</Button>
                                    <Button onClick={handleCancel} className="btn btn-secondary">Cancel</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={handleEdit} className="btn btn-primary me-2">Edit</Button>
                                    <Button variant="success" onClick={handleAddMemberShow} className="me-2">Add Member</Button>
                                </>
                            )}
                        </div>
                        {showAddMemberForm && (
                        <Card className="mt-3">
                            <Card.Header>Add New Family Member</Card.Header>
                            <Card.Body>
                            <Card >
                                <Row className="align-items-center">
                                {/* First Name */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={newMember.firstName}
                                    onChange={handleAddMemberChange}
                                    />
                                </Form.Group>

                                {/* Last Name */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={newMember.lastName}
                                    onChange={handleAddMemberChange}
                                    />
                                </Form.Group>

                                {/* Username */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="userName"
                                    value={newMember.userName}
                                    onChange={handleAddMemberChange}
                                    />
                                </Form.Group>

                                {/* Email */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                    type="email"
                                    name="email"
                                    value={newMember.email}
                                    onChange={handleAddMemberChange}
                                    />
                                </Form.Group>

                                {/* Password */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                    type="password"
                                    name="password"
                                    value={newMember.password}
                                    onChange={handleAddMemberChange}
                                    />
                                </Form.Group>

                                {/* Role */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                    name="role"
                                    value={newMember.role}
                                    onChange={handleAddMemberChange}
                                    >
                                    <option value="">Select a role</option>
                                    <option value="parent">Parent</option>
                                    <option value="adult">Adult</option>
                                    <option value="child">Child</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Gender */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select
                                    name="gender"
                                    value={newMember.gender}
                                    onChange={handleAddMemberChange}
                                    >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Date of Birth */}
                                <Form.Group className="form-group col-sm-6">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={newMember.dateOfBirth}
                                    onChange={handleAddMemberChange}
                                    />
                                </Form.Group>
                                </Row>

                                <div className="d-flex justify-content-end mt-2">
                                <Button type="submit" variant="primary" className="me-2" onClick={handleAddMemberSubmit}>Add Member</Button>
                                <Button variant="secondary" onClick={handleAddMemberHide}>Cancel</Button>
                                </div>
                            </Card>
                            </Card.Body>
                        </Card>
                        )}

                    </Form>
                </Card.Body>
            </Card>
        </Tab.Pane>
    );
}

  





function FamilyMember({member, updateUser, deleteUser}){
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode
  const [editMember, setEditMember] = useState(member); // State for editing member
  const [showConfirm, setShowConfirm] = useState(false);
  // Handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditMember(member); // Reset edit form to initial member data when toggling edit mode
  };

  // Update editMember state on form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditMember({ ...editMember, [name]: value });
  };

  // Placeholder for update functionality
const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure you have the unique identifier for the user; using userName as an example
    const uniqueIdentifier = editMember.userName; // Adjust based on your data structure

    const payload = {
        ...editMember, // Spread the updated userInput fields
        currentUserName: uniqueIdentifier, // Use the unique identifier for the user being updated
    }; 
    // console.log("Updating user with payload:", payload);
    try {
        // Call your updateUser mutation with the payload
        const result = await updateUser(payload).unwrap(); // Assuming your mutation is set up to accept and process this payload correctly
        
        // console.log('Update successful', result);
        toast.success('Member updated successfully!');
        setEditMember(result);
        // If you have a method to refetch or update the local state to reflect the updated information, call it here
        setIsEditMode(false); // Exit edit mode after successful update
    } catch (err) {
        console.error('Failed to update member:', err);
        toast.error(`Update failed: ${err.data?.message || 'An error occurred'}`);
    }
};



const handleDelete = async (userNameToDelete) => {
    // Display a confirmation dialog to the user
    // const isConfirmed = window.confirm(`Are you sure you want to delete the user ${userNameToDelete}?`);

    // Proceed only if the user confirmed the action
    // if (isConfirmed) {
        // console.log("The user to delete is:", userNameToDelete);

        try {
            await deleteUser({ userName: member.userName }).unwrap();
            toast.success("Family member deleted successfully");
        } catch (error) {
            toast.error(`Failed to delete family member: ${error.data?.message || 'An error occurred'}`);
        } finally {
            setShowConfirm(false); // Ensure the modal is closed after operation
         }
    
    //else {
    //     // User clicked 'Cancel', do not proceed with deletion
    //     console.log("User deletion cancelled")
};






    return (
        <Tab.Pane eventKey="third" className="fade show">
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="card-title">User Information</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-end">
                            <Button type="button" className="btn btn-primary me-2 edit-button" onClick={toggleEditMode}>Edit</Button>
                            <Button variant="danger" onClick={() => setShowConfirm(true)}>Delete</Button>
                            
                            <ConfirmModal
                                show={showConfirm}
                                onHide={() => setShowConfirm(false)}
                                onConfirm={handleDelete}
                                message={`Are you sure you want to delete ${member.userName}?`}
                            />
                        </div>
                        
                        
                            
                        <Row className="align-items-center">
                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-fname`} className="form-label">First Name:</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-control" 
                                id={`${member.id}-fname`}
                                name="firstName" // Make sure the name matches your state property names
                                value={editMember.firstName} 
                                onChange={handleInputChange} 
                                readOnly={!isEditMode} // Make fields editable only in edit mode
                                />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-lname`} className="form-label">Last Name:</Form.Label>
                            <Form.Control 
                            type="text" 
                            className="form-control" 
                            id={`${member.id}-lname`}
                            name="lastName"
                            value={editMember.lastName} 
                            onChange={handleInputChange} 
                            readOnly={!isEditMode}
                            />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-email`} className="form-label">Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                className="form-control" 
                                id={`${member.id}-email`}
                                name="email"
                                value={editMember.email} 
                                onChange={handleInputChange} 
                                readOnly={!isEditMode}
                            />
                            </Form.Group>


                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-userName`} className="form-label">User Name:</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-control" 
                                id={`${member.id}-userName`}
                                name="userName"
                                value={editMember.userName} 
                                onChange={handleInputChange} 
                                readOnly={!isEditMode}
                            />
                            </Form.Group>

                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-gender`} className="form-label">Gender:</Form.Label>
                            <Row>
                                <Col>
                                <Form.Check 
                                    type="radio" 
                                    label="Male" 
                                    name="gender" 
                                    id={`${member.id}-male`}
                                    value="male"
                                    checked={editMember.gender === "male"} 
                                    onChange={handleInputChange}
                                    disabled={!isEditMode}
                                />
                                </Col>
                                <Col>
                                <Form.Check 
                                    type="radio" 
                                    label="Female" 
                                    name="gender" 
                                    id={`${member.id}-female`}
                                    value="female"
                                    checked={editMember.gender === "female"} 
                                    onChange={handleInputChange}
                                    disabled={!isEditMode}
                                />
                                </Col>
                            </Row>
                            </Form.Group>

                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-dob`} className="form-label">Date Of Birth:</Form.Label>
                            <Form.Control 
                                type="date" 
                                className="form-control" 
                                id={`${member.id}-dob`}
                                name="dateOfBirth"
                                value={editMember.dateOfBirth ? editMember.dateOfBirth.split('T')[0] : ''} 
                                onChange={handleInputChange} 
                                readOnly={!isEditMode}
                            />
                            </Form.Group>

                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-role`} className="form-label">Role:</Form.Label>
                            <Form.Select 
                                id={`${member.id}-role`} 
                                name="role"
                                value={editMember.role} 
                                onChange={handleInputChange} 
                                disabled={!isEditMode}
                            >
                                <option value="parent">Parent</option>
                                <option value="child">Child</option>
                                <option value="adult">Adult</option>
                            </Form.Select>
                            </Form.Group>

                            <Form.Group className="form-group col-sm-6">
                            <Form.Label htmlFor={`${member.id}-active`} className="form-label">Active</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-control" 
                                id={`${member.id}-active`}
                                name="dateOfBirth"
                                value={editMember.active ? "Yes" : "No"} 
                                 
                                readOnly={true}
                            />
                            </Form.Group>
                                
                            </Row>
                            {isEditMode && (
                                <>
                                    <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                    <Button type="button" className="btn bg-soft-danger" onClick={toggleEditMode}>Cancel</Button>
                                </>
                            )}
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
                                              <Form.Control type="email" className="form-control" id="email" defaultValue="Bnijone@demo.com"/>
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