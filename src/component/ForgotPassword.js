import React from 'react';
import {AvForm, AvField} from 'availity-reactstrap-validation'
import {LoginUser} from "../redux/action/authAction";
import {connect} from "react-redux";
import {changePasswordForSend2} from "../redux/action/createAgentAction";
const ForgotPassword = (props) => {




    const forgotPassword = (event , value) => {
      props.changePasswordForSend2(value)
    }

    return (
        <div className='login-page'>
            <div className="login-form-group">

                <h3>
                    Log in
                </h3>

                <AvForm onValidSubmit={forgotPassword}>
                    <AvField

                        name='email'
                        required
                        placeholder="Email"
                        type="text"
                    />

                    <div type="submit" className="create-button-group">


                        <button   className="change-password-btn btn ml-3">
                            Change password
                        </button>

                    </div>
                </AvForm>



            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.login.isLoading
    }
}

export default connect(mapStateToProps, {LoginUser, changePasswordForSend2})(ForgotPassword);