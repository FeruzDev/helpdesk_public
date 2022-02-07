import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    ClosedStatusCount,
    getAllTicket,
    OpenStatusCount,
    PendingStatusCount,
    todayTicket
} from "../redux/action/TicketsAction";
import {getText} from "../locales";
import {Link, NavLink} from "react-router-dom";

const SubNavbarMenu = (props) => {

    var date = new Date();
    date.setDate(date.getDate() - 7);




    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()

    let today = year + "-" + month + "-" + day


    useEffect(() => {
        props.OpenStatusCount()
        props.ClosedStatusCount()
        props.PendingStatusCount()
        props.getAllTicket()
        props.todayTicket(today)


    }, [])

    return (
        <div className='sub-navbar-menu'>


            <div className="sub-navbar-menu-child">
                <Link to="/tickets/all-tickets" className="tickets-count">
                    <div className="gm-father">
                        <img src="/img/icon/gm1.png" alt=""/>
                    </div>

                    <div>
                        <h1>
                            {props.AllCount.count}
                            <span>+
                                {
                                   props.subAllTickets.count ?  props.subAllTickets.count : "0"
                                }
                       </span>
                        </h1>
                        <p>{getText("SideBarMenus3")}</p>
                    </div>
                </Link>

                <Link to="/tickets/filter/Open" className="tickets-count">
                    <div className="gm-father">
                        <img src="/img/icon/gm2.png" alt=""/>
                    </div>
                    <div>
                        <h1>
                            {props.openCount.count}
                            <span>+
                                {
                                    props.subOpen.count ?  props.subOpen.count : "0"
                                }
                       </span>
                        </h1>
                        <p>{getText("SideBarMenus6")}</p>
                    </div>
                </Link>

                <Link to="/tickets/filter/Pending" className="tickets-count">
                    <div className="gm-father">
                        <img src="/img/icon/gm3.png" alt=""/>
                    </div>

                    <div>
                        <h1>
                            {props.PendingCount.count}

                            <span>+

                                    {
                                        props.subPending.count ?  props.subPending.count : "0"
                                    }

                       </span>
                        </h1>
                        <p>{getText("SideBarMenus5")}</p>
                    </div>
                </Link>

                <Link to="/tickets/filter/Closed" className="tickets-count">
                    <div className="gm-father">
                        <img src="/img/icon/gm4.png" alt=""/>
                    </div>

                    <div>
                        <h1>
                            {props.ClosedCount.count}

                            <span>+
                                {
                                    props.subClosed.count ?  props.subClosed.count : "0"
                                }
                       </span>
                        </h1>
                        <p>{getText("SideBarMenus4")}</p>
                    </div>
                </Link>

            </div>

        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        openCount: state.ticketData.openCount,
        PendingCount: state.ticketData.PendingCount,
        ClosedCount: state.ticketData.ClosedCount,
        AllCount: state.ticketData.AllCount,
        subAllTickets: state.ticketData.subAllTickets,
        subOpen: state.ticketData.subOpen,
        subClosed: state.ticketData.subClosed,
        subPending: state.ticketData.subPending,
    }
}

export default connect(mapStateToProps, {
    OpenStatusCount,
    todayTicket,
    PendingStatusCount,
    getAllTicket,
    ClosedStatusCount
})(SubNavbarMenu);