
import React, { useEffect, useState } from 'react'
// Import selectors & action from setting store
import * as SettingSelector from '../../../../store/setting/selectors'

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Components
import Verticalnav from './verticalnav'
import Scrollbar from 'smooth-scrollbar'

const Sidebar = () => {
    const [isClosed, setIsClosed] = useState(true);  // State to control sidebar open/close

    const sidebarType = useSelector(SettingSelector.sidebar_type) // array
    const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style)

    useEffect(() => {
        Scrollbar.init(document.querySelector('.data-scrollbar'));

        window.addEventListener('resize', () => {
            const tabs = document.querySelectorAll('.nav');
            const sidebarResponsive = document.querySelector('[data-sidebar="responsive"]');
            if (window.innerWidth < 1025) {
                tabs.forEach((elem) => {
                    elem.classList.add('flex-column', 'on-resize');
                });
                sidebarResponsive && sidebarResponsive.classList.add('sidebar-mini', 'on-resize');
            } else {
                tabs.forEach((elem) => {
                    elem.classList.remove('flex-column', 'on-resize');
                });
                sidebarResponsive && sidebarResponsive.classList.remove('sidebar-mini', 'on-resize');
            }
        });

        // Set the sidebar to closed on small screens on initial load
        if (window.innerWidth < 1025) {
            setIsClosed(true);
        }
    }, []);

    return (
        <>
            <aside className={`${sidebarType.join(" ")} ${sidebarMenuStyle} ${isClosed ? 'sidebar-mini' : ''} sidebar sidebar-default sidebar-base navs-rounded-all`} id="first-tour" data-toggle="main-sidebar" data-sidebar="responsive">
                <div className="sidebar-body pt-0 data-scrollbar">
                    <div className="sidebar-list">
                        <Verticalnav/>
                    </div>
                </div>
                <div className="sidebar-footer"></div>
            </aside>
        </>
    )
}

export default Sidebar;
