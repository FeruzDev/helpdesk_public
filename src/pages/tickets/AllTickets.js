import React from 'react';
import SideBarMenus from "../../component/SideBarMenus";
import AccountNavbar from "../../component/AccountNavbar";
import SubNavbarMenu from "../../component/SubNavbarMenu";
import MainTableForTickets from "../../component/MainTableForTickets";
import {connect} from "react-redux";
import {getStatusList} from "../../redux/action/TicketsAction";
import {getText} from "../../locales";

const AllTickets = () => {
    return (
        <div className="all-tickets d-flex ">



            <SideBarMenus/>



            <div className="all-tickets-right-pair">
               <div className="for-fixed">
                   <div className="all-tickets-navbar">

                       <div className="all-tickets-navbar-child">
                           <h1>{getText("SideBarMenus3")}</h1>
                           <AccountNavbar />
                       </div>
                   </div>

                   <SubNavbarMenu/>
               </div>
                <MainTableForTickets/>
            </div>


        </div>
    );
};



const mapStateToProps = () =>{
    return{

    }
}
export default connect(mapStateToProps, {getStatusList})(AllTickets);