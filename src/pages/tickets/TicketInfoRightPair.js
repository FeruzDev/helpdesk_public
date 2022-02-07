import React, {useEffect} from 'react';
import {
    changeTicketStatus,
    createTIcket, editTicketReciever,
    getStatusList,
    ticketInfo,
    updateState
} from "../../redux/action/TicketsAction";
import {connect} from "react-redux";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {getAllAgents} from "../../redux/action/createAgentAction";
import {getActiveTeamList} from "../../redux/action/CreateTeamAction";
import {getText} from "../../locales";

const TicketInfoRightPair = (props) => {

    useEffect(() => {
        props.ticketInfo(window.location.pathname.split("/").pop())
        props.changeTicketStatus()
        props.getStatusList()
        props.getActiveTeamList()
        props.getAllAgents()

    }, [])

    const changeStatusFunction = (data, values) => {
        props.changeTicketStatus(data, values)

    }


    const selectTeam = (data) => {
        // props.updateState({selectTeamReducer: data})
        // console.log(data.target.value)
        // console.log(props.getAllAgentsList)
        // console.log(props.activeAgentslList)
        props.updateState({getAllAgentsList: props.activeAgentslList.filter(item => item.id == data.target.value)[0].agents})

        // props.activeAgentslList.filter(item => )
    }


    const ticketEditAgent =(receiver)=>{
        props.ticketInfo(window.location.pathname.split("/").pop())

        props.editTicketReciever(props.ticketInfoObject.id, receiver)
    }

    return (
        <div className="ticket-info-right-pair">


            <div className="ticket-info-right-pair-header">
                <h2>{getText("Agents5")}</h2>

                <div className="ticket-drp">
                    <button className=" ticket-dropbtn">
                        <img src="/img/icon/verDots.png" alt=""/>
                    </button>

                    <div className=" ticket-dropdown-content">
                        {

                            props.ticketStatusList.map(item2 => (
                                <button
                                    onClick={() => changeStatusFunction(props.ticketInfoObject.id, item2.id)}>{item2.name}</button>
                            ))
                        }
                    </div>
                </div>

            </div>
            <div className="ticket-info-right-pair-body">

                <h2>{getText("Commit2")}</h2>

                <div className="row">
                    <div className="col-6">
                        <h5>
                            {getText("Commit3")}
                        </h5>
                    </div>
                    <div className="col-6">
                        <h6>ticketid/
                            {
                                props.ticketInfoObject.id
                            }
                        </h6>
                    </div>
                    <div className="col-6">
                        <h5>
                            {getText("Commit11")}:
                        </h5>
                    </div>
                    <div className="col-6">
                        <h6>
                            {
                                props.ticketInfoObject.date_created?.slice(0, 10)

                            }
                            <span>

                                 {

                                     "/" +
                                     props.ticketInfoObject.date_created?.slice(11, 16)

                                 }
                            </span>
                        </h6>
                    </div>
                    <div className="col-6">
                        <h5>
                            {getText("SubNavbarMenu9")}:
                        </h5>
                    </div>
                    <div className="col-6">
                        <h6>
                            {
                                props.ticketInfoObject.date_modified?.slice(0, 10)
                            }

                            <span>
                                {
                                    "/" +
                                    props.ticketInfoObject.date_modified?.slice(11, 16)

                                }
                            </span>
                        </h6>
                    </div>
                    <div className="col-6">
                        <h5>
                            {getText("SubNavbarMenu8")}:
                        </h5>
                    </div>
                    <div className="col-6">
                        <h6>
                            {
                                props.ticketInfoObject.ticket_status_name
                            }
                        </h6>
                    </div>
                    <div className="col-6">
                        <h5>
                            {getText("Commit4")}:
                        </h5>
                    </div>
                    <div className="col-6">
                        <h6>
                            {getText("Commit12")}:

                        </h6>
                    </div>
                    <div className="col-6">
                        <h5>

                            {getText("NewTicket8")}:

                        </h5>
                    </div>
                    <div className="col-6">
                        <h6>
                            {
                                props.ticketInfoObject.from_where
                            }
                        </h6>
                    </div>
                    <div className="col-6">
                        <h5>
                            {getText("Commit5")}:

                        </h5>
                    </div>
                    <div className="col-6">
                        <h6>
                            {getText("Commit13")}:

                        </h6>
                    </div>
                </div>


                <img src="/img/Border.png" className="w-100 mt-3" alt=""/>


                <div className="ticket-responsibility mt-3">
                    <h2 className="mb-5">{getText("Commit6")}</h2>

                    <AvForm>
                        <h3>{getText("Agents7")}</h3>
                        <AvField onChange={selectTeam} type="select"   name='team'  >

                            <option value="0" hidden > </option>

                            {
                                props.activeAgentslList.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }

                        </AvField>

                        <h3>{getText("Commit7")}</h3>
                        <AvField onChange={(e) => ticketEditAgent(e.target.value)}     name="receiver" type="select"    >


                            <option value="0" hidden ></option>
                            {
                                props.getAllAgentsList.map(item => (
                                    <option value={item.id}>{item.full_name}</option>
                                ))
                            }


                        </AvField>
                    </AvForm>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <h3>{getText("Commit8")}</h3>
                            {/*<span className="change">Change</span>*/}
                        </div>

                        <div className="ticket-team-info col-12  ">
                            <img src="/img/icon/account3.png" className="mr-3" alt=""/>
                            <span className="team-name">{props.ticketInfoObject.sender_name}</span>
                        </div>
                    </div>


                    <div className="multi-select22">




                    </div>

                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ticketInfoObject: state.ticketData.ticketInfoObject,
        ticketStatusList: state.ticketData.ticketStatusList,
        activeAgentslList: state.createTeamData.activeAgentslList,
        getAllAgentsList: state.createAgentData.getAllAgentsList,
    }
}
export default connect(mapStateToProps, {
    ticketInfo,
    getStatusList,
    getAllAgents,
    updateState,
    getActiveTeamList,
    editTicketReciever,
    changeTicketStatus
})(TicketInfoRightPair);