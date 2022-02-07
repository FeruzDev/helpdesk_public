import React, {useEffect, useState} from 'react';
import {
    changeTicketStatus,
    getCommit,
    getAllTicket,
    getStatusList,

    changeTicketPr,
    ClosedStatusCount,
    ClosedNext,
    ClosedNextFunc,
    updateState
} from "../../redux/action/TicketsAction";
import {connect} from "react-redux";
import {Link, Switch, useHistory} from "react-router-dom";
import SideBarMenus from "../../component/SideBarMenus";
import AccountNavbar from "../../component/AccountNavbar";
import SubNavbarMenu from "../../component/SubNavbarMenu";
import PrivateRoute from "../../component/PrivateRoute";
import PendingFilter from "./PendingFilter";
import OpenFilter from "./OpenFilter";
import {getText} from "../../locales";


const ClosedFilter = (props) => {


    useEffect(() => {
        // props.getAllTicket(props.pageIndex)
        // props.getStatusList()
        props.getCommit()

        props.changeTicketStatus()
        props.ClosedStatusCount()


        props.updateState({pActive: null})

    }, [])


    let history = useHistory();
    const changeStatusFunction = (data, values) => {
        props.changeTicketStatus(data, values)

    }


    const changePrFunction = (data, values) => {
        props.changeTicketPr(data, values)

    }

    const visitCommit = (values, events) => {
        props.getCommit(values, history)
    }


    const filterList = () => {

    }


    let pagesNumbers = []
    // const [pagesNumbers, setPagesNumbers] = useState([])
    for (let i = 0; i < props.ClosedCount.last_page; i++) {
        pagesNumbers.push(i);


    }

    return (


        <div className="all-tickets d-flex ">



            <SideBarMenus/>



            <div className="all-tickets-right-pair">
                <div className="all-tickets-navbar">

                    <div className="all-tickets-navbar-child">
                        <h1>{getText("SubNavbarMenu15")}</h1>
                        <AccountNavbar />
                    </div>
                </div>

                <SubNavbarMenu/>


                <div className='main-table-for-tickets'>

                    <table>

                        <tr className="main-table-header">
                            <th><input type="checkbox"/></th>
                            <th>
                                {getText("SubNavbarMenu5")}
                            </th>
                            <th>
                                {getText("SubNavbarMenu6")}
                            </th>
                            <th>
                                {getText("SubNavbarMenu7")}
                            </th>
                            <th>
                                {getText("SubNavbarMenu8")}
                            </th>
                            <th>
                                {getText("SubNavbarMenu9")}
                            </th>
                            <th>

                            </th>
                            <th></th>
                        </tr>


                        {
                            props.ClosedCount.data?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox"/>
                                    </td>
                                    <td className="requester-name" onClick={() => visitCommit(item.id)}
                                        style={{cursor: "pointer"}}>
                                        <h4>{item.client_full_name}</h4>
                                        <span>{item.sender_name}</span>
                                    </td>
                                    <td className="subject-name">

                                        {item.priority === 1 ? <img src="/img/icon/open.png" alt=""/> : item.priority === 2 ?
                                            <img src="/img/icon/fast.png" alt=""/> :
                                            item.priority === 0 ?
                                                <img src="/img/icon/onHold.png" alt=""/> : item.priority === -1 ?
                                                <img src="/img/icon/close.png" alt=""/> : item.priority === -2 ?
                                                    <img src="/img/icon/pw.png" alt=""/> : ''}


                                        {" " + item.subject.length > 20 ? item.subject.slice(0, 20) + "..." : item.subject}
                                    </td>

                                    <td>
                                        {item.receiver_name}
                                    </td>
                                    <td><span
                                        className={item.ticket_status_name === "Open" ?
                                            "open" : item.ticket_status_name === "Closed" ?
                                                "closed" : item.ticket_status_name === "Pending" ?
                                                    "pending" : ""}>
                                {item.ticket_status_name}


                    </span>
                                    </td>
                                    <td>


                                        <h4 style={{
                                            fontSize: "14px",
                                            marginBottom: "0"
                                        }}>   {item.date_created.slice(11, 16)} </h4>
                                        <span style={{
                                            color: "#8E8C94",
                                            fontSize: "12px"
                                        }}> {item.date_created.slice(0, 10)}</span>

                                    </td>
                                    <td className="all-tickets-event-menu-father dropdown">
                                        <button className="all-tickets-event dropbtn">
                                            <img src="/img/icon/verDots.png" alt=""/>
                                        </button>


                                        <div className="all-tickets-event-menu dropdown-content">


                                            {
                                                props.ticketStatusList.map(item2 => (
                                                    <button
                                                        onClick={() => changeStatusFunction(item.id, item2.id)}>{item2.name}</button>
                                                ))
                                            }

                                            <img src="/img/icon/Divider.png" alt=""/>


                                            <button onClick={() => changePrFunction(item.id, 2)}><img src="/img/icon/fast.png"
                                                                                                      className="mr-2"
                                                                                                      alt=""/> {getText("SubNavbarMenu10")}
                                            </button>
                                            <button onClick={() => changePrFunction(item.id, 1)}><img src="/img/icon/open.png"
                                                                                                      className="mr-2"
                                                                                                      alt=""/> {getText("SubNavbarMenu11")}
                                            </button>
                                            <button onClick={() => changePrFunction(item.id, 0)}><img src="/img/icon/onHold.png"
                                                                                                      className="mr-2"
                                                                                                      alt=""/> {getText("SubNavbarMenu12")}
                                            </button>
                                            <button onClick={() => changePrFunction(item.id, -1)}><img src="/img/icon/close.png"
                                                                                                       className="mr-2"
                                                                                                       alt=""/> {getText("SubNavbarMenu13")}
                                            </button>
                                            <button onClick={() => changePrFunction(item.id, -2)}><img src="/img/icon/pw.png"
                                                                                                       className="mr-2"
                                                                                                       alt=""/> {getText("SubNavbarMenu14")}
                                            </button>


                                        </div>


                                    </td>
                                    {/*<td> </td>*/}

                                </tr>

                            ))


                        }


                    </table>


                    {
                        props.ClosedCount ? props.ClosedCount.last_page > 1 ?
                            <ul className="pageNumbersManual d-flex    ">
                                <li className="arrow">
                                    <button onClick={() => props.ClosedNextFunc(props.ClosedCount?.previous)}><img
                                        src="/img/icon/left.svg" alt=""/></button>

                                </li>
                                {
                                    pagesNumbers.map(item => (
                                        <button
                                            className={"numbers " + (props.pActive ? props.pActive === item + 1 ? "selected" : "" : "")}
                                            onClick={() => props.ClosedNext(item + 1)}>
                                            {item + 1}
                                        </button>
                                    ))
                                }
                                <li className="arrow">
                                    <button onClick={() => props.ClosedNextFunc(props.ClosedCount?.next)}><img
                                        src="/img/icon/right.svg" alt=""/></button>
                                </li>
                            </ul>
                            :
                            ""
                            :
                            ""

                    }


                </div>

            </div>


        </div>
    );
};

//

const mapStateToProps = (state) => {
    return {

        getTickets: state.ticketData.getTickets,
        getTicketsSearch: state.ticketData.getTicketsSearch,
        AllCount: state.ticketData.AllCount,
        ticketStatusList: state.ticketData.ticketStatusList,
        pageIndex: state.ticketData.pageIndex,
        ClosedCount: state.ticketData.ClosedCount,
        pActive: state.ticketData.pActive,

    }
}

export default connect(mapStateToProps, {
    getAllTicket,
    changeTicketPr,

    getCommit,
    changeTicketStatus,
    getStatusList,
    ClosedNext,
    updateState,
    ClosedNextFunc,
    ClosedStatusCount,

})(ClosedFilter);
