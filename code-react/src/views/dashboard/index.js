import React, {useState}  from 'react'
import { Row, Col, Container, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap'
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



const Index = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const Posts = [
        {
            ID: 1,
            Type: "Photo",
            Name: "Anna Sthesia",
            Time: "Just Now",
            Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
            Likes: 140,
            Comments: 20,
            FileName:p4
    
        },
        {
            ID: 2,
            Type: "Photo",
            Name: "Barb Ackue",
            Time: "Just Now",
            Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
            Likes: 2,
            Comments: 5,
            FileName:p3
    
        },
        {
            ID: 3,
            Type: Text,
            Name: "Ira Membrit",
            Time: "6 hour ago",
            Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
            Likes: 12,
            Comments: 25,
    
        },
        {
            ID: 4,
            Type: "Video",
            Name: "Paige Turner",
            Time: "1 day ago",
            Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus",
            Likes: 12,
            Comments: 25,
            Link:"https://www.youtube.com/embed/j_GsIanLxZk?rel=0"
    
        }


    ]

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
                                        <form className="post-text ms-3 w-100 "   onClick={handleShow}>
                                            <input type="text" className="form-control rounded" placeholder="Write something here..." style={{border:"none"}}/>
                                        </form>
                                    </div>
                                    <hr></hr>
                                    <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
                                        <li className="me-3 mb-md-0 mb-2">
                                            <Link to="#" className="btn btn-soft-primary">
                                                <img src={img1} alt="icon" className="img-fluid me-2"/> Photo/Video
                                            </Link>
                                        </li>

                                    </ul>   
                                </Card.Body>
                                <Modal size="lg" className="fade" id="post-modal" onHide={handleClose} show={show} >
                                    <Modal.Header  className="d-flex justify-content-between">
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
                                            <form className="post-text ms-3 w-100 "  data-bs-toggle="modal" data-bs-target="#post-modal">
                                            <input type="text" className="form-control rounded" placeholder="Write something here..." style={{border:"none"}}/>
                                        </form>
                                        </div>
                                        <hr/>
                                        <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                            <li className="col-md-6 mb-3">
                                                <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                <img src={img1} alt="icon" className="img-fluid"/> Photo/Video</div>
                                            </li>
                                            {/* <li className="col-md-6 mb-3">
                                                <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                <img src={img2} alt="icon" className="img-fluid"/> Tag Friend</div>
                                            </li> */}
                                        </ul>
                                        <hr/>
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

                            {Posts.map( (post) => post.Type === "Photo" ? <PhotoPost key={post.ID} post={post} /> : post.Type === "Text" ? <TextPost key={post.ID} post={post} /> : <VideoPost key={post.ID} post={post} /> )}
                        </div>                       
                        
                    </Col>
                    
                    <div className="col-sm-12 text-center">
                        <img src={loader} alt="loader" style={{height: "100px"}}/>
                    </div>
                </Row>
            </Container>                
            </div>
        </>
    )
}

function PhotoPost({post}){

    return(
        <Col sm={12}>
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
                                        <h5 className="mb-0 d-inline-block">{post.Name}</h5>
                                        {/* <span className="mb-0 ps-1 d-inline-block">Add New Post</span> */}
                                        <p className="mb-0 text-primary">{post.Time}</p>
                                    </div>
                                    
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>{post.Text}</p>
                        </div>
                        <div className="user-post">
                        
                            <Link to="#"><img src={post.FileName} alt="post1" className="img-fluid rounded w-100"/></Link>

                            
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
                                        <div className="like-data">
                                                <Dropdown.Toggle  as={CustomToggle} >
                                                    <img src={icon2} className="img-fluid" alt=""/>
                                                </Dropdown.Toggle>
                                        </div>
                                        <div className="total-like-block ms-2 me-3">
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                                                {post.Likes} Likes   {post.Comments} Comment
                                                </Dropdown.Toggle>
                                            
                                            </Dropdown>
                                        </div>
                                    </div>
                                
                                </div>
                                <ShareOffcanvas />
                            </div>
                        <hr/>

                        {/* comments  */}
                        <ul className="post-comments list-inline p-0 m-0">
                            <li className="mb-2">
                                <div className="d-flex">
                                    {/* <div className="user-img">
                                        <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                                    </div> */}
                                    <div className="comment-data-block ms-3">
                                        <h5>Monty Carlo</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                            <Link to="#">like</Link>
                                            <Link to="#">reply</Link>
                                            <span> 5 min </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex">
                                    {/* <div className="user-img">
                                        <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                                    </div> */}
                                    <div className="comment-data-block ms-3">
                                        <h5>Paul Molive</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                            <Link to="#">like</Link>
                                            <Link to="#">reply</Link>
                                            <span> 5 min </span>
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <form className="comment-text d-flex align-items-center mt-3" >
                            <input type="text" className="form-control rounded" placeholder="Enter Your Comment"/>
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
    )
}


