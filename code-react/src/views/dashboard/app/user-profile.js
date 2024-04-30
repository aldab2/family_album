import React,{useEffect, useState} from 'react'
import {Row, Col, Container, Dropdown, Nav, Tab, OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap'
import Card from '../../../components/Card'
import BlankPage from '../extrapages/blankpage'
import { useSelector } from 'react-redux'
import Index from '..'
import PostsTimeline from './posts-timeline'
import FriendList from './friend-list.js'
import FriendRequest from './friend-request.js'
import AddFriend from './add-friend.js'
import { useGetFriendRequestsQuery } from '../../../store/slices/friendsApiSlice';
import { useGetFamilyFriendsQuery } from '../../../store/slices/friendsApiSlice';




const UserProfile =() =>{
   const [show, setShow] = useState(false);
   const { userInfo } = useSelector(state => state.authReducer) || {};
   const [birthDateFormatted,setBirthDateFormatted] = useState('')
   const [birthYear,setBirthYeay] = useState('')
   const [joinedDateFormatted,setJoinedDateFormatted] = useState('')


  // Options for formatting
const dateOptions = { day: '2-digit', month: 'long' };
const yearOptions = { year: 'numeric' };
const dateTimeOptions = { day: '2-digit', month: 'short', year: 'numeric' };



useEffect(() => {
   if (userInfo) {
      const dateObj = new Date(userInfo.dateOfBirth);
      const joinedDateObj = new Date(userInfo.createdAt)
      setBirthDateFormatted(dateObj.toLocaleDateString('en-US', dateOptions));
      setBirthYeay(dateObj.toLocaleDateString('en-US', yearOptions));
      setJoinedDateFormatted(`${joinedDateObj.toLocaleDateString('en-US', dateTimeOptions)} at ${joinedDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`);

      
   }
}, [userInfo])

const { data: familyFriends, isLoading: loadingFamilyFriends, error: familyFriendsError, refetch: refetchFamilyFriends} = useGetFamilyFriendsQuery(userInfo?._id);
//const { data: friends, isLoading: friendsLoading, error: friendsError } = useGetFriendRequestsQuery(userInfo?._id);
const { data: friendRequests, isLoading: loadingFriendRequests, error: friendRequestsError, refetch: refetchFriendRequests } = useGetFriendRequestsQuery(userInfo?._id);

// console.log("Family Friends data:", JSON.stringify(familyFriends, null, 2));

// console.log(friendRequests.received)

// console.log("Received Requests:", JSON.stringify(friendRequests, null, 2));
// Function to trigger refetch
const handleFriendRequestsRefetch = () => {
   refetchFriendRequests();
 };

 const handleFriendsRefetch = () =>{
   refetchFamilyFriends();
 }

  return(
      <>
    
         <Container className='pt-3'>
            <Row >
              
               <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Card className="p-0">
                     <Card.Body className="p-0">
                        <div className="user-tabing">
                           <Nav as="ul" variant="pills" className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                              <Nav.Item as="li" className=" col-12 col-sm-4 p-0 ">
                                 <Nav.Link  href="#pills-timeline-tab"  eventKey="first" role="button" className=" text-center p-3">Timeline</Nav.Link>
                              </Nav.Item>
                              <Nav.Item as="li" className="col-12 col-sm-4 p-0">
                                 <Nav.Link  href="#pills-about-tab" eventKey="second" role="button" className="text-center p-3">About</Nav.Link>
                              </Nav.Item>
                              <Nav.Item as="li" className=" col-12 col-sm-4 p-0">
                                 <Nav.Link  href="#pills-friends-tab"  eventKey="third" role="button" className="text-center p-3">Friends</Nav.Link>
                              </Nav.Item>
                           </Nav>
                        </div>
                     </Card.Body>
                  </Card>
                  <Col sm={12} >
                     <Tab.Content>
                        <Tab.Pane eventKey="first" >
                        <PostsTimeline id='profile' key={"posts-type-only-mine"} onlyMyPosts={true} ></PostsTimeline>
                        </Tab.Pane> 
                        <Tab.Pane eventKey="second">
                           <Tab.Container id="left-tabs-example" defaultActiveKey="about1">
                              <Row className='justify-content-center'>

                                 <Col md={12} className=" ps-4">
                                    <Card>
                                       <Card.Body>
                                          <Tab.Content >
                                             <Tab.Pane eventKey="about1">
                                                <h4>Personal Info</h4>
                                                <hr/>
                                                <Row className="mb-2">
                                                   <div className="col-3">
                                                      <h6>Name:</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{userInfo.firstName +" " + userInfo.lastName}</p>
                                                   </div>  
                                                </Row>
                                                <Row className="mb-2">
                                                   <div className="col-3">
                                                      <h6>Email:</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{userInfo.email}</p>
                                                   </div>
                                                </Row>
                                                <Row className="mb-2">
                                                   <div className="col-3">
                                                      <h6>Gender:</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{userInfo.gender}</p>
                                                   </div>
                                                </Row>
                                                <Row className="mb-2">
                                                   <div className="col-3">
                                                      <h6>Username</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{userInfo.userName}</p>
                                                   </div>
                                                </Row>
                                                <Row className="row mb-2">
                                                   <div className="col-3">
                                                      <h6>Role:</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{userInfo.role}</p>
                                                   </div>
                                                </Row>
                                                <Row className="mb-2">
                                                   <div className="col-3">
                                                      <h6>Birth Date:</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{birthDateFormatted}</p>
                                                   </div>
                                                </Row>
                                                <Row className="mb-2">
                                                   <div className="col-3">
                                                      <h6>Birth Year:</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{birthYear}</p>
                                                   </div>
                                                </Row>
                                                <Row className="mb-2">
                                                   <div className="col-3">
                                                      <h6>Joined:</h6>
                                                   </div>
                                                   <div className="col-9">
                                                      <p className="mb-0">{joinedDateFormatted}</p>
                                                   </div>
                                                </Row>
                                                
                                             </Tab.Pane>
                                          
                                          </Tab.Content>
                                       </Card.Body>
                                    </Card>
                                 </Col>
                              </Row>
                           </Tab.Container>
                        </Tab.Pane> 
                        <Tab.Pane eventKey="third" >
                           <Tab.Container id="left-tabs-example" defaultActiveKey="all-friends">
                              <Card>
                                 <Card.Body>
                                    <h2>Friends</h2>
                                    <div className="friend-list-tab mt-2">
                                       <Nav variant="pills" className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                                          <Nav.Item>
                                             <Nav.Link  href="#pill-all-friends" eventKey="all-friends" onClick={() => refetchFamilyFriends()}>All Friends</Nav.Link>
                                       
                                          </Nav.Item>
                                          <Nav.Item>
                                             <Nav.Link href="#pill-recently-add" eventKey="Received-Requests" onClick={() => refetchFriendRequests()}>Received Requests</Nav.Link>
                                          </Nav.Item>
                                          <Nav.Item>
                                             <Nav.Link href="#pill-closefriends" eventKey="Add-Friend" onClick={() => refetchFriendRequests()}>Add Friend</Nav.Link>
                                          </Nav.Item>
                                    
                                       </Nav>
                                       <Tab.Content>
                                       <Tab.Pane eventKey="all-friends" className="fade show">
                                       <Tab.Pane eventKey="all-friends" className="fade show">
                                          {loadingFamilyFriends && <div>Loading family friends...</div>}
                                          {familyFriendsError && <div>Error loading family friends: {familyFriendsError.message}</div>}
                                          {!loadingFamilyFriends && !familyFriendsError && familyFriends && (
                                             <FriendList familyFriends={familyFriends}  refetchFriends={handleFriendsRefetch}/> // Pass familyFriends as friends prop
                                          )}
                                       </Tab.Pane>

                                       </Tab.Pane>
                                       <Tab.Pane eventKey="Received-Requests" className="fade show">
                                       {friendRequests ? (
                                          <FriendRequest receivedRequests={friendRequests.received}/>
                                       ) : (
                                          <div>Loading friend requests...</div>
                                       )}
                                       </Tab.Pane>
                                       <Tab.Pane eventKey="Add-Friend" className="fade show">
                                          {loadingFriendRequests ? (
                                             <div>Loading...</div>
                                          ) : (
                                             <AddFriend pendingRequest={friendRequests?.sent || []} refetchFriendRequests={handleFriendRequestsRefetch} />
                                          )}
                                       </Tab.Pane>
                                          
                                                               
                                       </Tab.Content>
                                    </div>
                                 </Card.Body>
                              </Card>
                           </Tab.Container>
                        </Tab.Pane> 

                        
                     </Tab.Content>
                  </Col>
               </Tab.Container>
            </Row>
         </Container>   
      </>
  )

}

export default UserProfile;