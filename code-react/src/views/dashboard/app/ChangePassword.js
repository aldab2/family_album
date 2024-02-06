import React from 'react';
import { Card, Tab, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useChangePasswordMutation } from '../../../store/slices/profileApiSlice';

export function ChangePassword() {
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
    return (
        
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div className="iq-header-title">
                        <h4 className="card-title">Change Password</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="cpass" className="form-label">Current Password:</Form.Label>
                            {/* <Link to="#" className="float-end">Forgot Password</Link> */}
                            <Form.Control type="Password" className="form-control" id="cpass" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="npass" className="form-label">New Password:</Form.Label>
                            <Form.Control type="Password" className="form-control" id="npass" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="vpass" className="form-label">Verify Password:</Form.Label>
                            <Form.Control type="Password" className="form-control" id="vpass" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                        <Button type="reset" className="btn bg-soft-danger" onClick={() => { setCurrentPassword(''); setNewPassword(''); setVerifyPassword(''); }}>Reset</Button>
                    </Form>
                </Card.Body>
            </Card>
        
    );
}
