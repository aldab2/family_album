import React from 'react';
import { Row, Card, Tab, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function UserInfo({ userInput, onUserInput, userInfo, updateUser, refetch }) {
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
                                <Form.Label htmlFor="fname" className="form-label">First Name:</Form.Label>
                                <Form.Control type="text" className="form-control" id="fname" readOnly={!isEditMode} value={userInput.firstName || ""} onChange={(e) => onUserInput({ ...userInput, firstName: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                                <Form.Label htmlFor="lname" className="form-label">Last Name:</Form.Label>
                                <Form.Control type="text" className="form-control" id="lname" readOnly={!isEditMode} value={userInput.lastName || ""} onChange={(e) => onUserInput({ ...userInput, lastName: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                                <Form.Label htmlFor="uname" className="form-label">User Name:</Form.Label>
                                <Form.Control type="text" className="form-control" id="uname" readOnly={!isEditMode} value={userInput.userName || ""} onChange={(e) => onUserInput({ ...userInput, userName: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                                <Form.Label htmlFor="cname" className="form-label">Email:</Form.Label>
                                <Form.Control type="text" className="form-control" id="cname" readOnly={!isEditMode} value={userInput.email || ""} onChange={(e) => onUserInput({ ...userInput, email: e.target.value })} />
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
                                        onChange={(e) => onUserInput({ ...userInput, gender: e.target.value })}
                                        disabled={!isEditMode} />
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
                                        onChange={(e) => onUserInput({ ...userInput, gender: e.target.value })}
                                        disabled={!isEditMode} />
                                    <Form.Check.Label className="form-check-label" htmlFor="genderFemale">Female</Form.Check.Label>
                                </Form.Check>
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                                <Form.Label htmlFor="dob" className="form-label">Date Of Birth:</Form.Label>
                                <Form.Control className="form-control" id="dob" type="date" readOnly={!isEditMode} value={userInput.dateOfBirth ? userInput.dateOfBirth.split('T')[0] : ''} onChange={(e) => onUserInput({ ...userInput, dateOfBirth: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                                <Form.Label htmlFor="role" className="form-label">Role:</Form.Label>
                                <Form.Select
                                    id="role"
                                    value={userInput.role || ""}
                                    onChange={(e) => onUserInput({ ...userInput, role: e.target.value })}
                                    disabled={!isEditMode}
                                >
                                    <option value="parent">parent</option>
                                    <option value="adult">adult</option>
                                    <option value="child">child</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                                <Form.Label htmlFor="family" className="form-label">Family:</Form.Label>
                                <Form.Control className="form-control" id="family" readOnly={!isEditMode} value={userInput.family || ""} onChange={(e) => onUserInput({ ...userInput, family: e.target.value })} />
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
    );
}
