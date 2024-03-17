import React from 'react'
import {Row,Col, Container} from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link} from 'react-router-dom'
// img

import user5 from '../../../assets/images/user/05.jpg'



const receivedRequests= [
      {
          _id: "65f4c7dd4e0c4032cc361d73",
          senderFamily: "65f4bdb84e0c4032cc361d1e",
          recipientFamily: "65a9328c79bd3261ba6ac4ac",
          status: "pending",
          createdAt: "2024-03-15T22:12:45.484Z",
          updatedAt: "2024-03-15T22:12:45.484Z",
          __v: 0
      },
      {
         _id: "65f4c7dd4e0cdfg4032cc361d73",
         senderFamily: "65f4bdbggg84e0c4032cc361d1e",
         recipientFamily: "65a9328c79bdgg3261ba6ac4ac",
         status: "pending",
         createdAt: "2024-03-15T22:12:45.484Z",
         updatedAt: "2024-03-15T22:12:45.484Z",
         __v: 0
     },
     {
      _id: "65f4c7dd4e0cffdfg4032cc361d73",
      senderFamily: "65f4bdbffggg84e0c4032cc361d1e",
      recipientFamily: "65a9328ffc79bdgg3261ba6ac4ac",
      status: "accepted",
      createdAt: "2024-03-15T22:12:45.484Z",
      updatedAt: "2024-03-15T22:12:45.484Z",
      __v: 0
      },

  ]




const FriendReqest = () => {

 
   return(
      <>
         <div id='content-page' className='content-page'>           
         <Container>
            <Row>
               <Col sm="12">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Friend Request</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <ul className="request-list list-inline m-0 p-0">
                           {receivedRequests
                           .filter(request => request.status === "pending")
                           .map(request => (
                              // Pass each request object to the Request component
                              <Request key={request._id} request={request} />
                           ))
                           }
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

export default FriendReqest


const Request = ({request}) =>{
   return(
      <li className="d-flex align-items-center  justify-content-between flex-wrap">
         
         <div className="flex-grow-1 ms-3">
            <h6>{request.senderFamily}</h6>
            <p className="mb-0">40  friends</p>
         </div>
         <div className="d-flex align-items-center mt-2 mt-md-0">
            <div className="confirm-click-btn">
               <Link to="#" className="me-3 btn btn-primary rounded confirm-btn">Confirm</Link>
               <Link to="#" className="me-3 btn btn-primary rounded request-btn" style={{display: "none"}}>View All</Link>
            </div>
            <Link to="#"  className="btn btn-secondary rounded" data-extra-toggle="delete" data-closest-elem=".item">Delete Request</Link>                                    
         </div>
      </li>
   )
}