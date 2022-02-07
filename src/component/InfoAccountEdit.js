import React, {useEffect, useMemo, useState} from 'react';
import AccountNavbar from "./AccountNavbar";
import {Link} from "react-router-dom";
import {AvForm, AvField, AvRadio, AvRadioGroup} from 'availity-reactstrap-validation'
import {connect} from "react-redux";
import {
    changeInfoAccountData,
    getInfoAccount, getInfoAccountForEdit,
    saveFileForEdit,
    updateInfoAccount,
    updateUserInfo
} from "../redux/action/createAgentAction";
import {getActiveTeamList} from "../redux/action/CreateTeamAction";
import NumberFormat from "react-number-format";
import {getAllTicketForId} from "../redux/action/TicketsAction";


const InfoAccount = (props) => {


    var url = document.URL

    const [maskNumber, setMaskNumber] = useState(null)

    const last = url.substr(url.lastIndexOf('/') + 1);


    const firstUpload = useMemo(() => {
        props.getInfoAccountForEdit(last)


    } , [])
    useEffect(() => {
        // var url = document.URL
        // props.getAllTicketForId()


        // const last  =  url.substr(url.lastIndexOf('/') + 1) ;
        // props.getInfoAccount()
        props.getActiveTeamList()


        // showNumberEdit()


    }, [])


    // function showNumberEdit(x) {
    //     document.getElementById('numberInputEdit').value = "+ 998"
    //
    //     document.getElementById('numberInputEdit').addEventListener('input', function (e) {
    //         var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
    //         e.target.value = '+' + x[1] + ' ' + x[2] + ' ' + x[3] + ' ' + x[4] + ' ' + x[5];
    //     });
    // }

    const sendChange = (event, value) => {


        props.updateUserInfo(value, last, props.getAccountForEdit.email)

    }


    const savePhoto = (e) => {
        // console.log(e.target.files[0])
        props.saveFileForEdit(e.target.files[0], props.getAccountForEdit.id);
    }


    return (
        <div className="info-account w-100">
            <div className="all-tickets-navbar">

                <div className="all-tickets-navbar-child">
                    <Link to='/agents' className='arrow-left-back'>
                        <img src="/img/icon/arrowleft.png"
                             alt="back img"/>Back</Link>
                    <h1>Info account</h1>
                    <AccountNavbar/>
                </div>
            </div>


            <div className="row w-100">
                <div className="col-md-3">


                    <div className="account-img">
                        <img src={props.getAccountForEdit.image} alt=""/>

                        <span>{props.getAccountForEdit.role_name}</span>
                    </div>

                    <h3>{props.getAccountForEdit.full_name}</h3>
                    <p>{props.getAccountForEdit.email}</p>


                    <div className="count-tickets">
                        <h4>
                            <span>  {props.AllCount.count ? props.AllCount.count : "0"}</span>
                            <span>All tickets</span>
                        </h4>

                        <h4>

                            <span>  {props.ClosedCount.count ? props.ClosedCount.count : "0"}</span>
                            <span>Closed</span>
                        </h4>

                        <h4>
                            <span>  {props.openCount.count ? props.openCount.count : "0"}</span>
                            <span>Open</span>
                        </h4>
                    </div>


                    <AvForm>


                        <h3 className="mb-3"> Upload New Avatar</h3>

                        <AvField type="file"
                                 id="file"
                                 onChange={savePhoto}
                                 name="image"

                        />


                    </AvForm>


                    {/*<button className="delete-avatar-btn">*/}
                    {/*    Delete Avatar*/}
                    {/*</button>*/}


                    <img src="/img/Border.png" className='img-top-border' alt=""/>
                </div>

                <div className="col-md-7">


                    <AvForm onValidSubmit={sendChange} model={props.getAccountForEdit}>
                        <h3>Personality</h3>
                        <div className="row-for-input">
                            <AvField
                                name="full_name"
                                placeholder="Full name"
                                required
                                value={props.getAccountForEdit.full_name}
                            />


                        </div>


                        <h3>Contacts</h3>
                        <div className="row-for-input for-email ">
                            {/*<img src="/img/icon/envelope.png" alt=""/>*/}
                            {/*<AvField*/}

                            {/*    name="email"*/}
                            {/*    placeholder="E-mail"*/}
                            {/*    value={props.getAccountForEdit.email}*/}
                            {/*/>*/}

                            <AvField
                                name="phone"
                                placeholder="Phone"
                                id='numberInputEdit'
                                required
                                value={props.getAccountForEdit.phone !== "null" ? props.getAccountForEdit.phone : "+998"}
                            />

                            {/*<NumberFormat format="+998 (##) ###-##-##" className="form-control d-inline-block w-50"*/}
                            {/*              placeholder="Phone"*/}
                            {/*              id='numberInputEdit'*/}

                            {/*              name="phone"*/}
                            {/*              onChange={(e) => setMaskNumber(e.target.value)}*/}
                            {/*              allowEmptyFormatting mask="_"*/}
                            {/*/>*/}
                        </div>


                        <h3>Team</h3>
                        <div className="row-for-input" >
                            <AvField type="select" name="team" value={props.getAccountForEdit.team}
                                     classname="select-style" required>

                                <option selected></option>
                                {
                                    props.activeAgentslList
                                        ?
                                        props.activeAgentslList.map(item =>
                                            (
                                                <option value={item.id}>{item.name}</option>

                                            )
                                        )
                                        :
                                        ""
                                }


                            </AvField>


                        </div>


                        <h3>
                            Permissions
                        </h3>


                        <div className="row-for-input">

                            <AvRadioGroup name="role" value={props.getAccountForEdit.role}>
                                <div className="d-flex">
                                    <AvRadio customInput value={0}/>
                                    <label>
                                        <h4>Admin</h4>
                                        <p>
                                            Full access to global settings, adding new agents, subscription and all
                                            actions related to tickets.
                                        </p>
                                    </label>

                                </div>


                                <div className="d-flex">

                                    <AvRadio customInput value={2}/>
                                    <label>
                                        <h4>Agent</h4>
                                        <p>
                                            Access to personal settings and all actions related to tickets.
                                        </p>
                                    </label>
                                </div>


                                <div className="d-flex">

                                    <AvRadio customInput value={1} className="b-0"/>
                                    <label>
                                        <h4>Manager</h4>
                                        <p>
                                            Managers can read and browse tickets but can’t take any actions.
                                        </p>
                                    </label>

                                </div>


                            </AvRadioGroup>
                        </div>


                        <div className="create-button-group">

                            <div>
                                {
                                    <button type='submit' className="btn">
                                        Save changes
                                    </button>
                                }
                            </div>

                            <Link to='/agents'>Cancel</Link>

                        </div>


                    </AvForm>


                    <img src="/img/Divider.png" className='img-bottom-border' alt=""/>


                    {/*<h3>*/}
                    {/*    Delete agent*/}
                    {/*</h3>*/}
                    {/*<p>*/}
                    {/*    You will delete the agent account and related statistics. <br/> Tickets will not be removed.*/}
                    {/*</p>*/}
                    {/*<h5 className='delete-account'>*/}
                    {/*    Delete account*/}
                    {/*</h5>*/}
                </div>
                <div className="col-md-2">

                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {

        getAccountForEdit: state.createAgentData.getAccountForEdit,
        getAccount: state.createAgentData.getAccount,
        activeAgentslList: state.createTeamData.activeAgentslList,
        openCount: state.ticketData.openCount,
        ClosedCount: state.ticketData.ClosedCount,
        AllCount: state.ticketData.AllCount,


    }
}

export default connect(mapStateToProps, {
    getInfoAccountForEdit,
    getInfoAccount,
    saveFileForEdit,
    changeInfoAccountData,
    getActiveTeamList,
    updateInfoAccount,
    updateUserInfo,
    getAllTicketForId,

})(InfoAccount);