function TextPost({post}){

    return(
        <Col sm={12}>
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
                                        <h5 className="mb-0 d-inline-block">{post.Name}</h5>
                                        {/* <span className="mb-0 ps-1 d-inline-block">Add New Post</span> */}
                                        <p className="mb-0 text-primary">{post.Time}</p>
                                    </div>
                                    
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>{post.Text}</p>
                        </div>
                        <div className="comment-area mt-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="like-block position-relative d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                  
                                        {/* implement the Like starategy here  */}
                                        <div className="like-data">
                                                <Dropdown.Toggle  as={CustomToggle} >
                                                    <img src={icon2} className="img-fluid" alt=""/>
                                                </Dropdown.Toggle>
                                        </div>
                                        <div className="total-like-block ms-2 me-3">
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                                                {post.Likes} Likes   {post.Comments} Comment
                                                </Dropdown.Toggle>
                                            
                                            </Dropdown>
                                        </div>
                                    </div>
                                
                                </div>
                                <ShareOffcanvas />
                            </div>
                        <hr/>

                        {/* comments  */}
                        <ul className="post-comments list-inline p-0 m-0">
                            <li className="mb-2">
                                <div className="d-flex">
                                    {/* <div className="user-img">
                                        <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                                    </div> */}
                                    <div className="comment-data-block ms-3">
                                        <h5>Monty Carlo</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                            <Link to="#">like</Link>
                                            <Link to="#">reply</Link>
                                            <span> 5 min </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex">
                                    {/* <div className="user-img">
                                        <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                                    </div> */}
                                    <div className="comment-data-block ms-3">
                                        <h5>Paul Molive</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                            <Link to="#">like</Link>
                                            <Link to="#">reply</Link>
                                            <span> 5 min </span>
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <form className="comment-text d-flex align-items-center mt-3" >
                            <input type="text" className="form-control rounded" placeholder="Enter Your Comment"/>
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
    )
}



function VideoPost ({post}){
    return(
        <Col sm={12}>
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
                                        <h5 className="mb-0 d-inline-block">{post.Name}</h5>
                                        {/* <span className="mb-0 ps-1 d-inline-block">Add New Post</span> */}
                                        <p className="mb-0 text-primary">{post.Time}</p>
                                    </div>
                                    
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>{post.Text}</p>
                        </div>
                        <div className="user-post">
                            <div className="ratio ratio-16x9">
                                <iframe title="vedio" src={post.Link} ></iframe>
                            </div>
                        </div>
                        <div className="comment-area mt-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="like-block position-relative d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                  
                                        {/* implement the Like starategy here  */}
                                        <div className="like-data">
                                                <Dropdown.Toggle  as={CustomToggle} >
                                                    <img src={icon2} className="img-fluid" alt=""/>
                                                </Dropdown.Toggle>
                                        </div>
                                        <div className="total-like-block ms-2 me-3">
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                                                {post.Likes} Likes   {post.Comments} Comment
                                                </Dropdown.Toggle>
                                            
                                            </Dropdown>
                                        </div>
                                    </div>
                                
                                </div>
                                <ShareOffcanvas />
                            </div>
                        <hr/>

                        {/* comments  */}
                        <ul className="post-comments list-inline p-0 m-0">
                            <li className="mb-2">
                                <div className="d-flex">
                                    {/* <div className="user-img">
                                        <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                                    </div> */}
                                    <div className="comment-data-block ms-3">
                                        <h5>Monty Carlo</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                            <Link to="#">like</Link>
                                            <Link to="#">reply</Link>
                                            <span> 5 min </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex">
                                    {/* <div className="user-img">
                                        <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                                    </div> */}
                                    <div className="comment-data-block ms-3">
                                        <h5>Paul Molive</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                            <Link to="#">like</Link>
                                            <Link to="#">reply</Link>
                                            <span> 5 min </span>
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <form className="comment-text d-flex align-items-center mt-3" >
                            <input type="text" className="form-control rounded" placeholder="Enter Your Comment"/>
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
    )


}













export default Index
