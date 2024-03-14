import React, { useEffect, useState } from 'react'

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


// const Default = () => {
//     const { userInfo } = useSelector(state => state.authReducer) || {};
//     const navigate = useNavigate();

//     useEffect(()=>{
//         if(!userInfo){
//             navigate('/auth/sign-in')
//         }
//         else if (!userInfo.active){
//             navigate('/auth/activate')
//         }
//     })

//     return (
//         <>
//                 <Header />
//                 <Sidebar />
                
//                 <div className="main-content">
//                     {/* <div id="content-page" className="content-page"> */}
//                     {/* <DefaultRouter/> */}
//                     <Outlet/>
//                     {/* </div> */}
//                 </div>
              
//             <Footer />
//             <SettingOffCanvas/>
//         </>
//     )
// }

// export default Default

const Default = () => {
    const { userInfo } = useSelector(state => state.authReducer) || {};
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        let isMounted = true; // Track if component is mounted
        if (!userInfo) {
            isMounted && navigate('/auth/sign-in');
            isMounted && setIsAuthorized(false);
        } else if (!userInfo.active) {
            isMounted && navigate('/auth/activate');
            isMounted && setIsAuthorized(false);
        } else {
            isMounted && setIsAuthorized(true);
        }

        return () => { isMounted = false; } // Cleanup function to set isMounted to false
    }, [userInfo, navigate]);

    if (isAuthorized === null) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    if (!isAuthorized) {
        return null; // Prevent rendering children before redirect, could also keep loading indicator here
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />
            {/* <SettingOffCanvas /> */}
        </>
    );
}

export default Default;
