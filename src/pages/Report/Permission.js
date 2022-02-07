import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getCountPermissions} from "../../redux/action/CreateTeamAction";
import {createTeamReducer} from "../../redux/reducer/createTeamReducer";

const Permission = (props) => {

    useEffect(()=>{
        props.getCountPermissions()
    }, [])
    return (
        <div className="permission-pair">
            <h3>Permission</h3>

            <div className="title-per">
                <span>Permissions</span>
                <span>Users</span>
            </div>


            <div className="title-con">
                <div className="title-con-item">
                    <h4><span><img src="/img/icon/AdminIcon.png" alt="img"/></span>Admin</h4>
                    <h4>{props.adminCount ? props.adminCount : "0"}</h4>
                </div>

                <div className="title-con-item">
                    <h4><span><img src="/img/icon/AgentsIcon.png" alt="img"/></span>Agents</h4>
                    <h4>{props.agentCount ? props.agentCount : "0"}</h4>
                </div>


                <div className="title-con-item">
                    <h4><span><img src="/img/icon/ViewerIcon.png" alt="img"/></span>Viewer</h4>
                    <h4>{props.viewerCount ? props.viewerCount : "0"}</h4>
                </div>

            </div>
        </div>

    );
};

const mapStateToProps =(state)=>{
    return{
        adminCount: state.createTeamData.adminCount,
        agentCount: state.createTeamData.agentCount,
        viewerCount: state.createTeamData.viewerCount,
    }
}
export default connect(mapStateToProps, {getCountPermissions})(Permission);