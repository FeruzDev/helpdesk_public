import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {topAgents} from "../../redux/action/createAgentAction";

const Priority = (props) => {

    useEffect(()=>{
        props.topAgents()
    }, [])
    return (
        <div className="priority-pair">

            <h3>Top agents</h3>


            <div className="  top-title">
                <h5>Fulll name</h5>
                <h5>Closed tickets</h5>
            </div>

            <div className="top-users">

                {

                    props.topUsers?.map( item =>
                    <div className="users-list">
                          <img src={item.image ? item.image  :  "/img/icon/account.png"} alt=""/>

                        <div>
                            <h4>{item.full_name}</h4>
                            <h6>{item.closed_tickets}</h6>
                        </div>
                    </div>
                    )
                }
            </div>


        </div>
    );
};

const mapStateToProps =(state)=>{
    return{
        topUsers: state.createAgentData.topUsers
    }
}
export default connect(mapStateToProps, {topAgents})(Priority) ;