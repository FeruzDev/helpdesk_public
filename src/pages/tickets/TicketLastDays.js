import React from 'react';
import SideBarMenus from "../../component/SideBarMenus";
import AccountNavbar from "../../component/AccountNavbar";
import SubNavbarMenu from "../../component/SubNavbarMenu";
import LastDaysTable from "../../component/LastDaysTabel";
import {getText} from "../../locales";

const TicketLastDays = () => {

    return (
        <div className="all-tickets d-flex ">



            <SideBarMenus/>



            <div className="all-tickets-right-pair">
                <div className="all-tickets-navbar">

                    <div className="all-tickets-navbar-child">
                        <h1>{getText("SubNavbarMenu20")}</h1>
                        <AccountNavbar />
                    </div>
                </div>

                <SubNavbarMenu/>
                <LastDaysTable />
            </div>


        </div>

    );
};

export default TicketLastDays;