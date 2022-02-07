import React, {useEffect, useState} from 'react';
import {
    changeTicketPr,
    changeTicketStatus,
    getCommit,
    getMyOpenTicket,

    getStatusList, myOpenFunc, myOpenNext,
    updateState

} from "../redux/action/TicketsAction";
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {getText} from "../locales";


const OpenTicketsTable = (props) => {





    useEffect(() => {
        props.getMyOpenTicket()
        props.getStatusList()
        props.changeTicketStatus()
        props.changeTicketPr()

        props.updateState({pActive: null })

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



    let pagesNumbers = []
    // const [pagesNumbers, setPagesNumbers] = useState([])
    for (let i =0; i < props.boc.last_page; i++) {
        pagesNumbers.push(i);

    }


    return (
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
                    props.boc.data?.map((item, index) => (
                        <tr>
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
                                            <img src="/img/icon/close.png" alt=""/> : item.priority === -2 ? "iconnnn" : ''}


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
                    </span></td>
                            <td>
                                {
                                    item.date_created.slice(0, 10)
                                }
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
                props.boc ?  props.boc.last_page > 1 ?
                    <ul className="pageNumbersManual d-flex    ">
                        <li className="arrow" >
                            <button   onClick={() => props.myOpenFunc(props.boc?.previous)}><img src="/img/icon/left.svg" alt=""/></button>

                        </li>
                        {
                            pagesNumbers.map(item => (
                                <button className={ "numbers "+ (props.pActive ? props.pActive === item+1 ? "selected" : "" : "")}
                                        onClick={() => props.myOpenNext(item+1)}>
                                    {item + 1}
                                </button>
                            ))
                        }
                        <li className="arrow" >
                            <button onClick={() => props.myOpenFunc(props.boc?.next)}><img src="/img/icon/right.svg" alt=""/></button>
                        </li>
                    </ul>
                    :
                    ""
                    :
                    ""

            }

 
        </div>
    );
};

const mapStateToProps = (state) => {
    return {

        getOpenTickets: state.ticketData.getOpenTickets,
        ticketStatusList: state.ticketData.ticketStatusList,
        boc: state.ticketData.boc,
        pActive: state.ticketData.pActive,

    }
}

export default connect(mapStateToProps, {
    getMyOpenTicket,
    changeTicketPr,
    getCommit,
    changeTicketStatus,
    getStatusList,
    myOpenNext,
    myOpenFunc,
    updateState,


})(OpenTicketsTable);