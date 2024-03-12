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
                <span className="default-icon">Space</span>
                <span className="mini-icon" data-bs-toggle="tooltip" title="Space" data-bs-placement="right">-</span>
            </Link>
        </li>

        {/* Timeline */}
        <li className={`${location.pathname === '/dashboard/app/timeline' ? 'active' : ''} nav-item`}>
            <Link className="nav-link" to="/dashboard/app/timeline">
                <OverlayTrigger placement="right" overlay={<Tooltip>Timeline</Tooltip>}>
                    <span>
                        <i className="icon material-symbols-outlined">schedule</i>
                    </span>
                </OverlayTrigger>
                <span className="item-name">Timeline</span>
            </Link>
        </li>

        {/* Gallery */}
        <li hidden className={`${location.pathname === '/dashboard/app/gallery' ? 'active' : ''} nav-item`}>
            <Link className="nav-link" to="/dashboard/app/gallery">
                <OverlayTrigger placement="right" overlay={<Tooltip>Gallery</Tooltip>}>
                    <span>
                        <i className="icon material-symbols-outlined">photo</i>
                    </span>
                </OverlayTrigger>
                <span className="item-name">Gallery</span>
            </Link>
        </li>

        {/* Profile */}
        <li className={`${location.pathname === '/dashboard/app/profile' ? 'active' : ''} nav-item`}>
            <Link className="nav-link" to="/dashboard/app/profile">
                <OverlayTrigger placement="right" overlay={<Tooltip>Profile</Tooltip>}>
                    <span>
                        <i className="icon material-symbols-outlined">person</i>
                    </span>
                </OverlayTrigger>
                <span className="item-name">Profile</span>
            </Link>
        </li>

        {/* Notification */}
        <li className={`${location.pathname === '/dashboard/app/notification' ? 'active' : ''} nav-item`}>
            <Link className="nav-link" to="/dashboard/app/notification">
                <OverlayTrigger placement="right" overlay={<Tooltip>Notification</Tooltip>}>
                    <span>
                        <i className="icon material-symbols-outlined">notifications</i>
                    </span>
                </OverlayTrigger>
                <span className="item-name">Notification</span>
            </Link>
        </li>
    </Accordion>
</React.Fragment>
    )
})

export default VerticalNav
