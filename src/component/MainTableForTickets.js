import React, {useEffect, useRef, useState} from 'react';
import {
    changeTicketStatus,
    getCommit,
    getAllTicket,
    getStatusList,
    changeTicketPr,
    AllFunc,
    allNext,
    updateState,
    allNextSearch, getAllTicketFilter, changeCheckPriorty, changeCheckStatus, editAllAgent, getAllTicketSortByDate, getAllTicketFilterWithAgent,
} from "../redux/action/TicketsAction";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {getAllAgents} from "../redux/action/createAgentAction";
import {Modal} from 'reactstrap';
import {AvField, AvForm} from "availity-reactstrap-validation";
import {getActiveTeamList} from "../redux/action/CreateTeamAction";
import {getText} from "../locales";


const MainTableForTickets = (props) => {
    const {
        className
    } = props;
    const [modal, setModal] = useState(false);
    const [check, setCheck] = useState(false);
    const toggle = () => setModal(!modal);
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
    const filterList = (data) => {
        props.getAllTicketFilter(data)
        props.updateState({forSerPagPriority: data})
    }

    const filterListForAgent = (data) => {
        props.getAllTicketFilterWithAgent(data)
        props.updateState({forSerPagPriority: data})
    }

    let pagesNumbers = []
    for (let i = 0; i < props.changeGetTickets2.last_page; i++) {
        pagesNumbers.push(i);
    }
    const removeFilter = () => {
        props.updateState({forSerPagPriority: null})
        props.getAllTicket()
    }
    const [collectState, setCollectState] = useState([])
    const collect = (data, index, e) => {
        if (e.target.checked) {
            collectState.push(data)
        } else {
            const newList = collectState?.filter((item) => item.id !== data.id);
            setCollectState(newList)
        }
    }
    const changePriorty = (priorityId) => {
        props.changeCheckPriorty(collectState, priorityId)
        setCollectState([])
    }
    const changeCheckStatusFunction = (statusId) => {
        props.changeCheckStatus(collectState, statusId)
        setCollectState([])
    }
    const sendAgentsId = (e, value) => {
        props.editAllAgent(collectState, value)
    }
    const checkEl = useRef(null);
    useEffect(() => {
        props.getAllTicket()
        props.getAllAgents()
        props.getStatusList()
        props.getCommit()
        props.updateState({forSerPagPriority: null})
        props.getActiveTeamList()
        props.getAllTicketSortByDate()
        props.changeTicketStatus()

    }, [])
    const selectTeam = (data) => {
        props.updateState({getAllAgentsList: props.activeAgentslList.filter(item => item.id == data.target.value)[0].agents})
    }
    const allChecked = (data) => {
        setCheck(!check)
        if (check) {
            setCollectState(data)
        } else {
            setCollectState([])
        }
    }
    const withData = () => {
        let startDate = document.getElementById("startDate").value
        let endDate = document.getElementById("endDate").value
        if (startDate !== "" && endDate !== "") {
            props.getAllTicketSortByDate(startDate, endDate)
        } else {
            props.getAllTicket()
        }
    }

    return (
        <div className='main-table-for-tickets'>
            <div className="main-table-filter">
                <div className="row flex-nowrap ">

                    <div className="w-75">
                        <div className="dropdown  mb-3 ">
                            <button className="all-tickets-event dropbtn add-filter pl-3">
                                {getText("SubNavbarMenu")}
                                <img src="/img/icon/arrow.png" alt=""/>
                            </button>
                            <div className="all-tickets-event-menu dropdown-content">
                                {
                                    props.ticketStatusList.map(item2 => (
                                        <button
                                            onClick={() => changeCheckStatusFunction(item2.id)}>{item2.name}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="all-tickets-event dropbtn add-filter pl-3 ml-3">
                                {getText("SubNavbarMenu2")}
                                <img src="/img/icon/arrow.png" alt=""/>
                            </button>
                            <div className="all-tickets-event-menu dropdown-content">
                                <button onClick={() => changePriorty(2)}>
                                    <img src="/img/icon/fast.png"
                                         className="mr-2"
                                         alt=""/> {getText("SubNavbarMenu10")}
                                </button>
                                <button onClick={() => changePriorty(1)}><img src="/img/icon/open.png"
                                                                              className="mr-2"
                                                                              alt=""/> {getText("SubNavbarMenu11")}
                                </button>
                                <button onClick={() => changePriorty(0)}><img src="/img/icon/onHold.png"
                                                                              className="mr-2"
                                                                              alt=""/> {getText("SubNavbarMenu12")}
                                </button>
                                <button onClick={() => changePriorty(-1)}><img src="/img/icon/close.png"
                                                                               className="mr-2"
                                                                               alt=""/> {getText("SubNavbarMenu13")}
                                </button>
                                <button onClick={() => changePriorty(-2)}><img src="/img/icon/pw.png"
                                                                               className="mr-2"
                                                                               alt=""/> {getText("SubNavbarMenu14")}
                                </button>
                            </div>
                        </div>
                        <button className="all-tickets-event dropbtn add-filter pl-4 ml-3 pt-2  pr-4"
                                onClick={() => toggle()}> {getText("SubNavbarMenu3")}</button>
                        <div className="dropdown">
                            <input id="startDate" onChange={withData} className="date-picker-simple ml-3" type="date"/>
                            <input id="endDate" onChange={withData} className="date-picker-simple ml-3 mr-2" type="date"/>
                        </div>



                        <div className="dropdown">
                            <button className="all-tickets-event dropbtn add-filter ">
                                <img src="/img/icon/filt.svg" alt=""/>
                                {getText("SubNavbarMenu7")}
                                <img src="/img/icon/arrow.png" alt=""/>
                            </button>
                            <div className="all-tickets-event-menu dropdown-content" style={{width: "200px"}}>

                                {
                                    props.getAllAgentsList?.map(item => (
                                        <button onClick={() => filterListForAgent(item.email)}>
                                            {item.full_name}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                    <div className="d-flex position-relative  w-25">
                        <div className="d-flex position-absolute" style={{right: "10px", top: "5px"}}>

                            {

                                props.forSerPagPriority === 2 ?
                                    <button onClick={() => removeFilter()}
                                            className="prFilter">{getText("SubNavbarMenu10")}<img
                                        src="/img/icon/x.svg" alt=""/></button>
                                    : props.forSerPagPriority === 1 ?
                                    <button onClick={() => removeFilter()}
                                            className="prFilter">{getText("SubNavbarMenu11")} <img
                                        src="/img/icon/x.svg" alt=""/></button>
                                    : props.forSerPagPriority === 0 ?
                                        <button onClick={() => removeFilter()}
                                                className="prFilter">{getText("SubNavbarMenu12")} <img
                                            src="/img/icon/x.svg" alt=""/></button>
                                        : props.forSerPagPriority === -1 ?
                                            <button onClick={() => removeFilter()}
                                                    className="prFilter">{getText("SubNavbarMenu13")} <img
                                                src="/img/icon/x.svg" alt=""/></button>
                                            : props.forSerPagPriority === -2 ?
                                                <button onClick={() => removeFilter()}
                                                        className="prFilter">{getText("SubNavbarMenu14")}<img
                                                    src="/img/icon/x.svg" alt=""/></button>


                                                :
                                                ''
                            }
                        </div>
                        <div className="dropdown">
                            <button className="all-tickets-event dropbtn add-filter ">
                                <img src="/img/icon/filt.svg" alt=""/>
                                {getText("SubNavbarMenu4")}

                                <img src="/img/icon/arrow.png" alt=""/>
                            </button>
                            <div className="all-tickets-event-menu dropdown-content">
                                {/*<img src="/img/icon/Divider.png" alt=""/>*/}
                                <button onClick={() => filterList(2)}>
                                    <img src="/img/icon/fast.png"
                                         className="mr-2"
                                         alt=""/> {getText("SubNavbarMenu10")}
                                </button>
                                <button onClick={() => filterList(1)}><img src="/img/icon/open.png"
                                                                           className="mr-2"
                                                                           alt=""/> {getText("SubNavbarMenu11")}
                                </button>
                                <button onClick={() => filterList(0)}><img src="/img/icon/onHold.png"
                                                                           className="mr-2"
                                                                           alt=""/>{getText("SubNavbarMenu12")}
                                </button>
                                <button onClick={() => filterList(-1)}><img src="/img/icon/close.png"
                                                                            className="mr-2"
                                                                            alt=""/> {getText("SubNavbarMenu13")}
                                </button>
                                <button onClick={() => filterList(-2)}><img src="/img/icon/pw.png"
                                                                            className="mr-2"
                                                                            alt=""/> {getText("SubNavbarMenu14")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                <tr className="main-table-header">
                    <th></th>
                    <th>
                        {getText("SubNavbarMenu5")}
                    </th>
                    <th>
                        {getText("SubNavbarMenu0")}
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

                </thead>
                <tbody>
                {

                    props.changeGetTickets2.data?.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input ref={checkEl} onClick={(e) => collect(item, index, e)} type="checkbox"/>
                                </td>
                                <td className="requester-name" onClick={() => visitCommit(item.id)}
                                    style={{cursor: "pointer"}}>
                                    <h4>{item.client_full_name}</h4>
                                    <span>{item.sender_name}</span>
                                </td>
                                <td>
                                    {item.client_phone_number}
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
                            </tr>
                        )
                    )
                }

                </tbody>
            </table>
            {
                props.changeGetTickets2 ? props.changeGetTickets2.last_page > 1 ?
                    <ul className="pageNumbersManual d-flex    ">
                        <li className="arrow">
                            <button onClick={() => props.AllFunc(props.changeGetTickets2?.previous)}><img
                                src="/img/icon/left.svg" alt=""/></button>
                        </li>
                        {
                            props.forSerPag ?
                                pagesNumbers.map(item => (
                                    <button
                                        className={"numbers" + (props.pActive ? props.pActive === item + 1 ? " selected" : " " : "")}
                                        onClick={() => props.allNextSearch(item + 1, props.forSerPagfilter, props.forSerPagPriority)}>
                                        {item + 1}
                                    </button>
                                ))
                                :
                                pagesNumbers.map(item => (
                                    <button
                                        className={"numbers" + (props.pActive ? props.pActive === item + 1 ? " selected" : " " : "")}
                                        onClick={() => props.allNext(item + 1, props.forSerPagfilter)}>
                                        {item + 1}
                                    </button>
                                ))
                        }
                        <li className="arrow">
                            <button onClick={() => props.AllFunc(props.changeGetTickets2?.next)}><img
                                src="/img/icon/right.svg" alt=""/></button>
                        </li>
                    </ul>
                    :
                    ""
                    :
                    ""
            }
            <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>

                <div className="p-5 changeAgentDiv">
                    <AvForm onValidSubmit={sendAgentsId}>
                        <button onClick={() => setModal(!modal)} className="close ">&#x2715;</button>
                        <h3>{getText("Agents7")}</h3>
                        <AvField onChange={selectTeam} className="form-control" type="select" name='team'>

                            <option value="0" hidden></option>

                            {
                                props.activeAgentslList.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }


                            {/*<MultiSelectComponent  id="mtselement" fields={fields} dataSource={posts}*/}
                            {/*                      placeholder="Select a team"/>*/}

                        </AvField>

                        <h3 className="pt-3">{getText("Commit7")}</h3>
                        <AvField name="receiver" className="form-control" type="select">


                            <option value="0" hidden></option>
                            {
                                props.getAllAgentsList.map(item => (
                                    <option value={item.id}>{item.full_name}</option>
                                ))
                            }


                        </AvField>


                        <div className="w-100 d-flex justify-content-end mt-5">
                            <button className="changeAgentBtn" onClick={() => setModal(!modal)}>Change agent</button>

                        </div>

                    </AvForm>
                </div>
            </Modal>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        getTickets: state.ticketData.getTickets,
        getTickets2: state.ticketData.getTickets2,
        changeGetTickets2: state.ticketData.changeGetTickets2,
        getTicketsSearch: state.ticketData.getTicketsSearch,
        AllCount: state.ticketData.AllCount,
        ticketStatusList: state.ticketData.ticketStatusList,
        pageIndex: state.ticketData.pageIndex,
        pActive: state.ticketData.pActive,
        forSerPag: state.ticketData.forSerPag,
        forSerPagfilter: state.ticketData.forSerPagfilter,
        forSerPagPriority: state.ticketData.forSerPagPriority,
        getAllAgentsList: state.createAgentData.getAllAgentsList,
        activeAgentslList: state.createTeamData.activeAgentslList,
    }
}

export default connect(mapStateToProps, {
    getAllTicket,
    changeTicketPr,
    getAllAgents,
    changeCheckPriorty,
    changeCheckStatus,
    getCommit,
    getAllTicketFilter,
    AllFunc,
    allNext,
    getActiveTeamList,
    editAllAgent,
    getAllTicketSortByDate,
    allNextSearch,
    changeTicketStatus,
    getStatusList,
    updateState,
    getAllTicketFilterWithAgent
})(MainTableForTickets);
