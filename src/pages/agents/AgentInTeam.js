import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getActiveTeamList} from "../../redux/action/CreateTeamAction";
import {getAllAgents, getInfoAccount, updateInfoAccount} from "../../redux/action/createAgentAction";
import {getText} from "../../locales";
import {useHistory} from "react-router-dom";

const AgentsInTeam = (props) => {
    const history = useHistory();
    useEffect( ()=>{




        // props.getAllAgents()
        // props.updateInfoAccount()
        // props.getInfoAccount()

    }, [])


    const editOpen =(value)=> {

        props.updateInfoAccount(value, history)
    }


    return (
        <div className='agents-table'>
            <table>
                <thead>

                <tr>
                    <th></th>
                    <th>
                        <button><img src="./img/icon/arrowUpDown.png" alt=""/>{getText("Agents3")}</button>
                    </th>
                    <th>
                        <button><img src="./img/icon/arrowUpDown.png" alt=""/>{getText("Agents9")}</button>
                    </th>
                    <th>
                        <button>
                            {getText("Agents4")}
                        </button>
                    </th>
                </tr>
                </thead>

                <tbody>


                {
                    props.activeAgentslListForTeam ?  props.activeAgentslListForTeam.map(item =>(
                            <tr>

                                <td>
                                    <div className="agents-table-body-account">
                                        <img src={item.image ? item.image : "img/icon/account3.png" } alt=""/>
                                    </div>
                                </td>
                                <td>
                                    <div className="agents-table-body-name">
                                        <h3>{item.full_name}</h3>
                                        <p>{item.email}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="agents-table-body-role">
                                        <span className={item.role === "Admin" ? "agents-role-admin" : item.role === "Agent" ? "agents-role-agents" : "agents-role-viewer "} >{item.role}</span>
                                    </div>
                                </td>
                                <td>

                                    {

                                        props.getAccount.role === "Admin" ?
                                            <button className="agent-team-edit-btn" onClick={() => editOpen(item, props.history)}>
                                                <img src="/img/icon/edit.png" alt=""/>
                                            </button>
                                            :
                                            ''
                                    }

                                </td>
                            </tr>
                        ))
                        :

                        ''
                }




                </tbody>


            </table>
        </div>
    );
};


const mapStateToProps =(state)=>{

    return{
        activeAgentslListForTeam: state.createAgentData.activeAgentslListForTeam,
        getAccount: state.createAgentData.getAccount,

    }
}

export default connect(mapStateToProps, {getAllAgents, getInfoAccount, updateInfoAccount })(AgentsInTeam);