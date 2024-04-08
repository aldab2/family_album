import React from 'react';
import { Row, Card, Tab, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function FamilyInfo({ family, onSetFamily, editFamilyProfile, addFamilyMember, viewOnly }) {

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
        console.log("to add", newMember);
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
            onSetFamily((family) => ({
                ...family,
                familyMembers: [...family.familyMembers, newMember]
              }));

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
                                    className="form-control mt-2" />
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

                       {!viewOnly && <div className="d-flex justify-content-end">
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
                        </div>}
                        {showAddMemberForm && (
                            <Card className="mt-3">
                                <Card.Header>Add New Family Member</Card.Header>
                                <Card.Body>
                                    <Card>
                                        <Row className="align-items-center">
                                            {/* First Name */}
                                            <Form.Group className="form-group col-sm-6">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={newMember.firstName}
                                                    onChange={handleAddMemberChange} />
                                            </Form.Group>

                                            {/* Last Name */}
                                            <Form.Group className="form-group col-sm-6">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={newMember.lastName}
                                                    onChange={handleAddMemberChange} />
                                            </Form.Group>

                                            {/* Username */}
                                            <Form.Group className="form-group col-sm-6">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="userName"
                                                    value={newMember.userName}
                                                    onChange={handleAddMemberChange} />
                                            </Form.Group>

                                            {/* Email */}
                                            <Form.Group className="form-group col-sm-6">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={newMember.email}
                                                    onChange={handleAddMemberChange} />
                                            </Form.Group>

                                            {/* Password */}
                                            <Form.Group className="form-group col-sm-6">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={newMember.password}
                                                    onChange={handleAddMemberChange} />
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
                                                    onChange={handleAddMemberChange} />
                                            </Form.Group>
                                        </Row>

                                        <div className="d-flex justify-content-end mt-2">
                                            <Button  type="submit" variant="primary" className="me-2" onClick={handleAddMemberSubmit}>Add Member</Button>
                                            <Button variant="secondary" onClick={handleAddMemberHide}>Cancel</Button>
                                        </div>
                                    </Card>
                                </Card.Body>
                            </Card>
                        )}

                    </Form>
                </Card.Body>
            </Card>
        
    );
}
