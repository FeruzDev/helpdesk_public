import React, {useEffect, useState} from 'react';
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import axios from "axios";
import {toast} from "react-toastify";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {Link, useParams} from "react-router-dom";

const VerifiedChangePassword = (props) => {

const [permission, setPermission] = useState(false)
const [tokenST, setTokenST] = useState(false)
const [uidb64ST, setUidb64ST] = useState(false)



        useEffect(()=> {
                const query = new URLSearchParams(props.location.search);
                const token = query.get('token')
                const uidb64 = query.get('uidb64')

                setUidb64ST(uidb64);
                setTokenST(token)

                axios.get(API_PATH + "user/v1/password-change-confirm/"+ uidb64 + "/" +  token )
                    .then(res =>{
                            // console.log(res)
                            res.success ? toast.error("failed") : toast.success("success")
                             setPermission(true)

                    })
                    .catch(err =>{
                            console.log(err)
                    })

        }, [])




    const changePass =(event, values)=>{

        let Data = new FormData();
        Data.append("password", values.password)
        Data.append("password2", values.password2)
        Data.append("uidb64",  uidb64ST)
        Data.append("token",tokenST)


    axios.patch(API_PATH + "user/v1/password-change-completed/" , Data )
        .then(res =>{
            toast.success("success")
            props.history.push("/")
        })
    }
    return (
        <div className="verified-change-password w-100">



            {/*{*/}
            {/*    permission ?*/}


                    <div className='login-page '>
                        <div className="login-form-group">

                            <h3>
                                Change password
                            </h3>

                            <AvForm onValidSubmit={changePass}>
                                <AvField

                                    name='password'
                                    required
                                    placeholder="Password"
                                    type="password"

                                />
                                <AvField

                                    name='password2'
                                    required
                                    placeholder="Verify password"
                                    type="password"
                                />



                                <div type="submit" className="create-button-group">


                                    <button type="submit" className="btn w-100">
                                        Change
                                        {/*<img src="/img/icon/rightArrow.png" alt=""/>*/}
                                    </button>
                                </div>
                            </AvForm>
                        </div>
                    </div>

            {/*        :*/}


            {/*        <div className="   d-flex justify-content-center mt-5 pt-5   align-items-center">*/}
            {/*            {*/}
            {/*                ()=> alert("retry again")*/}
            {/*            }*/}

            {/*            <Link  to="/" className="btn btn-primary" > Login page</Link>*/}

            {/*        </div>*/}
            {/*}*/}



        </div>
    );
};

export default VerifiedChangePassword;