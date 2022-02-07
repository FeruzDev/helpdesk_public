import React from 'react';
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {Link} from "react-router-dom";
import {LoginUser} from "../redux/action/authAction";
import {connect} from "react-redux";
const Login = (props) => {


    const login = (events, values   ) =>{
        props.LoginUser(values, props.history)
    }


    return (
        <div className='login-page'>
            <div className="login-form-group">

                <h3>
                    Войти
                </h3>

                <AvForm onValidSubmit={login}>
                    <AvField

                        name='email'
                        required
                        placeholder="Email"
                        type="text"
                    />
                    <AvField

                        name='password'
                        required
                        placeholder="Пароль"
                        type="password"
                    />



                    <div type="submit" className="create-button-group">


                        <button type="submit" className="btn w-100">
                            Войти
                            <img src="/img/icon/rightArrow.png" alt=""/>
                        </button>
                    </div>
                </AvForm>



                <div className="forgot-password mt-3 text-center">
                    <Link to="/forgot-password">Забыли пароль ?</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.login.isLoading
    }
}

export default connect(mapStateToProps, {LoginUser})(Login);