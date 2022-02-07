import React, {useEffect} from 'react';
import AllTicketsNavbar from "../component/AllTicketsNavbar";
import SubNavbarMenu from "../component/SubNavbarMenu";
import MainTableForTickets from "../component/MainTableForTickets";
import SideBarMenus from "../component/SideBarMenus";
import AccountNavbar from "../component/AccountNavbar";
import SideBar from "../component/SideBar";
import {toast} from "react-toastify";

const Tickets = () => {
    useEffect(()=>{
        toast.success("The site is running in test mode")
    }, [])
    return (
        <div className="all-tickets d-flex ">



              <SideBarMenus/>



             <div className="all-tickets-right-pair">
                 <div className="all-tickets-navbar">

                     <div className="all-tickets-navbar-child">
                         <h1>All tickets</h1>
                         <AccountNavbar />
                     </div>
                 </div>

             </div>


        </div>
    );
};

export default Tickets;