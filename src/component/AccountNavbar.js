import React, {useEffect} from 'react';
import {Link, NavLink, useHistory} from "react-router-dom";
import {getInfoAccount} from "../redux/action/createAgentAction";
import {connect} from "react-redux";
import {  getAllTicketToHandle} from "../redux/action/TicketsAction";
import {SITE_LANG} from "../tools/constants";

const AccountNavbar = (props) => {
    let history = useHistory();

    const logOut =()=>{
        localStorage.removeItem("help-desk")
        history.push("/")
        window.location.reload();
    }

    useEffect(()=>{
        props.getInfoAccount()
        props.getAllTicketToHandle()

    }, [])


    const  changeLang = (lang) =>{
        localStorage.setItem(SITE_LANG, (lang));
        window.location.reload();
    }


    return (
        <div className="all-tickets-right">



            <div className="dropdown">


                <button className="dropbtn">
                    {localStorage.getItem("language") === "en" ? " EN" : "RU" }
                </button>

                <div className="dropdown-content">
                    <button onClick={() => changeLang('en')}>EN</button>
                    <button onClick={() => changeLang('ru')}>RU</button>
                </div>


            </div>
            <Link to="/tickets/tickets-to-handle"className="bell-icon">
                <img src="/img/icon/bellFree.png"  />
                {
                props.getTicketsToHandle?.filter(item => !item.is_read).length  > 0   ?
                    <img src="/img/icon/ordot.png" className="orange-dot"  />

                   :
                   ""


                }
            </Link>
            <NavLink to='info-account' className="d-flex">

               <div className="account-img">
                   <img src={props.getAccount.image ? props.getAccount.image  : "/img/icon/account.png" } alt="account"/>

               </div>
               <div className="account-name">
                   <h4 className="open-sans-light">{props.getAccount.full_name ?  props.getAccount.full_name  : "Agents name"}</h4>
                   <h6 className="open-sans-light">{props.getAccount.email ?  props.getAccount.email  : "Agents email"}</h6>
               </div>

            </NavLink>
            <button onClick={  logOut } className="log-out-btn"><img src="img/icon/logout.svg" alt=""/></button>
        </div>
    );
};


const mapStateToProps=(state)=>{
    return {
        getAccount: state.createAgentData.getAccount,
        getTicketsToHandle: state.ticketData.getTicketsToHandle,

    }
}

export default connect(mapStateToProps, {getInfoAccount, getAllTicketToHandle})(AccountNavbar);