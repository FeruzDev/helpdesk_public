import React from 'react';
import SideBarMenus from "../../component/SideBarMenus";
import AccountNavbar from "../../component/AccountNavbar";
import SubNavbarMenu from "../../component/SubNavbarMenu";
import MainTableForTickets from "../../component/MainTableForTickets";
import Agents from "../Agents";
import PrivateRoute from "../../component/PrivateRoute";
import {Route, Switch} from "react-router-dom";
import ClosedFilter from "./ClosedFilter";
import PendingFilter from "./PendingFilter";
import OpenFilter from "./OpenFilter";
import Commit from "./Commit";

const ByFilter = () => {
    return (
        // <div className="all-tickets d-flex ">
        //
        //
        //
        //     <SideBarMenus/>
        //
        //
        //
        //     <div className="all-tickets-right-pair">
        //         <div className="all-tickets-navbar">
        //
        //             <div className="all-tickets-navbar-child">
        //                 <h1>All tickets</h1>
        //                 <AccountNavbar />
        //             </div>
        //         </div>
        //
        //         <SubNavbarMenu/>



                <Switch>
                    <PrivateRoute  path="/tickets/filter/closed"    component={ClosedFilter} />
                    <PrivateRoute  path="/tickets/filter/pending"    component={PendingFilter} />
                    <PrivateRoute  path="/tickets/filter/open"    component={OpenFilter} />
                    <PrivateRoute path="/tickets/filter/commit/:id"  exact component={Commit}/>

                </Switch>
        //     </div>
        //
        //
        // </div>
    );
};

export default ByFilter;