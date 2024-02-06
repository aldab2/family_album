import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmModal = ({ show, onHide, onConfirm, userNameToDelete }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Are you sure you want to delete the user ${userNameToDelete}?`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;