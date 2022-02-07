import React from 'react';
import SideBarMenus from "../../component/SideBarMenus";
import AccountNavbar from "../../component/AccountNavbar";
import SubNavbarMenu from "../../component/SubNavbarMenu";
import MainTableForTickets from "../../component/MainTableForTickets";
import OpenTicketsTable from "../../component/OpenTicketsTable";
import {getText} from "../../locales";

const TicketOpen = () => {
    return (
        <div className="all-tickets d-flex ">



            <SideBarMenus/>



            <div className="all-tickets-right-pair">
                <div className="all-tickets-navbar">

                    <div className="all-tickets-navbar-child">
                        <h1>{getText("SubNavbarMenu19")}</h1>
                        <AccountNavbar />
                    </div>
                </div>

                <SubNavbarMenu/>
                <OpenTicketsTable />
            </div>


        </div>

    );
};

export default TicketOpen;