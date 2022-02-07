import React from 'react';
import SideBarMenus from "../../component/SideBarMenus";
import AccountNavbar from "../../component/AccountNavbar";
import SubNavbarMenu from "../../component/SubNavbarMenu";
import MainTableForTickets from "../../component/MainTableForTickets";
import TicketsHandleTable from "../../component/TicketsHandleTable";
import {getText} from "../../locales";

const TicketsToHandle = () => {
    return (
        <div className="all-tickets d-flex ">



            <SideBarMenus/>



            <div className="all-tickets-right-pair">
                <div className="all-tickets-navbar">

                    <div className="all-tickets-navbar-child">
                        <h1>{getText("SubNavbarMenu18")}</h1>
                        <AccountNavbar />
                    </div>
                </div>

                <SubNavbarMenu/>
                <TicketsHandleTable/>
            </div>


        </div>

    );
};

export default TicketsToHandle;