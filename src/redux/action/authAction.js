import {CREATE_TICKET, LOGIN} from "../actionTypes/authType";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {toast} from "react-toastify";
import {getText} from "../../locales";


export function LoginUser(data, history){


    return function (dispatch){


        dispatch({
            type:LOGIN
        })
        let authData = new FormData();
        authData.append("email", data.email)
        authData.append("password", data.password)
        axios.post(API_PATH + "user/v1/login/", authData)
            .then(res =>{
                localStorage.setItem(TOKEN_NAME, res.data.data.tokens.access)

                history.push("/tickets")
                window.location.reload();

            })
            .catch(err =>{
                toast.error("Логин или пароль неверный")

            })
    }
}


