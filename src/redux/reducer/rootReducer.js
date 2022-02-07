import {combineReducers} from "redux";
import {loginReducer} from "./authReducer";
import {createAgentReducer} from "./createAgentReducer";
import {createTeamReducer} from "./createTeamReducer";
import {TicketsReducer} from "./TicketsReducer";

export const rootReducer = combineReducers({

    login: loginReducer,
    createAgentData: createAgentReducer,
    createTeamData: createTeamReducer,
    ticketData: TicketsReducer,

});