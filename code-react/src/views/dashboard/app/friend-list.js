import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link} from 'react-router-dom'

//profile-header
import ProfileHeader from '../../../components/profile-header'

import img3 from '../../../assets/images/page-img/profile-bg3.jpg'


// const friends = {
//     _id: "65f4bdb84e0c4032cc361d1e",
//     spaceName: "Gashlan2",
//     familyMembers: [
//         {
//             _id: "65f4d799699a32beef7bae54",
//             firstName: "saud1",
//             lastName: "Saud1",
//             userName: "Saud",
//             email: "saudalbrahim2@gmail.com",
//             gender: "male",
//             dateOfBirth: "2012-05-05T00:00:00.000Z",
//             active: true,
//             activationCode: "73691",
//             role: "parent",
//             createdAt: "2024-03-15T23:19:53.642Z",
//             updatedAt: "2024-03-15T23:20:14.181Z",
//             __v: 0,
//             family: "65f4d799699a32beef7bae56"
//         },
//         {
//             _id: "65f4d799699a32beef733bae54",
//             firstName: "saud2",
//             lastName: "Saud2",
//             userName: "Saud",
//             email: "saudalbrahim2@gmail.com",
//             gender: "male",
//             dateOfBirth: "2012-05-05T00:00:00.000Z",
//             active: true,
//             activationCode: "73691",
//             role: "child",
//             createdAt: "2024-03-15T23:19:53.642Z",
//             updatedAt: "2024-03-15T23:20:14.181Z",
//             __v: 0,
//             family: "65f4d799699a32beef7bae56"
//         },
//         {
//             _id: "65f4d799699a32beef733bae54",
//             firstName: "saud3",
//             lastName: "Saud3",
//             userName: "Saud",
//             email: "saudalbrahim2@gmail.com",
//             gender: "male",
//             dateOfBirth: "2012-05-05T00:00:00.000Z",
//             active: true,
//             activationCode: "73691",
//             role: "parent",
//             createdAt: "2024-03-15T23:19:53.642Z",
//             updatedAt: "2024-03-15T23:20:14.181Z",
//             __v: 0,
//             family: "65f4d799699a32beef7bae56"
//         },
        
//     ],
//     friends: [
//         "65a9328c79bd3261ba6ac4ac",
//         "65a9328c79bd3261ba6ac4ac"
//     ],
//     createdAt: "2024-03-15T21:29:28.639Z",
//     updatedAt: "2024-03-15T22:59:53.375Z",
//     __v: 2
// }

const FriendList =({friends}) =>{
    if (!friends) {
        return <div>Loading friends...</div>; // or any other loading state
      }
    return(
        <>
            <ProfileHeader title="Friend Lists" img={img3}/>
                <div id="content-page" className="content-page">
                    <Container>
                        <Row>
                            <Friend friends = {friends}/>
                            
                            
                        </Row>
                    </Container>
                </div>
        </>
  )

}


const Friend =({friends}) => {
    return(
        <>
        <Col md={6}>
            <Card className=" card-block card-stretch card-height">
                <Card.Body className=" profile-page p-0">
                    <div className="profile-header-image">
                        {/* <div className="cover-container">
                            <img loading="lazy" src={img1} alt="profile-bg" className="rounded img-fluid w-100"/>
                        </div> */}
                        <div className="profile-info p-4">
                            <div className="user-detail">
                                <div className="d-flex flex-wrap justify-content-between align-items-start">
                                    <div className="profile-detail d-flex">
                                        <div className="user-data-block">
                                            <h4>
                                                <Link to="/dashboard/app/friend-profile">{friends.spaceName}</Link>
                                            </h4>
                                            {/* Display only family members with the role of parent */}
                                            {friends?.familyMembers?.filter(member => member.role === "parent").map((parent, index) => (
                                                <h6 key={parent._id}>{parent.firstName} {parent.lastName}</h6>
                                                ))}
                                            <p>{friends.friends.length} Friends</p>
                                        </div>
                                    </div>
                                    {/* <button type="submit" className="btn btn-primary">Following</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
        </>
    )
}

export default FriendList;