import React, {useEffect, useRef, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import AccountNavbar from "../../component/AccountNavbar";
import {connect} from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom"
import {getCommit, sendCommit, ticketInfo} from "../../redux/action/TicketsAction";
import {getInfoAccount} from "../../redux/action/createAgentAction";
import {AvForm, AvField} from "availity-reactstrap-validation"
import TicketInfoRightPair from "./TicketInfoRightPair";
import {getText} from "../../locales";
const Commit = (props) => {


    var url = document.URL

 const last  =  url.substr(url.lastIndexOf('/') + 1) ;


    useEffect(()=>{


        // props.getInfoAccount()
        props.ticketInfo()

        props.getCommit(last )


        window.scrollTo(0, 0)



    }, [])

    const inputRef = useRef()

    const handleClick= () => {
        inputRef.current.value = "";
        return ""

    }

    const sendMessage =(event, values)=>{
        props.sendCommit(values , props.ticketInfoObject.id )
        props.ticketInfo()
        // handleClick()
        //




    }



    let history = useHistory();

    return (
        <div className="commit w-100 ">
            <div className="all-tickets-navbar bg-white">

                <div className="all-tickets-navbar-child">
                    <button onClick={() => history.goBack()}  className='bg-transparent arrow-left-back'><img src="/img/icon/arrowleft.png" alt="back img"/>{getText("NewTicket11")}</button>
                    <h1>
                        {props.ticketInfoObject.subject  }  <Link to="/tickets/new-ticket-update"  className="ml-3 mb-1">
                         {  props.ticketInfoObject.sender === props.getAccount.id ?
                             <img src="/img/icon/edit.png" alt=""/> : ""
                         }
                    </Link>
                        </h1>
                    <AccountNavbar/>
                </div>
            </div>
            <div className="commit-main-pair">
                <div className="commit-body "    >
                    <div  className="commit-list-items    "  >
                        <ScrollToBottom className="commit-list-last-child">
                            <div className="ticket-subject">
                                <p><b>{props.ticketInfoObject.client_full_name}:</b> {props.ticketInfoObject.content}</p>
                                <span> <b>{props.ticketInfoObject?.date_created?.slice(11, 16)}</b></span>    <span className="ml-1">{props.ticketInfoObject?.date_created?.slice(0, 10)}</span>
                            </div>
                            {
                                props.commitList.map(item =>
                                    (
                                        <div className={ props.getAccount.id  === item.agent ? "receiver fath-com" : "sender fath-com"}>
                                            <div className="commit-big-box " >
                                                <img src="/img/icon/account2.png" alt=""/>
                                                <div className="commit-content">
                                                    <h3>{item.agent_name}</h3>
                                                    <p>{item.message}</p>
                                                </div>
                                                <span className="text-right">
                                                   <b> {item.date_created.slice(11, 16)}</b> <br/>
                                                    {item.date_created.slice(0, 10)}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </ScrollToBottom>
                        <div className="text-box-for-send">
                            <span className="my-placeholder">{getText("Commit9")}</span>
                            <AvForm onValidSubmit={sendMessage}>
                                <AvField id="textContent"  name="message" ref={inputRef} type="textarea"/>
                                <button className="btn">
                                    {getText("Commit10")}
                                    <img src="/img/icon/rightArrow.png" alt=""/>
                                </button>
                            </AvForm>
                        </div>
                    </div >
                </div>
                <div className="commit-info">
                    <TicketInfoRightPair/>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps =(state)=>{
    return{
        commitList: state.ticketData.commitList,
        selectedCommitId: state.ticketData.selectedCommitId,
        getAccount: state.createAgentData.getAccount,
        ticketInfoObject: state.ticketData.ticketInfoObject,
    }
}
export default connect(mapStateToProps, {getCommit, ticketInfo,  sendCommit,getInfoAccount})(Commit);