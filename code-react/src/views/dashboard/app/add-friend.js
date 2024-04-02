import React from 'react'
import {useState} from 'react';
import { Form } from 'react-bootstrap';
import {Row,Col, Container, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link} from 'react-router-dom'
import { useSendFriendRequestMutation } from '../../../store/slices/friendsApiSlice';
import { toast } from 'react-toastify';



const AddFriend = ({pendingRequest,refetchFriendRequests}) => {
  const [spaceName, setSpaceName] = useState('');
  const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation();

  const handleInputChange = (event) => {
    setSpaceName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendFriendRequest({ recipientspaceName: spaceName }).unwrap();
      toast.success('Friend request sent successfully!');
      setSpaceName(''); // Clear input field after successful request
      refetchFriendRequests();
    } catch (error) {
      toast.error(`Failed to send friend request: ${error.data?.message || error.message}`);
    }
  };
 
   return(
    <>
    <div id='content-page' className='content-page'>
      <Container>
        <Row>
          <Col sm="12">
            <Card>
              

            <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
                  <h4 className="card-title">Send Friendship Request</h4>
            </div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center justify-content-center">
                  <Col xs={12} md={7}>
                    <Form.Group controlId="formSpaceName">
                      {/* <Form.Label>Space Name</Form.Label> */}
                      <Form.Control
                        type="text"
                        placeholder="Enter SpaceName"
                        value={spaceName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4} className="d-flex justify-content-end">
                    <Button variant="success" className="w-100" type="submit" disabled={isLoading}>
                      {isLoading ? 'Sending...' : (
                        <>
                          <i className="ri-user-add-line me-1"></i>Add Friend
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>






            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Pending Requests</h4>
              </div>
            </Card.Header>
            <Card.Body>
            <ul className="request-list m-0 p-0">
              {pendingRequest.length > 0 ? (
                pendingRequest.map((request) => (
                  <Pending key={request._id} pendingRequest={request} />
                ))
              ) : (
                <p>No pending requests.</p>
              )}
              </ul>
            </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </>
   )
}

export default AddFriend


const Pending = ({ pendingRequest }) => {
  // Adjusted to use Bootstrap's Row and Col for layout
  return (
    <Col md={6}>
      <Card className="card-block card-stretch card-height">
        <Card.Body className="profile-page p-0">
          <div className="profile-header-image">
            <div className="profile-info p-4">
              <div className="user-detail">
                <div className="d-flex flex-wrap justify-content-between align-items-start">
                  <div className="profile-detail d-flex">
                    <div className="user-data-block">
                      <h4>
                        <Link to="#">{pendingRequest.recipientFamily.spaceName}</Link>
                      </h4>
                      {/* Display only family members with the role of parent */}
                      {pendingRequest.recipientFamily.familyMembers.filter(member => member.role === "parent").map((parent, index) => (
                        <h6 key={parent._id}>{parent.firstName} {parent.lastName}</h6>
                      ))}
                      <p>{pendingRequest.recipientFamily.friends?.length || 0} Friends</p>
                      {/* You might want to add actions like cancel pending request here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};