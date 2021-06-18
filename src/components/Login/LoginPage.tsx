import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../common/FormsControls/FormControls.module.css";
import {AppStateType} from "../../redux/reduxStore";

const maxLength30 = maxLengthCreator(30);

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='email'
                       placeholder='Email'
                       component={Input}
                       validate={[requiredField, maxLength30]}/>
            </div>
            <div>
                <Field name='password'
                       placeholder='Password'
                       component={Input}
                       validate={[requiredField, maxLength30]}
                       type='password'/>
            </div>
            <div>
                <Field name='rememberMe'
                       component='input'
                       type='checkbox'/>
                <label>remember me</label>
            </div>
            {
                props.captchaUrl && <div>
                    <div>
                        <img className={styles.captcha} src={props.captchaUrl} alt="captcha"/>
                    </div>
                    <Field name='captcha'
                           component={Input}
                           validate={[requiredField]}/>
                </div>
            }
            <div className={styles.form_summary_error}>
                {props.error}
            </div>
            <button>Log In</button>
        </form>
    );
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
    form: 'login',
})(LoginForm)

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export const LoginPage: React.FC = React.memo((props) => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        let {email, password, rememberMe, captcha} = formData;
        dispatch(loginThunkCreator(email, password, rememberMe, captcha));
    }

    if (isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
});