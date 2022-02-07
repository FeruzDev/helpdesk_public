import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {CREATE_AGENT} from "../actionTypes/authType";
import {updateState} from "./TicketsAction";
import {toast} from "react-toastify";
import {getText} from "../../locales";

export function createAgent(data, history)  {
    return function (dispatch) {

        dispatch({
            type: CREATE_AGENT
        });

        let createAgentData = new  FormData();
        createAgentData.append("email", data.email)
        createAgentData.append("password", data.password)
        createAgentData.append("password2", data.password2)

         axios.post(API_PATH + "user/v1/register/", createAgentData ,
             {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
             .then(res =>{

                 history.push( "/agents/info-account-edit/" + res.data.data.id)

             })
             .catch(error =>{
                 toast.error(getText("crAgent"))


             })

    }


}

export function getInfoAccount(){
    return function (dispatch){
        axios.get(API_PATH + "user/v1/get-user/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                dispatch(updateState({getAccount: res.data.data}));

            })
            .catch(err =>{
                console.log(err)
            })


    }
}

export function saveFileForEdit(data, accountId){
    return function (dispatch) {
        let image = new FormData();
        image.append("image", data);


        axios.put(API_PATH + "user/v1/update-own-image/" + accountId + "/", image ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                toast.success("image update");
                dispatch(getInfoAccount())
            })
            .catch(err =>{
                toast.error("Access to only owner");

            })
    }
}

export function getInfoAccountForEdit(infoId){

    return function (dispatch){
        axios.get(API_PATH + "user/v1/update/" + infoId + "/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                dispatch(updateState({getAccountForEdit: res.data.data}));








                axios.get(  API_PATH + 'ticket/v1/list/' +  "?receiver=" + res.data.data.email , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

                    .then(res =>{

                        // dispatch(updateState({openCount: res.data.data}));
                        // dispatch(updateState({ClosedCount: res.data.data}));
                        dispatch(updateState({AllCount: res.data}));


                    })
                    .catch(err =>{

                    })


                axios.get(  API_PATH + 'ticket/v1/list/?status=Open' +  "&receiver=" + res.data.data.email, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

                    .then(res =>{

                        dispatch(updateState({openCount: res?.data}));
                        // dispatch(updateState({ClosedCount: res.data.data}));
                        // dispatch(updateState({AllCount: res.data}));


                    })
                    .catch(err =>{

                    })




                axios.get(  API_PATH + 'ticket/v1/list/?status=Closed' +  "&receiver=" + res.data.data.email, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

                    .then(res =>{

                        // dispatch(updateState({openCount: res.data.data}));
                        dispatch(updateState({ClosedCount: res.data}));
                        // dispatch(updateState({AllCount: res.data}));


                    })
                    .catch(err =>{

                    })





            })
            .catch(err =>{

            })
    }
}

export function changeInfoAccountData(data ,infoId  ){

    // console.log(data)



    return function (dispatch){
        axios.put(API_PATH + "user/v1/update/" + infoId + "/",data,  {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                dispatch(updateState({getAccountForEdit: res.data.data}));

            })
            .catch(err =>{

            })
    }
}

export function changePasswordForSend(data, history){
    return function (dispatch){

        axios.post(API_PATH + "user/v1/password-change/",  {email: data}  )
            .then(res =>{
                toast.success(<a className="text-white  text-decoration-none"   target="_blank" href="https://gmail.com/">check your email</a>)

            })
    }
}

export function changePasswordForSend2(data, history){
    return function (dispatch){

        axios.post(API_PATH + "user/v1/password-change/",    data   )
            .then(res =>{
                toast.success(<a className="text-white  text-decoration-none"  target="_blank" href="https://gmail.com/">check your email</a>)
            })
    }
}


export function getAllAgents(){
    return function (dispatch){


        axios.get(API_PATH + "user/v1/list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                dispatch(updateState({getAllAgentsList: res.data.data}))
                dispatch(updateState({getAllAgentsListCount: res.data.data.length}))


            })
            .catch(err =>{
            })
    }
}

export function getAllAgentsListCountFunction(){
    return function (dispatch){


        axios.get(API_PATH + "user/v1/list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                dispatch(updateState({getAllAgentsListCount: res.data.data.length}))
             })
            .catch(err =>{
            })
    }
}

                        export function saveFile(data, accountId){
                            return function (dispatch) {
                                let image = new FormData();
                                image.append("image", data);


                                axios.put(API_PATH + "user/v1/update-own-image/" + accountId + "/", image ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
                                    .then(res => {
                                        toast.success("image update");
                                        dispatch(getInfoAccount())
                                    })
                                    .catch(err =>{
                                        toast.error("Error !!!");

                                    })
                            }
                        }

export function updateUserInfo(data, AccountID, dataEmail) {

    return function (dispatch) {



        let bigData = new FormData();
        bigData.append("full_name", data.full_name);
        bigData.append("phone", data.phone);
        bigData.append("team", data.team);
        bigData.append("role", data.role);
        bigData.append("email", dataEmail);



        axios.put(API_PATH + "user/v1/update/" + AccountID + "/", bigData ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{




                toast.success("Успешно редактировать")

            })
            .catch(err =>{
                toast.error("Не может быть изменено")
            })

    }

}

export function updateInfoAccount(data, history){
    return function (dispatch){
        dispatch(updateState({agentListModal: false}))
        history.push("/agents/info-account-edit/" + data.id)

    }
}




export function topAgents(){
    return function (dispatch){
        axios.get(API_PATH + "user/v1/report-top-users", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({topUsers : res.data.data}))
            })
            .catch(err =>{

            })
    }
}