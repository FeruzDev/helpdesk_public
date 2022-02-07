import React, {useEffect} from 'react';
import {API_PATH} from "../tools/constants";
import axios from "axios";
import {toast} from "react-toastify";

const Verified = (props) => {


        useEffect(()=> {
                const query = new URLSearchParams(props.location.search);
                const token = query.get('token')


                axios.get(API_PATH + "user/v1/verify-email/?token=" + token, )
                    .then(res =>{

                            res.success ? toast.error("failed") : toast.success("success")


                        props.history.push('/')
                    })
                    .catch(err =>{
                            console.log(err)
                    })


        }, [])
    return (
        <div className="w-100 ">


            <h1 className="mt-5 text-center w-100 justify-content-center text-primary">Email successfully verified</h1>
        </div>
    );
};

export default Verified;