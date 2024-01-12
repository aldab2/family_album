import React, { useEffect } from 'react'

//header
import Header from '../../components/partials/dashboard/HeaderStyle/header'

//sidebar
import RightSidebar from '../../components/partials/dashboard/SidebarStyle/rightsidebar'

//sidebar
import Sidebar from '../../components/partials/dashboard/SidebarStyle/sidebar'

//footer
import Footer from '../../components/partials/dashboard/FooterStyle/footer'

//default 
// import DefaultRouter from '../../router/default-router'

// share-offcanvas
// import ShareOffcanvas from '../../components/share-offcanvas'

//settingoffCanvas
import SettingOffCanvas from '../../components/setting/SettingOffCanvas'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify'


const Default = () => {
    const { userInfo } = useSelector(state => state.authReducer) || {};
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userInfo){
            alert("back to sign in")
            navigate('/auth/sign-in')
        }
    })

    return (
        <>
                <Header />
                <Sidebar />
                
                <div className="main-content">
                    {/* <div id="content-page" className="content-page"> */}
                    {/* <DefaultRouter/> */}
                    <Outlet/>
                    {/* </div> */}
                </div>
              
            <Footer />
            <SettingOffCanvas/>
        </>
    )
}

export default Default
