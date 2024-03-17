import React from 'react'
import {useState} from 'react';
import { Form } from 'react-bootstrap';
import {Row,Col, Container, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link} from 'react-router-dom'
// img

import user5 from '../../../assets/images/user/05.jpg'
import user15 from '../../../assets/images/user/15.jpg'

const AddFriend = () => {
    const [spaceName, setSpaceName] = useState('');

    const handleInputChange = (e) => {
        setSpaceName(e.target.value);
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
        <Form>
          <Row className="align-items-center justify-content-center">
            <Col xs={12} md={7}>
              <Form.Group controlId="formSpaceName">
                <Form.Control
                  type="text"
                  placeholder="Enter SpaceName"
                  value={spaceName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-end">
              <Button variant="success" className="w-100">
                <i className="ri-user-add-line me-1"></i>Add Friend
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
                  <Pending />
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


const Pending = () =>{
   return(
      <li className="d-flex align-items-center  justify-content-between flex-wrap">
         <div className="flex-grow-1 ms-3">
            <h6>ayman</h6>
            <p className="mb-0">40  friends</p>
         </div>
         
      </li>
   )
}