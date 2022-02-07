import SideBar from "./component/SideBar";

import {
    Switch,
    Route, BrowserRouter,

} from "react-router-dom";
import React, {useEffect} from "react";
import Agents from "./pages/Agents";
import CreateTeamPair from "./pages/agents/CreateTeamPair";
import CreateAgentPair from "./pages/agents/CreateAgentPair";
import Login from "./component/Login";
import Report from "./pages/Report";
import InfoAccount from "./component/InfoAccount";
import NewTicket from "./pages/tickets/NewTicket";
import Verified from "./component/Verified";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./component/PrivateRoute";
import {TOKEN_NAME} from "./tools/constants";
import AllTickets from "./pages/tickets/AllTickets";
import VerifiedChangePassword from "./component/VerifiedChangePassword";
import Commit from "./pages/tickets/Commit";
import TicketsToHandle from "./pages/tickets/TicketsToHandle";
import TicketOpen from "./pages/tickets/TicketOpen";
import TicketLastDays from "./pages/tickets/TicketLastDays";
import ForgotPassword from "./component/ForgotPassword";
import InfoAccountEdit from "./component/InfoAccountEdit";
import ByFilter from "./pages/tickets/ByFilter";
import NewTicketUpdate from "./pages/tickets/NewTicketUpdate";

function App() {


  return (
   <div>
       <BrowserRouter  >
           <div className="d-flex">



               {
                   window.location.pathname !== "/" &&  localStorage.getItem(TOKEN_NAME) &&
                   window.location.pathname !== "/change-password-confirm" &&
                   window.location.pathname !== "/user/v1/verify-email/" &&
                   window.location.pathname !== "/forgot-password" ?
                   <>
                       <SideBar/>
                   </> : ""


               }






               <Switch>
                   <Route path="/" exact component={Login} />
                   <Route path="/forgot-password" exact component={ForgotPassword} />
                   <PrivateRoute path="/tickets" exact component={AllTickets} />
                   <PrivateRoute path="/tickets/all-tickets" exact component={AllTickets} />
                   <PrivateRoute path="/tickets/filter"   component={ByFilter} />
                   <PrivateRoute path="/tickets/tickets-to-handle" exact component={TicketsToHandle} />
                   <PrivateRoute path="/tickets/open-tickets" exact component={TicketOpen} />
                   <PrivateRoute path="/tickets/last-days" exact component={TicketLastDays} />
                   <PrivateRoute path="/tickets/new-ticket" exact component={NewTicket} />
                   <PrivateRoute path="/tickets/new-ticket-update" exact component={NewTicketUpdate} />
                   <Route path="/:user/v1/verify-email/" exact component={Verified} />




                   <Route path="/:change-password-confirm" exact component={VerifiedChangePassword} />




                   <PrivateRoute path="/agents" exact component={Agents}/>
                   <PrivateRoute path="/tickets/commit/:id" exact component={Commit}/>
                   <PrivateRoute path="/commit/:id" exact component={Commit}/>
                   {/*<PrivateRoute path="/tickets/filter/commit/:id"  exact component={CommitForFilter}/>*/}
                   <PrivateRoute path="/report" exact component={Report}/>
                   <PrivateRoute path="/info-account" exact component={InfoAccount}/>
                   <PrivateRoute path="/tickets/info-account" exact component={InfoAccount}/>
                   <PrivateRoute path="/tickets/filter/info-account" exact component={InfoAccount}/>
                   <PrivateRoute path="/agents/info-account-edit/:id" exact component={InfoAccountEdit}/>
                   <PrivateRoute path={'/agents/create-team/'} exact component={CreateTeamPair}/>
                   <PrivateRoute path="/agents/create-agent" exact component={CreateAgentPair}/>



               </Switch>
           </div>

       </BrowserRouter>


       <ToastContainer/>

   </div>

  );
}

export default App;
