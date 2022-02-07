import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {
    filterStatusFunction,
    getAllTicket, getAllTicketForSearch,
    getAllTicketToHandle,
    getMyOpenTicket,
    getStatusList, getTicketsSevenDays, updateState
} from "../redux/action/TicketsAction";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import {getText} from "../locales";


const SideBarMenus = (props) => {


    var date = new Date();
    date.setDate(date.getDate() - 7);

    var finalDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let today = year + "-" + month + "-" + day
    const [pathSearch , setPathSearch] = useState(false)
    const [pathSearch2 , setPathSearch2] = useState(false)

    useEffect(() => {
        props.getStatusList()
        props.getMyOpenTicket()
        props.getAllTicketToHandle()
        props.getAllTicket()
        props.getTicketsSevenDays(finalDate, today)
        setPathSearch( window.location.pathname == "/tickets/all-tickets" ? true : false)
        setPathSearch2( window.location.pathname == "/tickets" ? true : false)
    },  [])

    const filterByStatus = (data) => {

        props.filterStatusFunction(data)

    }
    const getAllStatusList = () => {
        props.getAllTicket()
    }
    const searchTicket = (e) => {
        props.updateState({forSerPagfilter: e.target.value})


        e.target.value > 0 ?

            props.updateState({forSerPag: true})
            :
            props.updateState({forSerPag: false})

        axios.get("http://w1.citynet.uz:4440/ticket/v1/list/?q=" + e.target.value , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                props.updateState({changeGetTickets2: res.data})



            })
    }
    return (
        <div className="side-bar-menus">
            <div className="side-bar-menus-child">
                <h1 className="open-sans-extra-bold">{getText("SideBarMenus")}</h1>
                <Link to='/tickets/new-ticket' className="new-ticket open-sans-extra-bold">
                    <img src="/img/icon/plus.png" alt="plus icon"/>
                    {getText("SideBarMenus2")}
                </Link>
                {
                    (pathSearch || pathSearch2 )?
                        <div className="ticket-search "  >
                        <img src="/img/icon/loupe.png" alt=""/>
                        <input    id="search" type="text"  onChange={searchTicket} placeholder={getText("Search") + "..."}/>
                       </div>
                        :
                        <div className="ticket-search "  >
                            <img src="/img/icon/loupe.png" alt=""/>
                            <input    id="search" type="text"  disabled onChange={searchTicket} placeholder={getText("Search") + "..."}/>
                        </div>
                }
                <div className="menus">
                    <Link to="/tickets/all-tickets" className="    w-100">
                        <button onClick={() => getAllStatusList()} className=" p-0 "><span>{getText("SideBarMenus3")}</span>
                            <span className="">
                            {
                                props.AllCount.count
                            }
                        </span></button>

                    </Link>


                    <div className="ml-4 status-style">
                        {
                            props.ticketStatusList.map(item => (
                                <Link /* onClick={() => filterByStatus(item.name)}*/ to={"/tickets/filter/" + item.name}><span>{item.name}</span></Link>

                            ))
                        }
                    </div>
                    <Link to="/tickets/tickets-to-handle"  >
                        <span>{getText("SideBarMenus7")}</span><span>
                        {
                            props.btc.count

                        }
                    </span></Link>
                    <Link to="/tickets/open-tickets"><span>{getText("SideBarMenus8")}</span><span>
                          {
                              props.boc.count
                          }
                    </span></Link>

                    <Link to="/tickets/last-days"><span>{getText("SideBarMenus9")}</span><span>
                          {
                              props.bot.count
                          }
                    </span></Link>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        ticketStatusList: state.ticketData.ticketStatusList,
        btc: state.ticketData.btc,
        boc: state.ticketData.boc,
        bot: state.ticketData.bot,
        AllCount: state.ticketData.AllCount,
        getTicketsToHandle: state.ticketData.getTicketsToHandle,
        getOpenTickets: state.ticketData.getOpenTickets,
        openCount: state.ticketData.openCount,
        PendingCount: state.ticketData.PendingCount,
        ClosedCount: state.ticketData.ClosedCount,
        getTickets: state.ticketData.getTickets,
        getTickets2: state.ticketData.getTickets2,
        changeGetTickets2: state.ticketData.changeGetTickets2,
        forSerPag: state.ticketData.forSerPag,
    }
}
export default connect(mapStateToProps, {
    getStatusList,
    getTicketsSevenDays,
    getAllTicketToHandle,
    updateState,
    getAllTicketForSearch,
    getMyOpenTicket,
    getAllTicket,
    filterStatusFunction
})(SideBarMenus);