import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getActiveTeamList} from "../../redux/action/CreateTeamAction";
import {getAllAgents, getInfoAccount, updateInfoAccount} from "../../redux/action/createAgentAction";
import {getText} from "../../locales";
import {getAllTicketForId} from "../../redux/action/TicketsAction";

const AgentsTable = (props) => {

    useEffect( ()=>{



        props.getAllAgents()
        // props.updateInfoAccount()
        // props.getInfoAccount()

    }, [])


    const editOpen =(value)=> {
        props.getAllTicketForId(value.email)

        props.updateInfoAccount(value, props.history)
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
                   props.getAllAgentsList ?  props.getAllAgentsList.map(item =>(
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
                                   <span className={item.role_name === "Admin" ? "agents-role-admin" : item.role_name === "Agent" ? "agents-role-agents" : "agents-role-viewer "} >{item.role_name}</span>
                               </div>
                           </td>
                           <td>

                               {

                                   props.getAccount.role_name === "Admin" ?
                                       <button className="agent-team-edit-btn" onClick={() => editOpen(item)}>
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
        getAllAgentsList: state.createAgentData.getAllAgentsList,
        getAccount: state.createAgentData.getAccount,

    }
}

export default connect(mapStateToProps, {getAllAgents, getInfoAccount,getAllTicketForId, updateInfoAccount })(AgentsTable);