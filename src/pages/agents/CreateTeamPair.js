import React, {useEffect} from 'react';
import AllTicketsNavbar from "../../component/AllTicketsNavbar";
import {Link, useHistory} from "react-router-dom";
import AccountNavbar from "../../component/AccountNavbar";
import {MultiSelectComponent} from '@syncfusion/ej2-react-dropdowns';
import {AvForm, AvField} from "availity-reactstrap-validation"
import {CustomInput} from "reactstrap";
import {connect} from "react-redux";
import {createTeam} from "../../redux/action/CreateTeamAction";
import {getText} from "../../locales";


const CreateTeamPair = (props) => {

    const createTeamFunction =(event, values)=>{
        props.createTeam(values, props.history)
    }
    let history = useHistory();

    return (
        <div className='create-team-pair'>
            <div className="all-tickets-navbar">

                <div className="all-tickets-navbar-child">
                    <button onClick={() => history.goBack()}  className='bg-transparent arrow-left-back'><img src="/img/icon/arrowleft.png" alt="back img"/>{getText("NewTicket11")}</button>
                    <h1>{getText("Agents12")}</h1>
                    <AccountNavbar/>
                </div>
            </div>


            <AvForm className="create-team-inputs" onValidSubmit={createTeamFunction}>
                <h3>{getText("Agents7")}</h3>
                <AvField type="text" name="name" className="form-control" placeholder={getText("Agents11")}/>
                <AvField type="text" name="description" className="form-control" placeholder={getText("Agents14")}/>

                <div className="create-button-group">
                    <Link to='/agents'>{getText("CreateAgent5")}</Link>


                    <button className="btn">
                        {getText("Agents12")}
                        <img src="/img/icon/rightArrow.png" alt=""/>
                    </button>
                </div>
            </AvForm>

        </div>
    );
};
const mapStateToProps =(state)=>{
    return {
        createTeamObject: state.createTeamData.createTeamObject

    }
}
export default connect(mapStateToProps, {createTeam})(CreateTeamPair) ;