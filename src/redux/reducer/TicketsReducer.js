import {UPDATE_STATE} from "../actionTypes/createAgentType";


const initialState ={

    getTickets: [],
    getTickets2: [],
    changeGetTickets2: [],
    getTicketsSearch: [],
    getOpenTickets: [],
    getLastDaysTickets: [],
    getTicketsToHandle: [],
    ticketStatusList: [],
    commitList: [],
    ticketInfoObject: {},
    pageIndex: 1,
    btc: {},
    boc: {},
    bot: {},
    openCount: [],
    ClosedCount: [],
    PendingCount: [],
    AllCount: [],
    selectedCommitId: {},
    subAllTickets: [],
    subOpen: [],
    subPending: [],
    subClosed: [],
    selectTeamReducer: {},
    todayNoOpened: {},
    pActive: null,
    forSerPag: false,
    forSerPagfilter: [],
    forSerPagPriority: null,
    agentModal: false,
    getFUllMonth: [],
    UrgentCount : 0,
    HighCount: 0,
    MediumCount: 0,
    LowCount: 0,
    VeryLowCount: 0,








}
export const TicketsReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
