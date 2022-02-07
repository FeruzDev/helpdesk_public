import React from 'react';
import AccountNavbar from "./AccountNavbar";

const AllTicketsNavbar = () => {
    return (
        <div className="all-tickets-navbar">

            <div className="all-tickets-navbar-child">
                <h1>All tickets</h1>
                <AccountNavbar />
            </div>
        </div>
    );
};

export default AllTicketsNavbar;