import React from 'react'
import {Row,Col, Container} from 'react-bootstrap'
import Card from '../../../components/Card'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import {
   useAcceptFriendRequestMutation,
   useRejectFriendRequestMutation,
 } from '../../../store/slices/friendsApiSlice';



const FriendRequest = ({receivedRequests}) => {
console.log(receivedRequests)

   return (
      <>
         <div id="content-page" className="content-page">           
            <Container>
               <Row>
                  <Col sm="12">
                     <Card>
                        <Card.Header className="d-flex justify-content-between">
                           <div className="header-title">
                              <h4 className="card-title">Friend Requests</h4>
                           </div>
                        </Card.Header>
                        <Card.Body>
                           <ul className="request-list list-inline m-0 p-0">
                              {receivedRequests.map(request => (
                                 // Pass the entire request object
                                 <Request key={request._id} request={request} />
                              ))}
                           </ul>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default FriendRequest


const Request = ({ request }) => {
   // Safely extract senderFamily, considering it might be undefined
   const { senderFamily } = request;
   const [acceptFriendRequest, { isLoading: isAccepting }] = useAcceptFriendRequestMutation();
   const [rejectFriendRequest, { isLoading: isRejecting }] = useRejectFriendRequestMutation();
 
   const handleAccept = async () => {
      try {
        await acceptFriendRequest({ id: request._id }).unwrap();
        toast.success('Friend request accepted successfully.');
      } catch (err) {
        console.error('Failed to accept friend request:', err);
        toast.error('Failed to accept friend request.');
      }
    };
 
   const handleReject = async () => {
      
      try {
         await rejectFriendRequest({ id: request._id }).unwrap();
         toast.success('Friend request rejected successfully.');
       } catch (error) {
         console.error('Failed to reject friend request:', error);
         toast.error(`Failed to reject friend request: ${error.data.message || error.message}`);
       }
     
   };

   
   // Check for senderFamily existence and structure before attempting to render
   if (!senderFamily || !senderFamily.familyMembers) {
       return <div>Loading...</div>; // or some error placeholder
   }

   return (
      <li className="d-flex align-items-center justify-content-between flex-wrap">
        <div className="flex-grow-1 ms-3">
          <Link to="#">{request.senderFamily.spaceName}</Link>
          {/* <h4>{request.senderFamily.spaceName}</h4> */}
          {request.senderFamily.familyMembers
            .filter((member) => member.role === "parent")
            .map((parent) => (
              <p key={parent._id}>{parent.firstName} {parent.lastName}</p>
            ))}
          <p className="mb-0">{request.senderFamily.friends.length} Friends</p>
        </div>
        <div className="d-flex align-items-center mt-2 mt-md-0">
          <button className="me-3 btn btn-primary rounded" onClick={handleAccept} disabled={isAccepting}>
            {isAccepting ? 'Processing...' : 'Confirm'}
          </button>
          <button className="btn btn-secondary rounded" onClick={handleReject} disabled={isRejecting}>
            {isRejecting ? 'Processing...' : 'Reject'}
          </button>
        </div>
      </li>
    );
  };