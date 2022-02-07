import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import AccountNavbar from "../../component/AccountNavbar";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {MultiSelectComponent} from '@syncfusion/ej2-react-dropdowns';
import {connect} from "react-redux";
import {getActiveTeamList, updateState} from "../../redux/action/CreateTeamAction";
import {getStatusList, createTIcket} from "../../redux/action/TicketsAction";
import {getAllAgents} from "../../redux/action/createAgentAction";
import {getText} from "../../locales";
import NumberFormat from 'react-number-format';


const NewTicket = (props) => {


    const [maskNumber, setMaskNumber] = useState(null)

    useEffect(() => {
        props.getActiveTeamList()
        props.getStatusList()
        props.getAllAgents()





    }, [])
    const ticketForm = (events, values) => {
        props.createTIcket(values, props.history, maskNumber)
    }


    const selectTeam = (data) => {
        // props.updateState({selectTeamReducer: data})
        // console.log(data.target.value)
        // console.log(props.getAllAgentsList)
        // console.log(props.activeAgentslList)
        props.updateState({getAllAgentsList: props.activeAgentslList.filter(item => item.id == data.target.value)[0].agents})

        // props.activeAgentslList.filter(item => )
    }



    let history = useHistory();

    return (
        <div className='new-ticket-create-page w-100'>
            <div className="all-tickets-navbar">

                <div className="all-tickets-navbar-child">
                    <button onClick={() => history.goBack()} className='bg-transparent arrow-left-back'><img
                        src="/img/icon/arrowleft.png" alt="back img"/>{getText("NewTicket11")}
                    </button>
                    <h1>{getText("NewTicket")}</h1>
                    <AccountNavbar/>


                </div>
            </div>


            <AvForm className="create-team-inputs" onValidSubmit={ticketForm}>


                <div className="row">
                    <div className="col-md-6">
                        <h3>{getText("NewTicket2")}</h3>
                        <AvField type="text" name="subject" required className="form-control" placeholder={getText("NewTicket2")}/>
                    </div>
                    <div className="col-md-6">
                        <h3>{getText("Type")}</h3>
                        <AvField  type="select" name='from_where' required>

                            <option value="0" selected>Incoming</option>
                            <option value="1">Outgoing</option>
                            <option value="3">Social Media</option>

                        </AvField>

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-6">
                        <h3>{getText("NewTicket3")}</h3>

                        <AvField type="text" name="client_full_name" className="form-control" required
                                 placeholder={getText("NewTicket3")}/>

                    </div>
                    <div className="col-md-6">
                        <h3>{getText("NewTicket4")}</h3>

                        <AvField   id='numberInput'  value="+998" type="text" name="client_phone_number"
                                 className="form-control" required placeholder={getText("NewTicket4")}/>

                        {/*<NumberFormat format="+998 (##) ###-##-##"  className="form-control"  name="client_phone_number" onChange={(e) => setMaskNumber(e.target.value) }  allowEmptyFormatting mask="_" />*/}

                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">
                        <h3>{getText("NewTicket5")}</h3>

                        <div className="multi-select2">
                            <AvField onChange={selectTeam} type="select" name='team' required>

                                <option value="0"></option>

                                {
                                    props.activeAgentslList.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                }


                                {/*<MultiSelectComponent  id="mtselement" fields={fields} dataSource={posts}*/}
                                {/*                      placeholder="Select a team"/>*/}

                            </AvField>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3>{getText("NewTicket6")}</h3>
                        <div className="multi-select">
                            <img src="/img/icon/account3.png" className="select-img-account" alt="account"/>
                            <AvField name="receiver" type="select" className="pl-5" required>


                                <option value="0"></option>
                                {
                                    props.getAllAgentsList.map(item => (
                                        <option value={item.id}>{item.full_name}</option>
                                    ))
                                }


                            </AvField>


                            {/*<img src="/img/icon/down.png" className="select-img-down" alt="account"/>*/}

                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-6">
                        <h3>{getText("NewTicket7")}</h3>

                        <div className="multi-select2">

                            {/*<img src="/img/icon/down.png" className="select-img-down" alt="account"/>*/}

                            <AvField name="ticket_status" type="select" required>
                                <option value="0"></option>
                                {
                                    props.ticketStatusList.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                }
                                {/*<MultiSelectComponent id="mtselement"  fields={fields} dataSource={posts}*/}
                                {/*                      placeholder="Priority"/>*/}
                            </AvField>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3>{getText("NewTicket8")}</h3>

                        <div className="multi-select2">

                            <AvField name="priority" type="select" required>


                                <option></option>
                                <option value="2">Urgent</option>
                                <option value="1">High</option>
                                <option value="0">Medium</option>
                                <option value="-1">low</option>
                                <option value="-2">Very low</option>

                            </AvField>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <AvField
                            type='textarea'
                            name="content"

                            style={{height: '200px'}}
                            required
                        />
                    </div>
                </div>
                <div className="create-button-group">
                    <Link to='/agents'>{getText("NewTicket9")}</Link>


                    <button className="btn">
                        {getText("NewTicket10")}
                        <img src="/img/icon/rightArrow.png" alt=""/>
                    </button>
                </div>
            </AvForm>


        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        activeAgentslList: state.createTeamData.activeAgentslList,
        getAllAgentsList: state.createAgentData.getAllAgentsList,
        ticketStatusList: state.ticketData.ticketStatusList,
    }
}
export default connect(mapStateToProps, {
    createTIcket,
    getAllAgents,
    updateState,
    getActiveTeamList,
    getStatusList
})(NewTicket);