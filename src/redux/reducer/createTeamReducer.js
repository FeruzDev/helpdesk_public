import {UPDATE_STATE} from "../actionTypes/createAgentType";


const initialState ={

    createTeamObject: {},
    activeAgentslList: [],
    activeAgentslListForTeam: [],
    activeAgentslListCount: null,
    editModal: false,
    adminCount: null,
    agentCount: null,
    viewerCount: null,
    agentListModal: false


}
export const createTeamReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
