import React, {useEffect} from 'react';
import AccountNavbar from "./AccountNavbar";
import {Link, useHistory} from "react-router-dom";
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {connect} from "react-redux";
import {changePasswordForSend, getInfoAccount, saveFile, updateUserInfo} from "../redux/action/createAgentAction";
import {getActiveTeamList} from "../redux/action/CreateTeamAction";
import {ClosedStatusCount, getAllTicket, OpenStatusCount, PendingStatusCount} from "../redux/action/TicketsAction";
import {getText} from "../locales";

const InfoAccount = (props) => {


    useEffect(() => {
        // props.getInfoAccount()
        props.getActiveTeamList()
        props.OpenStatusCount()
        props.ClosedStatusCount()
        props.PendingStatusCount()
        props.getAllTicket()
    }, [])


    const sendChangePassword = () => {
        props.changePasswordForSend(props.getAccount.email, props.history)

    }


    const savePhoto = (e) => {
        // console.log(e.target.files[0])
        props.saveFile(e.target.files[0], props.getAccount.id);
    }


    const updateUser = (event, value) => {

        props.updateUserInfo(value, props.getAccount.id)
    }

    let history = useHistory();

    return (
        <div className="info-account w-100">
            <div className="all-tickets-navbar">

                <div className="all-tickets-navbar-child">
                    <button onClick={() => history.goBack()} className='bg-transparent arrow-left-back'><img
                        src="/img/icon/arrowleft.png" alt="back img"/>{getText("NewTicket11")}</button>
                    <h1>{getText("infoAccount6")}</h1>
                    <AccountNavbar/>
                </div>
            </div>


            <div className="row w-100">
                <div className="col-md-3">


                    <div className="account-img">
                        <img src={props.getAccount.image} alt=""/>

                        <span>{props.getAccount.role_name}</span>
                    </div>

                    <h3>{props.getAccount.full_name}</h3>
                    <p>{props.getAccount.email}</p>


                    <div className="count-tickets">
                        <h4>
                            <span>  {props.AllCount.count ? props.AllCount.count : "0"}</span>
                            <span>{getText("SideBarMenus3")}</span>
                        </h4>

                        <h4>

                            <span>  {props.ClosedCount.count ? props.ClosedCount.count : "0"}</span>
                            <span>{getText("SideBarMenus4")}</span>
                        </h4>

                        <h4>
                            <span>  {props.openCount.count ? props.openCount.count : "0"}</span>
                            <span>{getText("SideBarMenus6")}</span>
                        </h4>
                    </div>


                    <AvForm>


                        <h3 className="mb-3">{getText("infoAccount")}</h3>

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


                    <AvForm onValidSubmit={updateUser}>
                        <h3>{getText("infoAccount2")}</h3>
                        <div className="row-for-input">
                            <AvField
                                name="full_name"
                                placeholder={getText("infoAccount10")}
                                disabled={props.getAccount.role == 0 ? false : true}
                                value={props.getAccount.full_name}
                            />


                        </div>


                        <h3>{getText("infoAccount7")}</h3>
                        <div className="row-for-input for-email">
                            {/*<img src="/img/icon/envelope.png" alt=""/>*/}
                            {/*<AvField*/}

                            {/*    name="email"*/}
                            {/*    placeholder="E-mail"*/}
                            {/*    value={props.getAccount.email}*/}
                            {/*/>*/}

                            <AvField
                                name="phone"
                                placeholder={getText("NewTicket4")}
                                disabled={props.getAccount.role == 0 ? false : true}
                                value={props.getAccount.phone}
                            />

                        </div>


                        <h3>{getText("infoAccount3")}</h3>
                        <div className="row-for-input">
                            <AvField type="select" name="team" disabled={props.getAccount.role == 0 ? false : true}
                                     classname="select-style">

                                {
                                    props.activeAgentslList
                                        ?
                                        props.activeAgentslList.map(item =>
                                            (
                                                <option>{item.name}</option>

                                            )
                                        )
                                        :
                                        ""
                                }


                            </AvField>


                        </div>


                        <h3>
                            {getText("infoAccount8")}
                        </h3>


                        <div className="row-for-input">


                        </div>


                        <div className="create-button-group">

                            <div>
                                {
                                    props.getAccount.role === "Admin"
                                        ?

                                        <button type='submit' className="btn">
                                            {getText("infoAccount4")}
                                        </button>

                                        :
                                        ''
                                }


                                <button onClick={sendChangePassword} className="change-password-btn btn ml-3">
                                    {getText("infoAccount9")}
                                </button>

                            </div>

                            <Link to='/agents'>{getText("infoAccount5")}</Link>

                        </div>


                    </AvForm>


                    <img src="/img/Divider.png" className='img-bottom-border' alt=""/>


                </div>
                <div className="col-md-2">

                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {

        getAccount: state.createAgentData.getAccount,
        activeAgentslList: state.createTeamData.activeAgentslList,
        openCount: state.ticketData.openCount,
        ClosedCount: state.ticketData.ClosedCount,
        AllCount: state.ticketData.AllCount,

    }
}

export default connect(mapStateToProps, {
    getInfoAccount,
    saveFile,
    OpenStatusCount,
    PendingStatusCount,
    getAllTicket,
    ClosedStatusCount,
    updateUserInfo,
    getActiveTeamList,
    changePasswordForSend
})(InfoAccount);