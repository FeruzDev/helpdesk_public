import React from 'react';
import {Link, useHistory} from "react-router-dom";
import AccountNavbar from "../../component/AccountNavbar";
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {createAgent} from "../../redux/action/createAgentAction";
import {connect} from "react-redux";
import {getText} from "../../locales";
const CreateAgentPair = (props) => {


    let history = useHistory();

    const createAgentFunction =(event, values)=>{

        props.createAgent(values, props.history);

    }

    return (
        <div className="create-agent-pair w-100">
            <div className="all-tickets-navbar ">

                <div className="all-tickets-navbar-child">
                    <button onClick={() => history.goBack()}  className='bg-transparent arrow-left-back'><img src="/img/icon/arrowleft.png" alt="back img"/>{getText("NewTicket11")}</button>

                    <h1>{getText("CreateAgent")}</h1>
                    <AccountNavbar/>
                </div>
            </div>

            <div className="create-agent-inputs">


                <AvForm onValidSubmit={createAgentFunction}>

                    <h3> {getText("CreateAgent8")}</h3>

                    <div className="row-for-input for-email">
                        <img src="/img/icon/envelope.png" alt=""/>
                        <AvField

                            required
                            name="email"
                            placeholder={getText("CreateAgent2")}

                        />

                    </div>

                    <h3>{getText("CreateAgent3")}</h3>

                    <div className="row-for-input">

                        <AvField
                            name="password"
                            type="password"
                            required
                            placeholder={getText("CreateAgent3")}
                        />

                        <AvField
                            name="password2"
                            type="password"
                            required
                            placeholder={getText("CreateAgent4")}

                        />
                    </div>

                    <div className="create-button-group">
                        <Link to='/agents'>{getText("CreateAgent5")}</Link>
                        <button className="btn" type="submit">
                            {getText("CreateAgent")}
                            <img src="/img/icon/rightArrow.png" alt=""/>
                        </button>
                    </div>

                </AvForm>

            </div>
        </div>
    );
};



const mapStateToProps =(state)=>{
    return{
        createAgentObject: state.createAgentData.createAgentObject
    }
}

export default connect(mapStateToProps, {createAgent})(CreateAgentPair);