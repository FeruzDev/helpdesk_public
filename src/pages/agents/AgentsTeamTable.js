import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getActiveTeamList, updateState} from "../../redux/action/CreateTeamAction";
import {Link, match} from "react-router-dom";
import {Modal, ModalBody} from "reactstrap";
import {getText} from "../../locales";
import {getAllAgents} from "../../redux/action/createAgentAction";
import AgentsTable from "./AgentsTable";
import AgentsInTeam from "./AgentInTeam";

const AgentsTeamTable = (props) => {

    const [teamName, setTeamName] = useState("")

    useEffect( ()=>{
        props.getActiveTeamList()
        props.getAllAgents()


    }, [])

    const teamTableView =()=>{
        props.updateState({editModal: !props.editModal})
    }

    const OpenModal =(data)=>{
        props.updateState({agentListModal: !props.agentListModal})


        props.updateState({activeAgentslListForTeam: props.activeAgentslList.filter(item => item.id == data.id)[0].agents})


        setTeamName(data.name)
    }

    return (
        <div className='agents-team-table'>
            <table>
                <thead>

                <tr>
                    <th></th>
                    <th>
                        <button><img src="./img/icon/arrowUpDown.png" alt=""/>{getText("Agents3")}</button>
                    </th>
                    <th>
                        <button><img src="./img/icon/arrowUpDown.png" alt=""/>{getText("Agents")}</button>
                    </th>

                    <th>

                    </th>
                </tr>
                </thead>

                <tbody>

                {
                    props.activeAgentslList ?  props.activeAgentslList.map(item =>(
                        <tr>

                            <td>
                                <div className="agents-table-body-account">
                                    <img src="/img/icon/account3.png" alt="account"/>
                                </div>
                            </td>
                            <td>
                                <div className="agents-table-body-name">
                                    <h3>{item.name}</h3>
                                    <p>{item.agents_count ? item.agents_count : "0"} {getText("Agents")} </p>
                                </div>
                            </td>
                            <td>
                                <div className="agents-table-body-role">
                                    <img src="/img/icon/account3.png" alt="account"/>
                                    <img src="/img/icon/account3.png" alt="account"/>
                                    <img src="/img/icon/account3.png" alt="account"/>
                                    <img src="/img/icon/account3.png" alt="account"/>

                                    <span  >+20 {getText("Agents13")}</span>
                                </div>
                            </td>
                            

                            <td>
                                <button onClick={() => OpenModal(item)} className="agent-team-edit-btn">
                                    <img src="/img/icon/edit.png" alt=""/>
                                </button>


                            </td>
                        </tr>

                    ))
                        :
                        ""
                }

                </tbody>


            </table>







            <Modal isOpen={props.agentListModal} fade={false}  >


                <div className="d-flex justify-content-between align-items-center mt-4 mb-0 pb-0 pl-4 pr-4">
                    <h3 className="font-weight-bold ">{teamName}</h3>
                    <button onClick={() => props.updateState({agentListModal: !props.agentListModal})} className="close  ">&#x2715;</button>
                </div>

                <div className="pr-4 pl-4 pb-4 pt-0">


                    <AgentsInTeam history={props.history}/>
                </div>
            </Modal>

        </div>

    );
};


const mapStateToProps =(state)=>{

    return{
        activeAgentslList: state.createTeamData.activeAgentslList,
        activeAgentslListForTeam: state.createTeamData.activeAgentslListForTeam,
        agentListModal: state.createTeamData.agentListModal,
        getAllAgentsList: state.createAgentData.getAllAgentsList,


    }
}

export default connect(mapStateToProps, {getActiveTeamList,getAllAgents, updateState})(AgentsTeamTable);

