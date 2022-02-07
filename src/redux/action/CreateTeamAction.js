import {UPDATE_STATE} from "../actionTypes/createAgentType";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {toast} from "react-toastify";



export function updateState (data){
    return {
        type: UPDATE_STATE,
        payload: data
    }
}



export function createTeam(data, history){
    return function (dispatch){

        // console.log(data)

        let createTeamData = new FormData()
        createTeamData.append("name", data.name)
        createTeamData.append("description", data.description)
        createTeamData.append("is_active", true)

        axios.post(API_PATH + "team/v1/create/", createTeamData, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                toast.success("successfully added")
                history.push( "/agents")

            })
            .catch(err =>{
                toast.error(err)
            })
    }
}


export function getActiveTeamList()
{
    return function (dispatch){





        axios.get(API_PATH + 'team/v1/active-list/', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>  {
                dispatch(updateState({activeAgentslList: res.data.data}));
            })
            .catch(err =>{

            })
    }
}


export function getActiveTeamListCountFunction()
{
    return function (dispatch){





        axios.get(API_PATH + 'team/v1/active-list/', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>  {
                dispatch(updateState({activeAgentslListCount: res.data.data.length}));
            })
            .catch(err => {

            })
    }
}



export function getCountPermissions (){
    return function (dispatch){
        axios.get(API_PATH + 'user/v1/list/?role=0', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({adminCount: res.data.data?.length}))
            })
            .catch(err => {

            })

        axios.get(API_PATH + 'user/v1/list/?role=2', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({agentCount: res.data.data?.length}))
            })
            .catch(err => {

            })
        axios.get(API_PATH + 'user/v1/list/?role=1', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({viewerCount: res.data.data?.length}))
            })
            .catch(err => {

            })

    }
}











