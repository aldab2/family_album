import React from 'react';
import { Row, Col, Card, Tab, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';

export function FamilyMember({ member, updateUser, deleteUser, family, onSetFamily , viewOnly}) {
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
            onSetFamily((family) => ({
                ...family,
                familyMembers: family.familyMembers.filter((member) => member.userName !== userNameToDelete)
              }));

        } catch (error) {
            console.log(error)
            toast.error(`Failed to delete family member: ${error.data?.message || 'An error occurred'}`);
        } finally {
            
            setShowConfirm(false); // Ensure the modal is closed after operation
        }

        //else {
        //     // User clicked 'Cancel', do not proceed with deletion
        //     console.log("User deletion cancelled")
    };

    return (
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="card-title">User Information</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {!viewOnly && <div className="d-flex justify-content-end">
                            <Button type="button" className="btn btn-primary me-2 edit-button" onClick={toggleEditMode}>Edit</Button>
                            <Button variant="danger" onClick={() => setShowConfirm(true)}>Delete</Button>

                            <ConfirmModal
                                show={showConfirm}
                                onHide={() => setShowConfirm(false)}
                                onConfirm={handleDelete}
                                message={`Are you sure you want to delete ${member.userName}?`} />
                        </div>}



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
                                    readOnly={!isEditMode} />
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
                                    readOnly={!isEditMode} />
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
                                    readOnly={!isEditMode} />
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
                                            disabled={!isEditMode} />
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
                                            disabled={!isEditMode} />
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
                                    readOnly={!isEditMode} />
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

                                    readOnly={true} />
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
    );
}
