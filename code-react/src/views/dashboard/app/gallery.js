import React,{useState} from 'react'
import {Row, Col, Container, Dropdown, Nav, Tab, OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap'
import Card from '../../../components/Card'
import CustomToggle from '../../../components/dropdowns'
import ShareOffcanvas from '../../../components/share-offcanvas'
import {Link} from 'react-router-dom'
import ReactFsLightbox from 'fslightbox-react';

// images

import g1 from '../../../assets/images/page-img/g1.jpg'
import g2 from '../../../assets/images/page-img/g2.jpg'
import g3 from '../../../assets/images/page-img/g3.jpg'
import g4 from '../../../assets/images/page-img/g4.jpg'
import g5 from '../../../assets/images/page-img/g5.jpg'
import g6 from '../../../assets/images/page-img/g6.jpg'
import g7 from '../../../assets/images/page-img/g7.jpg'
import g8 from '../../../assets/images/page-img/g8.jpg'
import g9 from '../../../assets/images/page-img/g9.jpg'
import g10 from '../../../assets/images/page-img/10.jpg'
import g11 from '../../../assets/images/page-img/51.jpg'
import g12 from '../../../assets/images/page-img/52.jpg'
import g13 from '../../../assets/images/page-img/53.jpg'
import g14 from '../../../assets/images/page-img/54.jpg'
import g15 from '../../../assets/images/page-img/55.jpg'
import g16 from '../../../assets/images/page-img/56.jpg'
import g17 from '../../../assets/images/page-img/57.jpg'
import g18 from '../../../assets/images/page-img/58.jpg'
import g19 from '../../../assets/images/page-img/59.jpg'
import g20 from '../../../assets/images/page-img/60.jpg'
import g21 from '../../../assets/images/page-img/61.jpg'
import g22 from '../../../assets/images/page-img/62.jpg'
import g23 from '../../../assets/images/page-img/64.jpg'
import g24 from '../../../assets/images/page-img/65.jpg'
import g25 from '../../../assets/images/page-img/63.jpg'

// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default ? ReactFsLightbox.default : ReactFsLightbox;

const Gallery =() =>{
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [imageController, setImageController] = useState({
      toggler: false,
      slide: 1
  });
  
  function imageOnSlide(number) {
      setImageController({
      toggler: !imageController.toggler,
      slide: number
      }); 
  }

  const imgs = [g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,g16,g17,g18,g19,g20,g21,g22,g23,g24,g25]

  return(
      <>
      <FsLightbox
                toggler={imageController.toggler}
                sources={imgs}
                slide={imageController.slide}
            />
            <Container>
            <Card>
                                 <Card.Body>
                                    <h2>Gallery</h2>
                                    <div className="friend-list-tab mt-2">
                    
                                             <div className="card-body p-0">
                                                <div className="d-grid gap-2 d-grid-template-1fr-13 ">
                                               
                                                {Array.from({ length: 25 }).map((_, index) => (
    <div key={index}>
      <div className="user-images position-relative overflow-hidden">
        <Link onClick={() => imageOnSlide(index+1)} to="#">
          <img loading="lazy" src={imgs[index]} className="img-fluid rounded" alt="Responsive"/>
        </Link>
        <div className="image-hover-data">
          <div className="product-elements-icon">
            <ul className="d-flex align-items-center m-0 p-0 list-inline">
              <li><Link to="#" className="pe-3 text-white d-flex align-items-center"> 60 <i className="material-symbols-outlined md-14 ms-1">thumb_up</i> </Link></li>
              <li><Link to="#" className="pe-3 text-white d-flex align-items-center"> 30 <span className="material-symbols-outlined  md-14 ms-1">chat_bubble_outline</span> </Link></li>
              <li><Link to="#" className="pe-3 text-white d-flex align-items-center"> 10 <span className="material-symbols-outlined md-14 ms-1">
                forward
              </span> </Link></li>
            </ul>
          </div>
        </div>
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit or Remove</Tooltip>}>
          <Link to="#" className="image-edit-btn material-symbols-outlined md-16">drive_file_rename_outline</Link>
        </OverlayTrigger>
      </div>
    </div>
  ))}
                                                   
                                                  
                                                  
                                                </div>
                                             </div>
                                    </div>
                                 </Card.Body>
                              </Card>
            </Container>
      </>
  )

}

export default Gallery;