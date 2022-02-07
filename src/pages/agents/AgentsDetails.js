import React, {useEffect} from 'react';
import {getInfoAccount} from "../../redux/action/createAgentAction";
import {connect} from "react-redux";
import {getActiveTeamList} from "../../redux/action/CreateTeamAction";
import {getText} from "../../locales";

const AgentsDetails = (props) => {


    useEffect(()=>{
        // props.getInfoAccount()
        props.getActiveTeamList()
    }, [])

    return (
        <div className="agents-details">
            <div className="agents-details-headers d-flex justify-content-between">
                <h2> {getText("Agents5")}</h2>
                {/*<NavLink to='agents/info-account' className="d-flex">*/}

                {/*    <img src="/img/icon/edit.png" alt="edit"/>Edit*/}
                {/*</NavLink>*/}
            </div>

            <div className="agents-details-body">
                <div className="account-img">
                    <img src={props.getAccount.image ?  props.getAccount.image : "/img/icon/account2.png"} alt="account"/>
                    <span>{props.getAccount.role_name


                    }</span>
                </div>

                <h3>{props.getAccount.full_name}</h3>
                <p>{props.getAccount.email}</p>



                <button>
                    <img src="/img/icon/arrow.png" alt="omg"/>
                    {getText("Agents7")}
                </button>


                <div className="team-list">


                    {
                        props.activeAgentslList
                        ?
                        props.activeAgentslList.slice(0, 4).map(item=>(
                            <h4><img src="/img/icon/account3.png"/>{item.name}</h4>

                        ))
                            :
                            ""
                    }




                </div>
            </div>

        </div>
    );
};

const mapStateToProps =(state)=>{
    return {
        getAccount: state.createAgentData.getAccount,
        activeAgentslList: state.createTeamData.activeAgentslList,

    }
}

export default connect(mapStateToProps, {getInfoAccount, getActiveTeamList})(AgentsDetails) ;