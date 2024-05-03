import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Dropdown, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../../components/Card'
import CustomToggle from '../../../components/dropdowns'

//image
import img1 from '../../../assets/images/small/07.png'


import { useAddCommentMutation, useEditCommentMutation, useDeleteCommentMutation } from '../../../store/slices/commentsApiSlice';




import loader from '../../../assets/images/page-img/page-load-loader.gif'
import { useAddPostMutation, useDeletePostMutation, useEditPostVisibilityMutation, useGetPostsQuery, useLazyGetPostsQuery } from '../../../store/slices/postsApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import { timeAgo } from '../../../utilities/general'



const PostsTimeline = ({type = "family" , onlyMyPosts = false }) => {
    const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
    const [editPostVisibility, { isLoading: isEditingVisiblity }] = useEditPostVisibilityMutation();

    const [deleteComment] = useDeleteCommentMutation();
    const [commentContent, setCommentContent] = useState('');

    const [expandedPostId, setExpandedPostId] = useState(null);
    const toggleComments = (postId) => {
        setExpandedPostId(expandedPostId === postId ? null : postId);
    };
    


    const handleSubmitComment = async (postId) => {
        try {
            const newComment = await addComment({ content: commentContent, postId }).unwrap();
            setCommentContent(''); // Clear the comment input field
            toast.success('Comment added successfully');
    
            // Update local posts state to include the new comment
            setPosts(currentPosts =>
                currentPosts.map(post => {
                    if (post._id === postId) {
                        // Add the new comment to this post's comments
                        return { ...post, comments: [...post.comments, newComment] };
                    }
                    return post;
                })
            );
        } catch (error) {
            console.error('Failed to add comment:', error);
            toast.error('Failed to add comment');
        }
    };
      



    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPostVisibility, setSelectedPostVisibility] = useState('Family Members');
    const [postText,setPostText] = useState('');
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=> state.authReducer);
    //const { data, isLoading, isFetching, error } = useGetPostsQuery({ page,onlyMyPosts,type });
    const [triggerGetPosts, { data, isLoading, isFetching, error }] = useLazyGetPostsQuery();

    const [addPost,{isLoading:isAddPostLoading,error:addPostError}] = useAddPostMutation();
    const [deletePost,{isLoading:isDeletePostLoading,error:deletePostError}] = useDeletePostMutation();


       // Add this useEffect hook to reset state when userInfo changes
       useEffect(() => {
        // Reset the posts, page, and hasMorePosts state
        console.log("User info changed, refetching posts...");
        setPosts([]);
        setPage(1);
        setHasMorePosts(true);

        triggerGetPosts({ page: 1, onlyMyPosts, type })
    }, [userInfo, triggerGetPosts, onlyMyPosts, type]); // Listen for changes to userInfo

    


    useEffect(() => {
        if (data) {
            console.log("Data:", data, "type", type,"page",page);
            if (data.length === 0) {
                setHasMorePosts(false);
            } else if (page === 1) {
                setPosts(data);  // Reset posts only if it's the first page
            } else {
                setPosts(prevPosts => {
                    // Create a new Set to filter out duplicate posts by ID
                    const postsById = new Map(prevPosts.map(post => [post._id, post]));
                    data.forEach(post => {
                        if (!postsById.has(post._id)) {
                            postsById.set(post._id, post);
                        }
                    });
                    return Array.from(postsById.values());
                });
            }
        }
    }, [data]);




    
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
            await new Promise(r => setTimeout(r,200));
    
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                triggerGetPosts({ page: nextPage, onlyMyPosts, type }); // Use the updated page number here
                return nextPage; // Return the updated page number to update the state
            });
            
        }
    };

    const handleSelectPostVisibility = (item) => {
        setSelectedPostVisibility(item);
    };

    const handleChangePostVisibility = async (postId,visibility) => {
        try {
            await editPostVisibility({ visibility: visibility, id:postId }).unwrap();
            toast.success('Visibility Updated');
    
            // Update local posts state to include the new comment
            setPosts(currentPosts =>
                currentPosts.map(post => {
                    if (post._id === postId) {
                        return { ...post, visibility: visibility };  // Create a new object with the updated property
                    }
                    return post;
                })
            );
            
            if (type == 'all') {
                setPosts(currentPosts => currentPosts.filter(post => post.visibility !== 'private'));
            }
            
        } catch (error) {
            console.error('Failed to add comment:', error);
            toast.error(`Failed to update visibility: ${error}`);
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files) {
          setSelectedFile(event.target.files[0]);
        }
      };
      const handlePostButton = async (event) => {
        event.preventDefault();
    
        if (selectedFile && postText) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          formData.append("content", postText);
    
          switch(selectedPostVisibility) {
            case 'Family Members':
              formData.append("visibility", "private");
              break;
            case 'Family Friends':
              formData.append("visibility", "friends");
              break;
            case 'Public':
              formData.append("visibility", "public");
              break;
            default:
              toast.error("Unknown Visibility Option", selectedPostVisibility);
              break;
          }
    
          try {
            const postResult = await addPost(formData).unwrap();
            setPosts(prevPosts => [postResult, ...prevPosts]);
            toast.success("Post Added");
            handleClose();
          } catch (error) {
            toast.error(`Failed to add post ${error}`);
          }
        } else {
          toast.info("Fields Missing");
        }
    };
    

      const handleDeletePost = async (postToDelete) => {
        try {
            const deletion = await deletePost({ id: postToDelete._id }).unwrap();
            const deletedPost = deletion.postDeletion
            
            console.log("Before deletion:", posts); // Debugging
            console.log("Deleted Post",deletedPost)
            const updatedPosts = posts.filter(post => post._id !== deletedPost._id);
            setPosts(updatedPosts);
            console.log("After deletion:", updatedPosts); // Debugging
    
            toast.success("Post Deleted Successfully");
        } catch (deletePostError) {
            toast.error(deletePostError.toString());
        }
    };

    

    // const handleDeleteComment = async (commentId, postId) => {
    //     try {
    //         console.log("Deleting comment ID:", commentId);
    //         await deleteComment({ id: commentId }).unwrap();
    //         toast.success('Comment deleted successfully');
    //         // Update local posts state to remove the comment
    //         setPosts(currentPosts => currentPosts.map(post => {
    //             if (post._id === postId) {
    //                 const filteredComments = post.comments.filter(comment => comment._id !== commentId);
    //                 return { ...post, comments: filteredComments };
    //             }
    //             return post;
    //         }));
    //     } catch (error) {
    //         console.error('Failed to delete comment:', error);
    //         toast.error('Failed to delete comment');
    //     }
    // };

    const handleDeleteComment = async (commentId, postId) => {
        try {
            console.log("Deleting comment ID:", commentId);
            const response = await deleteComment({ id: commentId }).unwrap();
            console.log("Delete response:", response);  // Log the response to see what comes back from the server
    
            // Deep clone and update local posts state to remove the comment
            console.log("About to delete comment from post ID:", postId);
            setPosts(currentPosts => {
                
                const updatedPosts = currentPosts.map(post => {
                    console.log("Current post ID:", post._id, "Target post ID:", postId);
                    if (post._id === postId) {
                        console.log("Comments before filtering:", post.comments);
                        console.log("Attempting to delete comment ID:", commentId); 
                        const filteredComments = post.comments.filter(comment => comment._id !== commentId);
                        // Create a deep clone of the post to ensure React recognizes the change
                        return { ...post, comments: [...filteredComments] };
                    }
                    return { ...post };
                });
                console.log("Updated posts after deletion:", updatedPosts);  // Log to check if the comments are filtered correctly
                return updatedPosts;
            });
    
            toast.success('Comment deleted successfully');
        } catch (error) {
            console.error('Failed to delete comment:', error);
            toast.error('Failed to delete comment');
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

                                            <form className="post-text ms-3 w-100 " onClick={handleShow}>
                                                <input type="text" className="form-control rounded" placeholder="Write something here..." onChange={(e)=>setPostText(e.target.value)} value={postText} style={{ border: "none" }} />
                                            </form>
                                        </div>
                                        <hr></hr>
                                        <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
                                        <li className="me-3 mb-md-0 mb-2">
                                            <input 
                                                type="file" 
                                                id="file-upload" 
                                                style={{ display: 'none' }} 
                                                onChange={handleFileChange} // Add a handler for file selection
                                                accept="image/*,video/*" // Accept images and videos
                                            />
                                            <button 
                                                className="btn btn-soft-primary" 
                                                onClick={() => document.getElementById('file-upload').click()}
                                            >
                                                <img src={img1} alt="icon" className="img-fluid me-2" /> Photo/Video
                                            </button>
                                        </li>
                                        </ul>
                                    </Card.Body>
                                    <Modal size="lg" className="fade " id="post-modal" onHide={handleClose} show={show} >
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
                                                <form className="post-text ms-3 w-100" data-bs-toggle="modal" data-bs-target="#post-modal">
    <textarea
        className="form-control rounded"
        placeholder="Write something here..."
        style={{ border: "none", overflowY: "hidden", resize: "none" }}
        rows="1"
        onChange={(e)=>setPostText(e.target.value)}
        value={postText}
        onInput={(e) => {
            e.target.style.height = 'inherit';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }}
    ></textarea>
</form>
                                            </div>
                                            <hr />
                                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                            <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('file-upload').click()}>
                
                    <img src={img1} alt="icon" className="img-fluid" /> Photo/Video
                </div>
            </li>
                                                {/* <li className="col-md-6 mb-3">
                                                <div className="bg-soft-primary rounded p-2 pointer me-3"><Link to="#"></Link>
                                                <img src={img2} alt="icon" className="img-fluid"/> Tag Friend</div>
                                            </li> */}

{selectedFile &&  <li className="col-md-6 mb-3">
                                        <div className='text-primary'> Uploading:</div> {selectedFile.name}
                                    </li> }
                                            </ul>
                                            <hr />
                                            <div className="other-option">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="align-items-center">
                                                        {/* <div className="user-img me-3">
                                                    <img src={user1} alt="user1" className="avatar-60 rounded-circle img-fluid"/>
                                                </div> */}
                                                        <div>
                                                            <h4 className='text-primary'>Share Post with:</h4>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0">This Controls who can see your Post</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-post-toolbar">
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={CustomToggle} role="button">
                                                                <span className="btn btn-primary">{selectedPostVisibility}</span>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className=" m-0 p-0">
                                                                <Dropdown.Item className=" p-3" to="#" onClick={()=>handleSelectPostVisibility('Family Members')}>
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-user-unfollow-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Family Members</h6>
                                                                            <p className="mb-0">Only Family Member can see this Post</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className="p-3" to="#" onClick={()=>handleSelectPostVisibility('Family Friends')}>
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-close-circle-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Family Friends</h6>
                                                                            <p className="mb-0">Only Family Friend can see This Post</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                {/* <Dropdown.Item className=" p-3" to="#" onClick={()=>handleSelectPostVisibility('Public')}>
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-save-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Public</h6>
                                                                            <p className="mb-0">Anyone can see this Post</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item> */}

                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                {isAddPostLoading && <img src={loader} alt="Loading..." style={{ width: '50px' }} />}
                                            </div>
                                            <button type="button" onClick={handlePostButton} className="btn btn-primary d-block w-100 mt-3" disabled={isAddPostLoading}>
                                                {isAddPostLoading ? 'Posting...' : 'Post'}
                                            </button>
                                        </Modal.Body>
                                    </Modal>

                                   {selectedFile &&  <Card.Footer>
                                    <div className='text-primary'> Uploading:</div> {selectedFile.name}
                                    </Card.Footer> }
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
                                    return <Col key={post._id} sm={12}>
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
                                                                    <h5 className="mb-0 d-inline-block text-primary">{post.author} { type== "all" && <small className="mb-0 text-muted  text-secondary-small">@{post.family.spaceName}</small>}</h5>
                                                                   
                                                                    <p className="mb-0 text-secondary">{timeAgo(post.createdAt)}</p>
                                                                </div>
                                                                <div className="card-post-toolbar">
                                                        {post.family._id=== userInfo.family && <Dropdown>
                                                            <Dropdown.Toggle variant="bg-transparent">
                                                            <span className="material-symbols-outlined">
                                                                more_horiz
                                                            </span>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                                                
                                                                <Dropdown.Item className= "p-3" to="#" onClick={()=>handleDeletePost(post)}>
                                                                        <div className="d-flex align-items-top">
                                                                        <i className="ri-close-circle-line h4"></i>
                                                                        <div className="data ms-2 ">
                                                                            <h6>Delete Post</h6>
                                                                            <p className="mb-0">This will permenantly remove this post.</p>
                                                                        </div>
                                                                    </div>
                                                                    </Dropdown.Item>
                                                                    {post.visibility != 'private' &&
                                                                    <Dropdown.Item className={`p-3`} to="#" onClick={()=>handleChangePostVisibility(post._id,"private")}>
                                                                    <div className="d-flex align-items-top">
                                                                        <i className=" ri-eye-off-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Make it for family only</h6>
                                                                            <p className="mb-0">Currently, all friends can see this post.</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                    }
                                                                    
                                                                    {/* <Dropdown.Item className=" p-3" to="#">
                                                                        <div className="d-flex align-items-top">
                                                                            <i className=" ri-eye-fill h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Make Public</h6>
                                                                                <p className="mb-0">Public for all to see</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item> */}
                                                                    {post.visibility =="private" &&
                                                                    
                                                                    <Dropdown.Item className=" p-3" to="#" onClick={()=>handleChangePostVisibility(post._id,"friends")}>
                                                                        <div className="d-flex align-items-top">
                                                                            <i className=" ri-group-fill h4"></i>
                                                                            <div className="data ms-2">
                                                                                <h6>Make it for family and freinds</h6>
                                                                                <p className="mb-0">Currently, this post is private to your family only</p>
                                                                            </div>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                    }
                                                                </Dropdown.Menu>
                                                            </Dropdown> } 
                                                        </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p>{post.content}</p>
                                                </div>
                                                <div className="user-post">

                                                    {getMediaType(post.media[0]) === 'image' && <Link to="#"><img src={post.mediaUrls[0]} alt="post1" className="img-fluid rounded w-100" /></Link>}

                                                    {getMediaType(post.media[0]) === 'video' && <div className="ratio ratio-16x9">
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
                                                                
                                                            </div>

                                                        </div>
                                                        {/* <ShareOffcanvas /> */}
                                                    </div>
                                                    <hr />

                                                    {/* comments  */}
                                                    <ul className="post-comments list-inline p-0 m-0">
                                                        {post.comments.slice(0, expandedPostId === post._id ? post.comments.length : 2).map((comment, index) => (
                                                            <li key={index} className="mb-2">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="comment-data-block ms-3">
                                                                        <h5 className='text-primary'>{comment.author}{ type== "all" && <small className="mb-0 text-muted  text-secondary-small">@{post.family.spaceName}</small>}</h5>
                                                                        <p className="mb-0">{comment.content}</p>
                                                                        <div className="d-flex flex-wrap align-items-center comment-activity">
                                                                            <span>{timeAgo(comment.createdAt)}</span>
                                                                        </div>
                                                                    </div>
                                                                    { ((post.author == userInfo.userName) || (comment.author == userInfo.userName)) &&
                                                                    
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant="bg-transparent">
                                                                            <span className="material-symbols-outlined">more_horiz</span>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            { comment.author == userInfo.userName &&
                                                                            <Dropdown.Item>
                                                                            Edit
                                                                        </Dropdown.Item>
                                                                            }
                                                                            
                                                                            <Dropdown.Item onClick={() => handleDeleteComment(comment._id, post._id)}>
                                                                                Delete
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                    }
                                                                </div>
                                                            </li>
                                                        ))}
                                                        {post.comments.length > 2 && (
                                                            <li className="mt-2">
                                                                <Button variant="link" onClick={() => setExpandedPostId(expandedPostId === post._id ? null : post._id)}>
                                                                    {expandedPostId === post._id ? 'Hide' : 'Show All'} Comments
                                                                </Button>
                                                            </li>
                                                        )}
                                                    </ul>
                                                                  
                                                    <form
                                                        className="comment-text d-flex align-items-center mt-3"
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            handleSubmitComment(post._id); // Replace `post._id` with the correct variable that holds the post ID
                                                        }}
                                                        >
                                                            {/* Comment input and submit button as defined above */}
                                                            <input
                                                                type="text"
                                                                className="form-control rounded"
                                                                placeholder="Enter Your Comment"
                                                                value={commentContent}
                                                                onChange={(e) => setCommentContent(e.target.value)}
                                                                />
                                                            <Button variant="primary" className="m-3" type="submit">Post</Button>
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


export default PostsTimeline
