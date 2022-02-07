import React, {useEffect, useState} from 'react';
import {
    changeTicketPr,
    changeTicketStatus,
    getCommit,
    getMyOpenTicket,
    getStatusList,
    getTicketsSevenDays, sevenDayFunc, sevenDayNext,
    updateState,

} from "../redux/action/TicketsAction";
import {connect} from "react-redux";
import { useHistory} from "react-router-dom";
import {getText} from "../locales";


const LastDaysTable = (props) => {


    var date = new Date();
    date.setDate(date.getDate() - 7);

    var start_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()

    let end_date = year + "-" + month + "-" + day

    const [currentPage, setcurrentPage] = useState(0);
    const [itemsPerPage, setitemsPerPage] = useState(5);

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(2);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        props.getTicketsSevenDays(start_date, end_date)


    };


    const changePrFunction = (data, values) => {
        props.changeTicketPr(data, values)

    }

    const pages = [];
    for (let i = 1; i <= Math.ceil(props.bot.last_page); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        // if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
            <li
                key={number}
                id={number}
                onClick={handleClick}
                className={props.pageIndex == number ? "active" : null}
            >

                {number}
            </li>
        );
        // } else {
        //     return null;
        // }
    });


    useEffect(() => {
        props.getMyOpenTicket()
        props.getStatusList()
        props.changeTicketStatus()
        props.getTicketsSevenDays(start_date, end_date)

        props.updateState({pActive: null })


    }, [])


    let history = useHistory();
    const changeStatusFunction = (data, values) => {
        props.changeTicketStatus(data, values)

    }

    const visitCommit = (values, events) => {
        props.getCommit(values, history)
    }



    let pagesNumbers = []
    // const [pagesNumbers, setPagesNumbers] = useState([])
    for (let i =0; i < props.bot.last_page; i++) {
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
                    props.bot ? props.bot.data?.map((item, index) => (
                            <tr>
                                <td>
                                    <input type="checkbox"/>
                                </td>
                                <td onClick={() => visitCommit(item.id)} style={{cursor: "pointer"}}
                                    className="requester-name">
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
                        :
                        ""
                }


            </table>

 
               

            {
                props.bot ?  props.bot.last_page > 1 ?
                    <ul className="pageNumbersManual d-flex    ">
                        <li className="arrow" >
                            <button   onClick={() => props.sevenDayFunc(  props.bot?.previous)}><img src="/img/icon/left.svg" alt=""/></button>

                        </li>
                        {
                            pagesNumbers.map(item => (
                                <button className={ "numbers "+ (props.pActive ? props.pActive === item+1 ? "selected" : "" : "")}
                                        onClick={() => props.sevenDayNext(start_date, end_date, item+1)}>
                                    {item + 1}
                                </button>
                            ))
                        }
                        <li className="arrow" >
                            <button onClick={() => props.sevenDayFunc(  props.bot?.next)}><img src="/img/icon/right.svg" alt=""/></button>
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

//

const mapStateToProps = (state) => {
    return {

        getOpenTickets: state.ticketData.getOpenTickets,
        ticketStatusList: state.ticketData.ticketStatusList,
        getLastDaysTickets: state.ticketData.getLastDaysTickets,
        bot: state.ticketData.bot,
        pActive: state.ticketData.pActive,

    }
}

export default connect(mapStateToProps, {
    getMyOpenTicket,
    changeTicketPr,
    sevenDayNext,
    sevenDayFunc,
    updateState,
    getTicketsSevenDays,
    getCommit,
    changeTicketStatus,

    getStatusList
})(LastDaysTable);