import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Dropdown, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import CustomToggle from '../../components/dropdowns'
import ShareOffcanvas from '../../components/share-offcanvas'

//image
import img1 from '../../assets/images/small/07.png'


import p3 from '../../assets/images/page-img/p3.jpg'
import p4 from '../../assets/images/page-img/p4.jpg'


import icon2 from '../../assets/images/icon/02.png'

import loader from '../../assets/images/page-img/page-load-loader.gif'
import { useGetPostsQuery, useLazyGetPostsQuery } from '../../store/slices/postsApiSlice'
import { useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'



const Index = () => {
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const { data, isLoading, isFetching, error } = useGetPostsQuery({ page });
    const [hasMorePosts, setHasMorePosts] = useState(true);



   
    useEffect(() => {
        if (data) {
            if (data.length === 0) {
                setHasMorePosts(false);
            } else {
                setPosts(prevPosts => [...prevPosts, ...data]);
            }
        }
    }, [data]);

    function timeAgo(datetime) {
        const dateTime = new Date(datetime);
        const now = new Date();
        const diffInSeconds = Math.floor((now - dateTime) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} mins ago`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        } else {
            // Format the date as 'YYYY-MM-DD' for more than a day
            return dateTime.toISOString().split('T')[0];
        }
    }

    function getMediaType(meiaName) {
        // List of image file extensions
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
        // List of video file extensions
        const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];

        // Extract the extension from the URL
        const extension = meiaName.split('.').pop().toLowerCase();

        if (imageExtensions.includes(extension)) {
            return 'image';
        } else if (videoExtensions.includes(extension)) {
            return 'video';
        } else {
            return 'unknown';
        }
    }

    // const fetchData = async () => {
       

    //     const morePosts = await getPosts({page:page+1})
    //     setPage(page+1)
    //     setPosts([...morePosts])
      
    
    //   };

    const fetchData = async () => {
        if (!isFetching && !error && hasMorePosts) {
            // Introduce an artificial delay
            await new Promise(r => setTimeout(r, 5000));
    
            setPage(prevPage => prevPage + 1);
        }
    };
   

    return (
        <>
            <div id="content-page" className="content-page">

                <Container>
                    <Row>
                        <Col lg={12} className="row m-0 p-0">
                            <Col sm={12} >
                                <Card id="post-modal-data" className="card-block card-stretch card-height">
                                    <div className="card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Create Post</h4>
                                        </div>
                                    </div>
                                    <Card.Body >
                                        <div className="d-flex align-items-center">
                                            {/* <div className="user-img">
                                            <img src={user1} alt="user1" className="avatar-60 rounded-circle"/>
                                        </div> */}
                                            <form className="post-text ms-3 w-100 " onClick={handleShow}>
                                                <input type="text" className="form-control rounded" placeholder="Write something here..." style={{ border: "none" }} />
                                            </form>
                                        </div>
                                        <hr></hr>
                                        <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
                                            <li className="me-3 mb-md-0 mb-2">
                                                <Link to="#" className="btn btn-soft-primary">
                                                    <img src={img1} alt="icon" className="img-fluid me-2" /> Photo/Video
                                                </Link>
                                            </li>



                                        </ul>
                                    </Card.Body>
                                    <Modal size="lg" className="fade" id="post-modal" onHide={handleClose} show={show} >
                                        <Modal.Header className="d-flex justify-content-between">
                                            <Modal.Title id="post-modalLabel">Create Post</Modal.Title>
                                            <Link to="#" className="lh-1" onClick={handleClose} >
                                                <span className="material-symbols-outlined">close</span>
                                            </Link>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="d-flex align-items-center">
                                                {/* <div className="user-img">
                                                <img src={user1} alt="user1" className="avatar-60 rounded-circle img-fluid"/>
                                            </div> */}
                                                <form className="post-text ms-3 w-100 " data-bs-toggle="modal" data-bs-target="#post-modal">
                                                    <input type="text" className="form-control rounded" placeholder="Write something here..." style={{ border: "none" }} />
                                                </form>
                                            </div>
                                            <hr />
                                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                                <li className="col-md-6 mb-3">
                                                    <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                        <img src={img1} alt="icon" className="img-fluid" /> Photo/Video</div>
                                                </li>
                                                {/* <li className="col-md-6 mb-3">
                                                <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                <img src={img2} alt="icon" className="img-fluid"/> Tag Friend</div>
                                            </li> */}
                                            </ul>
                                            <hr />
                                            <div className="other-option">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="align-items-center">
                                                        {/* <div className="user-img me-3">
                                                    <img src={user1} alt="user1" className="avatar-60 rounded-circle img-fluid"/>
                                                </div> */}
                                                        <div>
                                                            <h4>Share Post with:</h4>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0 text-primary">This Controls who can see your Post</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-post-toolbar">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={CustomToggle} role="button">
                                                                <span className="btn btn-primary">Friend</span>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className=" m-0 p-0">
                                                                <Dropdown.Item className=" p-3" to="#">
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-user-unfollow-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Family Members</h6>
                                                                            <p className="mb-0">Only Family Member can see this Post</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className="p-3" to="#">
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-close-circle-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Family Friends</h6>
                                                                            <p className="mb-0">Only Family Friend can see This Post</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className=" p-3" to="#">
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-save-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Public</h6>
                                                                            <p className="mb-0">Anyone can see this Post</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>

                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary d-block w-100 mt-3">Post</button>
                                        </Modal.Body>
                                    </Modal>
                                </Card>
                            </Col>

                            <div>
                            <InfiniteScroll
              dataLength={posts.length} //This is important field to render the next data
              next={fetchData}
              hasMore={hasMorePosts}
              loader={ <div className="col-sm-12 text-center">
              <img src={loader} alt="loader" style={{ height: "100px" }} />
          </div>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }>
                                {posts.map((post, index) => {
                                    return <Col key={index} sm={12}>
                                        <Card className=" card-block card-stretch card-height">
                                            <Card.Body>
                                                <div className="user-post-data">
                                                    <div className="d-flex justify-content-between">
                                                        {/* <div className="me-3">
                                <img className="rounded-circle img-fluid" src={user01} alt=""/>
                            </div> */}
                                                        <div className="w-100">
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    <h5 className="mb-0 d-inline-block">{post.author}</h5>
                                                                    {/* <span className="mb-0 ps-1 d-inline-block">Add New Post</span> */}
                                                                    <p className="mb-0 text-primary">{timeAgo(post.createdAt)}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p>{post.content}</p>
                                                </div>
                                                <div className="user-post">

                                                    {getMediaType(post.media[0]) == 'image' && <Link to="#"><img src={post.mediaUrls[0]} alt="post1" className="img-fluid rounded w-100" /></Link>}

                                                    {getMediaType(post.media[0]) == 'video' && <div className="ratio ratio-16x9">
                                                        {/* <iframe title="vedio" src={post.mediaUrls[0]} ></iframe> */}
                                                        <video controls>
                                                            <source src={post.mediaUrls[0]} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>}




                                                </div>
                                                <div className="comment-area mt-3">
                                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                        <div className="like-block position-relative d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                {/* <div className="like-data">
                                            <Dropdown>
                                                <Dropdown.Toggle  as={CustomToggle} >
                                                    <img src={icon2} className="img-fluid" alt=""/>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className=" py-2">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt=""/></OverlayTrigger>                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2" ><img src={icon3} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2" ><img src={icon4} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2" ><img src={icon5} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2" ><img src={icon6} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2" ><img src={icon7} className="img-fluid me-2" alt=""/></OverlayTrigger> 
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            
                                        </div> */}




                                                                {/* implement the Like starategy here  */}
                                                                {/* <div className="like-data">
                                                                    <Dropdown.Toggle as={CustomToggle} >
                                                                        <img src={icon2} className="img-fluid" alt="" />
                                                                    </Dropdown.Toggle>
                                                                </div>
                                                                <div className="total-like-block ms-2 me-3">
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle as={CustomToggle} id="post-option" >
                                                                            {post.numOfLikes} Likes   {post.numOfComments} Comments
                                                                        </Dropdown.Toggle>

                                                                    </Dropdown>
                                                                </div> */}
                                                            </div>

                                                        </div>
                                                        {/* <ShareOffcanvas /> */}
                                                    </div>
                                                    <hr />

                                                    {/* comments  */}
                                                    <ul className="post-comments list-inline p-0 m-0">
                                                        {post.comments.map((comment, index) => {
                                                            return <li key={index} className="mb-2">
                                                                <div className="d-flex">
                                                                    {/* <div className="user-img">
                                        <img src={comment.userImage} alt="user" className="avatar-35 rounded-circle img-fluid"/>
                                    </div> */}
                                                                    <div className="comment-data-block ms-3">
                                                                        <h5>{comment.author}</h5>
                                                                        <p className="mb-0">{comment.content}</p>
                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                           
                                                                            <span>{timeAgo(comment.createdAt)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        })}
                                                      
                                                    </ul>
                                                    <form className="comment-text d-flex align-items-center mt-3" >
                                                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                                                        <Button variant="primary" className="m-3" type="submit">Post</Button>{' '}
                                                        {/* <div className="comment-attagement d-flex">
                                <Link to="#"><i className="ri-link me-3"></i></Link>
                                <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
                                <Link to="#"><i className="ri-camera-line me-3"></i></Link>
                            </div>*/}
                                                    </form>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                })}
                                </InfiniteScroll>
                            </div>

                        </Col>

                       
                    </Row>
                </Container>
            </div>
        </>
    )
}


export default Index
