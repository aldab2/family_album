import React, { useState, useContext} from 'react'

//router
import { Link, useLocation } from 'react-router-dom'

//react-bootstrap
import { Accordion, useAccordionButton, AccordionContext, Nav,Tooltip,OverlayTrigger} from 'react-bootstrap'



function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNav = React.memo(() => {
    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive]= useState('')
    //location
    let location = useLocation();


    return (
        <React.Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Social</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
                    </Link>
                </li>
                <Accordion.Item as="li" eventKey="album-menu" bsPrefix={`nav-item ${active === 'album' ? 'active' : '' } `} onClick={() => setActive('profile')} >
                    <CustomToggle eventKey="album-menu" onClick={(activeKey) =>  setActiveMenu(activeKey) }>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Album</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                                photo
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Album</span>
                        <i className="right-icon material-symbols-outlined">chevron_right</i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="album-menu" >
                        <ul className="sub-nav">
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/dashboard/app/timeline' ? 'active' : ''} nav-link`} to="/dashboard/app/timeline">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Timeline</Tooltip>}>
                                     <i className="sidenav-mini-icon"> Timeline </i>
                                    </OverlayTrigger>
                                    <span className="item-name"> Timeline </span>
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link className={`${location.pathname === '/dashboard/app/gallery' ? 'active' : ''} nav-link`} to="/dashboard/app/gallery">
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <OverlayTrigger placement="right" overlay={<Tooltip>Gallery</Tooltip>}>
                                     <i className="sidenav-mini-icon"> Gallery </i>
                                    </OverlayTrigger>
                                    <span className="item-name"> Gallery</span>
                                </Link>
                            </Nav.Item>
                        
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>
                
                  
                <li  className={`${location.pathname === '/dashboard/app/profile' ? 'active' : ''} nav-item `}>
                    <Link className={`${location.pathname === '/dashboard/app/profile' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboard/app/profile">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Profile</Tooltip>}>
                            <i className="icon material-symbols-outlined">
                                person
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Profile</span>
                    </Link>
                </li>

                
                <Nav.Item as="li">
                    <Link className={`${location.pathname === '/dashboard/app/notification' ? 'active' : ''} nav-link `} aria-current="page"  to="/dashboard/app/notification">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Notification</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            notifications
                        </i>
                        </OverlayTrigger>
                        <span className="item-name">Notification</span>
                    </Link>
                </Nav.Item>
            </Accordion>
        </React.Fragment>
    )
})

export default VerticalNav
