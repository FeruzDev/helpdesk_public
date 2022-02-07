import React, {useEffect, useState} from 'react';
import AllTicketsNavbar from "../component/AllTicketsNavbar";
import AgentsTable from "./agents/AgentsTable";
import AgentsTeamTable from "./agents/AgentsTeamTable";
import AgentsDetails from "./agents/AgentsDetails";
import {Link} from "react-router-dom";
import AccountNavbar from "../component/AccountNavbar";
import SubNavbarMenu from "../component/SubNavbarMenu";
import SideBar from "../component/SideBar";
import {getActiveTeamList, getActiveTeamListCountFunction} from "../redux/action/CreateTeamAction";
import {connect} from "react-redux";
import {getAllAgentsListCount, getAllAgentsListCountFunction} from "../redux/action/createAgentAction";
import {getText} from "../locales";

const Agents = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleOnClick = index => {
        setActiveIndex({index});
    };




    useEffect(() =>{

        props.getAllAgentsListCountFunction()
        props.getActiveTeamListCountFunction()
    }, [])



    return (


        <div className=' d-flex w-100'>



            <div className="agents  ">
               <div className="w-100">
                   <div className="all-tickets-navbar">

                       <div className="all-tickets-navbar-child">
                           <h1>{getText("Agents")}</h1>
                           <AccountNavbar />
                       </div>
                   </div>



                   <div className="d-flex w-100 h-100">

                       <div className='  agents-nav-tabs'>

                           <ul className="nav nav-tabs" role="tablist">

                               <li className="nav-item active">
                                   <a className="nav-link2  " data-toggle="tab" href="#tabs-1" role="tab"><span>{getText("Agents")}</span>
                                       <span>{props.getAllAgentsListCount}</span></a>
                               </li>
                               <li className="nav-item">
                                   <a className="nav-link2" data-toggle="tab" href="#tabs-2" role="tab"><span>{getText("Agents7")}</span>
                                       <span>{props.activeAgentslListCount}</span></a>
                               </li>


                               <div className='nav-tabs-right-control'>

                                   <div>
                                       <img src="/img/icon/loupe.png" className="search-loupe" alt=""/>
                                       <input type="text" placeholder={getText("Search") + "..."}/>
                                   </div>

                                   <div className="dropdown show dropdown-add-role">
                                       <a className="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                           <img src="/img/icon/plus.png" alt=""/> {getText("Agents8")}
                                       </a>

                                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                                           <Link to='/agents/create-agent' className="dropdown-item" href="#"> <img src="./img/icon/userplus.png" alt=""/><span>{getText("Agents6")}</span></Link>
                                           <Link to='/agents/create-team' className="dropdown-item" href="#"> <img src="./img/icon/users.png" alt=""/><span>{getText("Agents12")}</span></Link>
                                       </div>
                                   </div>

                               </div>
                               <div>

                               </div>


                           </ul>
                           <div className="tab-content">
                               <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                   <AgentsTable history={props.history}/>
                               </div>
                               <div className="tab-pane" id="tabs-2" role="tabpanel">
                                   <AgentsTeamTable/>
                               </div>

                           </div>
                       </div>


                       <AgentsDetails/>
                   </div>
               </div>
            </div>
        </div>
    );
};
const mapStateToProps =(state)=>{

    return{

        activeAgentslList: state.createTeamData.activeAgentslList,
        activeAgentslListCount: state.createTeamData.activeAgentslListCount,
        getAllAgentsListCount: state.createAgentData.getAllAgentsListCount,

    }
}
export default connect(mapStateToProps, {getActiveTeamList, getAllAgentsListCountFunction, getActiveTeamListCountFunction})(Agents) ;