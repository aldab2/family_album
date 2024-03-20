import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link} from 'react-router-dom'
import { useDeleteFriendRequestMutation } from '../../../store/slices/friendsApiSlice';
import { toast } from 'react-toastify';

//profile-header
import ProfileHeader from '../../../components/profile-header'

import img3 from '../../../assets/images/page-img/profile-bg3.jpg'



const FriendList = ({ familyFriends }) => {
    if (!familyFriends) return <div>Loading friends...</div>;
    
    return (
        <>
            <ProfileHeader title="Friend Lists" img={img3}/>
            <div id="content-page" className="content-page">
                <Container>
                    <Row>
                        {familyFriends.map(friend => (
                            <Friend key={friend._id} friend={friend} />
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};

const Friend = ({ friend  }) => {
    // console.log(familyFriends)
    const [deleteFriendRequest, { isLoading: isDeleting }] = useDeleteFriendRequestMutation();

    const handleRemoveFriend = async () => {
        try {
            // Assuming the API needs the friend's ID to remove them
            await deleteFriendRequest({ toRemoveId: friend._id }).unwrap();
            toast.error('Friend removed successfully.');
        } catch (err) {
            console.error('Failed to remove friend:', err);
            toast.error('Failed to remove friend.');
        }
    };
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
                                                <Link to="#">{friend?.spaceName}</Link>
                                            </h4>
                                            {/* Display only family members with the role of parent */}
                                            {friend?.familyMembers?.filter(member => member.role === "parent").map((parent, index) => (
                                                <h6 key={parent._id}>{parent.firstName} {parent.lastName}</h6>
                                            ))}
                                            <p>{friend?.friends?.length ?? 0} Friends</p>
                                            {/* Button to remove friend */}
                                            <button className="btn btn-danger" onClick={handleRemoveFriend} disabled={isDeleting}>
                                                {isDeleting ? 'Removing...' : 'Remove Friend'}
                                            </button>
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


export default FriendList;