import {UPDATE_STATE} from "../actionTypes/createAgentType";


const initialState ={

    createAgentObject: {},
    getAccount: {},
    getAccountForEdit: {},
    getAllAgentsList: [],
    getAllAgentsListCount: null,
    topUsers: []
}
export const createAgentReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
